#!/usr/bin/env bash
# Uploads the release build ($RELEASE_DIR, made by scripts/release.sh) to the OVH hosting.
# With --dry-run, only lists what would be uploaded or deleted on the server.
set -euo pipefail

: "${OVH_SFTP_USER:?Set OVH_SFTP_USER (FTP login, OVH Manager > Hosting > FTP - SSH)}"
: "${OVH_SFTP_HOST:?Set OVH_SFTP_HOST (FTP server, OVH Manager > Hosting > FTP - SSH)}"
out=${RELEASE_DIR:-${TMPDIR:-/tmp}/marin-dylan.dev-release}

mirror() {
    lftp -u "$OVH_SFTP_USER" "sftp://$OVH_SFTP_HOST" -e "mirror --reverse --delete $1 \"$out/src/dist/\" www/; quit"
}

if [[ ${1:-} == --dry-run ]]; then
    mirror --dry-run
    exit 0
fi

commit=$(<"$out/COMMIT")
echo "Publishing main to https://marin-dylan.dev: $(git log -1 --format='%h %s (%cr)' "$commit")"
if upstream=$(git rev-parse --verify --quiet main@{upstream}) && [[ $upstream != "$commit" ]]; then
    echo "Warning: main and $(git rev-parse --abbrev-ref main@{upstream}) differ (not pushed or not pulled)."
fi

read -rp "Continue? [y/N] " answer
[[ $answer == [yY] ]] || { echo "Cancelled"; exit 1; }

mirror --verbose
echo "Online: https://marin-dylan.dev"
