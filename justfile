set dotenv-load

# List available recipes
default:
    @just --list

# Install dependencies
install:
    bun install

# Dev server on http://localhost:3000
dev: install
    bun run dev

# Type-check the TypeScript sources
typecheck: install
    bun run typecheck

# Run the tests
test: install
    bun run test

# Build your working tree into dist/
build: typecheck test
    bun run build

# Remove build output and dependencies
clean:
    rm -rf dist node_modules "$RELEASE_DIR"

# Where `just release` builds main
export RELEASE_DIR := env("RELEASE_DIR", "/tmp/marin-dylan.dev-release")

# Build the committed main branch in RELEASE_DIR
release:
    bash scripts/release.sh

# Serve the release build of main locally
preview port="3001": release
    cd "$RELEASE_DIR/src" && PORT={{port}} bun "{{justfile_directory()}}/scripts/serve.ts"

# Show what `just deploy` would upload or delete on the server, without changing anything
deploy-check: release
    #!/usr/bin/env bash
    set -euo pipefail
    : "${OVH_SFTP_USER:?Set OVH_SFTP_USER (FTP login, OVH Manager > Hosting > FTP - SSH)}"
    : "${OVH_SFTP_HOST:?Set OVH_SFTP_HOST (FTP server, OVH Manager > Hosting > FTP - SSH)}"
    lftp -u "$OVH_SFTP_USER" "sftp://$OVH_SFTP_HOST" -e "mirror --reverse --delete --dry-run \"$RELEASE_DIR/src/dist/\" www/; quit"

# Put the release build of main online (asks for confirmation, then the FTP password)
deploy: release
    #!/usr/bin/env bash
    set -euo pipefail
    : "${OVH_SFTP_USER:?Set OVH_SFTP_USER (FTP login, OVH Manager > Hosting > FTP - SSH)}"
    : "${OVH_SFTP_HOST:?Set OVH_SFTP_HOST (FTP server, OVH Manager > Hosting > FTP - SSH)}"
    commit=$(<"$RELEASE_DIR/COMMIT")
    echo "Publishing main to https://marin-dylan.dev: $(git log -1 --format='%h %s (%cr)' "$commit")"
    if upstream=$(git rev-parse --verify --quiet main@{upstream}) && [[ $upstream != "$commit" ]]; then
        echo "Warning: main and $(git rev-parse --abbrev-ref main@{upstream}) differ (not pushed or not pulled)."
    fi
    read -rp "Continue? [y/N] " answer
    [[ $answer == [yY] ]] || { echo "Cancelled"; exit 1; }
    lftp -u "$OVH_SFTP_USER" "sftp://$OVH_SFTP_HOST" -e "mirror --reverse --delete --verbose \"$RELEASE_DIR/src/dist/\" www/; quit"
    echo "Online: https://marin-dylan.dev"
