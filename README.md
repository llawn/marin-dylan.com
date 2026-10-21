# marin-dylan.dev

Personal website, built with [Astro](https://astro.build/) and run with [Bun](https://bun.com/).

```sh
just dev            # dev server on http://localhost:3000
just test           # type-check, build the working tree into dist/ and test it
```

## Layout

```
src/site.ts          site general information
src/content/         data only
src/pages/           to define specific routes that produce a full HTML document.
src/layouts/         reusable Astro components that wrap pages to provide a consistent shell.
src/components/      reusable pieces
src/sections/        holds the content blocks of a page
src/lib/             generic TS
src/styles/          global CSS
public/              files used as it is by the browser
tests/               test files
```

## Publishing

Only the committed `main` branch goes online, never the working tree.
You can work with `just dev`, commit what is ready, then check with `just preview`.

```sh
just preview        # builds main and serves it on port 3001
just deploy-check   # lists what would be uploaded or deleted on the server
just deploy         # uploads the main build to the OVH hosting.
```

`scripts/release.sh` extracts `main` with `git archive` into a folder outside the repository
installs the locked dependencies and runs the `release` script of that commit's `package.json`
(type check, build, tests), stopping on any failure.

`just deploy` uploads what `just preview` show.

The upload mirrors the build into the hosting's `www/` folder over SFTP with `lftp`,
deleting remote files that are not in the build.

The FTP login and server come from OVH Manager (Web Cloud > Hosting > FTP - SSH)
and go in `.env`, and the password is asked each time.

```sh
cp .env.example .env   # then set OVH_SFTP_USER and OVH_SFTP_HOST in .env
```

### Automatic deploys

`.github/workflows/deploy.yml` does the same as `just deploy` on GitHub for every push to `main`

It needs these secrets in the `production` environment (Settings > Environments > production),

| Secret                 | Value                                    |
|------------------------|------------------------------------------|
| `OVH_SFTP_USER`        | FTP login                                |
| `OVH_SFTP_HOST`        | FTP server                               |
| `OVH_SFTP_PASSWORD`    | FTP password                             |
| `OVH_SFTP_KNOWN_HOSTS` | output of `ssh-keyscan "$OVH_SFTP_HOST"` |

`just deploy` still works as a manual fallback.
