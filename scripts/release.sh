#!/usr/bin/env bash
# Builds the committed `main` branch into $RELEASE_DIR, never the working tree: uncommitted or untracked files are
# left out. `just preview` serves this build and `just deploy` uploads it, so what you preview is what goes online.
# RELEASE_REF builds another commit or branch instead of main.
#
# The commit's own package.json says how: its "release" script runs the checks and must produce dist/.
#
# The build runs outside the repository: bun, tsc and module resolution look for package.json, tsconfig.json and
# node_modules in parent folders, and inside the repository they would find the working tree's.
set -euo pipefail

ref=${RELEASE_REF:-main}
commit=$(git rev-parse --verify --quiet "$ref^{commit}") || { echo "No commit for '$ref'"; exit 1; }
summary=$(git log -1 --format='%h %s' "$commit")
out=${RELEASE_DIR:-${TMPDIR:-/tmp}/marin-dylan.dev-release}
repo=$PWD

# No JavaScript project above the build folder, or the tools could pick up its files
dir=$(dirname "$out")
while [[ $dir != / ]]; do
    for f in package.json tsconfig.json node_modules bunfig.toml; do
        [[ -e $dir/$f ]] && { echo "Unsafe RELEASE_DIR: $dir/$f would be used by the build"; exit 1; }
    done
    dir=$(dirname "$dir")
done

# Same commit already built: reuse it, so deploy uploads exactly the files that were previewed
if [[ -f $out/COMMIT && $(<"$out/COMMIT") == "$commit" && -d $out/src/dist ]]; then
    echo "Release already built from $ref: $summary"
    exit 0
fi

echo "Building $ref: $summary"
rm -rf "$out"
mkdir -p "$out/src"
git archive "$commit" | tar -x -C "$out/src"

for f in package.json bun.lock; do
    [[ -f $out/src/$f ]] || { echo "$ref has no $f: commit it before releasing"; exit 1; }
done

# GitHub data: the build refetches it, and falls back to this copy if GitHub is unreachable
[[ -d .cache ]] && cp -r .cache "$out/src/.cache"

(
    cd "$out/src"
    bun install --frozen-lockfile
    bun run release
)
[[ -d $out/src/dist ]] || { echo "The release script of $ref did not produce dist/"; exit 1; }

# Keep the fresh GitHub data for `just dev` too
if [[ -d $out/src/.cache ]]; then
    mkdir -p "$repo/.cache"
    cp -r "$out/src/.cache/." "$repo/.cache/"
fi

echo "$commit" > "$out/COMMIT"
echo "Release ready in $out/src/dist/ ($summary)"
