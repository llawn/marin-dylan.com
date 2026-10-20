# marin-dylan.dev

Personal website, written in TypeScript and run with [Bun](https://bun.com/).

```sh
just dev            # dev server on http://localhost:3000
just build          # type-check, test and build the working tree into dist/
```

## Layout

```
src/page.ts          the page
scripts/build.ts     writes dist/
scripts/dev.ts       dev server
public/.htaccess     HTTPS redirect
tests/               bun test
```

## Publishing

Only the committed `main` branch goes online, never the working tree: work with `just dev`, commit what is ready,
then check and publish it.

```sh
just preview        # builds main and serves it on port 3001
just deploy-check   # lists what would be uploaded or deleted on the server
just deploy         # uploads the main build to the OVH hosting.
```

`scripts/release.sh` extracts `main` with `git archive` into a folder outside the repository
installs the locked dependencies and runs the `release` script of that commit's `package.json`
(type check, tests, build), stopping on any failure.

`just deploy` uploads exactly what `just preview` show.

The upload mirrors the build into the hosting's `www/` folder over SFTP with `lftp`,
deleting remote files that are not in the build.

The FTP login and server come from OVH Manager (Web Cloud > Hosting > FTP - SSH)
and go in `.env`, and the password is asked each time.

```sh
cp .env.example .env   # then set OVH_SFTP_USER and OVH_SFTP_HOST in .env
```
