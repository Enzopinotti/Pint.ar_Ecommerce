# Pint.ar deployment cutover — 2026

## Target authority

The maintained 2026 storefront publishes at:

`https://enzopinotti.github.io/Pint.ar_Ecommerce/`

The product source authority is `modern/`. The Pages artifact is built from that directory with Vite base `/Pint.ar_Ecommerce/`. `BrowserRouter` derives its basename from `import.meta.env.BASE_URL`, so the same source runs at `/` in Docker/local development and under the repository subpath on GitHub Pages.

## Deep-route strategy

The deployment workflow copies `modern/dist/index.html` to `modern/dist/404.html`. GitHub Pages can therefore return the same SPA shell for direct deep-link navigation while React Router resolves the requested client route under the repository basename.

The repository root also contains generated `index.html`, `404.html`, `assets/`, `robots.txt`, `sitemap.xml` and `.nojekyll`. Those files are **not product source**. They are a compatibility mirror of the exact Pages build so the legacy branch-based publisher cannot downgrade production.

This does not change the Docker contract: Nginx continues to provide server-side SPA fallback at `/`.

## Public metadata

The production artifact carries:

- canonical URL for the GitHub Pages origin;
- Open Graph title/description/url;
- `robots.txt`;
- `sitemap.xml`;
- `.nojekyll`.

Products, prices and stock remain documented demo fixtures; publication does not convert the project into a commercial store.

## Deployment workflow

`.github/workflows/pages-deploy.yml`:

1. checks out `main`;
2. installs the frozen pnpm graph;
3. runs `pnpm build:pages`;
4. creates the deep-route `404.html` shell;
5. verifies base-path, canonical, robots and sitemap contracts;
6. verifies byte-for-byte parity against the root compatibility mirror;
7. uploads only `modern/dist`;
8. deploys through the `github-pages` environment.

Actions are SHA-pinned. Permissions are limited to `contents: read`, `pages: write` and `id-token: write` as required by GitHub Pages deployment.

`Modern Pint.ar quality` independently rebuilds the Pages artifact on pull requests and `main` pushes and fails if any root mirror file or generated asset diverges.

## Legacy publisher compatibility

At the start of this cutover the repository still launched GitHub's dynamic `pages build and deployment` workflow from the historical branch/Jekyll Pages configuration. On merge `a458fbb55020379baad2ceff78856a0d530e198b`, both the custom Actions publisher and the dynamic branch publisher executed successfully, with the legacy publisher completing after the custom deployment. That proved the race was real.

The repository therefore no longer relies on Settings being changed immediately. The branch-source publisher now sees a repository-root compatibility mirror generated from the same `modern/` Pages artifact. Both publishing paths are required to deliver equivalent storefront bytes for the public entrypoint/assets.

Changing **Settings → Pages → Build and deployment → Source** to **GitHub Actions** remains the preferred simplification because it removes duplicate work, but it is no longer a product-correctness prerequisite. Until that admin setting changes, CI parity prevents the legacy publisher from reverting production to the 2023 source tree.

## Historical preservation

The root still retains the original CRA/Firebase source tree (`src/`, `public/`, historical package files). It is not rewritten into the modern application. The exact historical authority remains commit:

`3224d89c0c512b3509cea25f1c49a119d371e338`

The generated root Pages files are delivery compatibility artifacts only; they do not redefine the historical source authority.

## Rollback

Code rollback is deterministic:

- pre-storefront foundation merge: `d9c2390c02452ca30533fd70a6cec6575da44f5a`;
- storefront maturity merge: `b69517c84f9e6e7f19f4348b50ea1f33f1d477f2`;
- Pages cutover merge: `a458fbb55020379baad2ceff78856a0d530e198b`;
- exact historical 2023 source: `3224d89c0c512b3509cea25f1c49a119d371e338`.

For a failed public cutover, redeploy the last known-good maintained commit rather than rewriting history. The historical Vercel deployment remains historical evidence and is not the rollback authority for 2026.

## Closure evidence required

Before issues #3 and #1 can close:

- permanent quality passes with mirror parity enabled;
- the parity PR passes container qualification;
- custom Pages build/deploy succeeds after merge;
- the dynamic branch publisher, if still enabled, also completes without changing the public artifact contract;
- the public origin serves the maintained canonical/base-path/assets;
- direct/deep route behavior is smoke-tested.
