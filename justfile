set dotenv-load

# Where `just release` builds main
export RELEASE_DIR := env("RELEASE_DIR", "/tmp/marin-dylan.dev-release")

# List available recipes
default:
    @just --list --unsorted

# Install dependencies
[group('dev')]
install:
    bun install

# Dev server on http://localhost:3000
[group('dev')]
dev: install
    bun run dev

# Type-check the TypeScript sources
[group('dev')]
typecheck: install
    bun run typecheck

# Build your working tree into dist/
[group('dev')]
build: install
    bun run build

# Type-check, build and test, as a release does
[group('dev')]
test: typecheck build
    bun run test

# Remove build output and dependencies
[group('dev')]
clean:
    rm -rf dist .astro node_modules "$RELEASE_DIR"

# Build the committed main branch in RELEASE_DIR
[group('release')]
release:
    bash scripts/release.sh

# Serve the release build of main locally
[group('release')]
preview port="3001": release
    cd "$RELEASE_DIR/src" && PORT={{port}} bun "{{justfile_directory()}}/scripts/serve.ts"

# Show what `just deploy` would upload or delete on the server
[group('release')]
deploy-check: release
    bash scripts/deploy.sh --dry-run

# Put the release build of main online
[group('release')]
deploy: release
    bash scripts/deploy.sh
