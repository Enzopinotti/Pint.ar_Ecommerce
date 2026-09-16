# Pint.ar deployment cutover — 2026

## Target authority

The maintained 2026 storefront is intended to publish at:

`https://enzopinotti.github.io/Pint.ar_Ecommerce/`

The Pages artifact is built from `modern/` with the Vite base `/Pint.ar_Ecommerce/`. `BrowserRouter` derives its basename from `import.meta.env.BASE_URL`, so the same source runs at `/` in Docker/local development and under the repository subpath on GitHub Pages.

## Deep-route strategy

The deployment workflow copies `dist/index.html` to `dist/404.html`. GitHub Pages can therefore return the same SPA shell for direct deep-link navigation while React Router resolves the requested client route under the repository basename.

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
6. uploads only `modern/dist`;
7. deploys through the `github-pages` environment.

Actions are SHA-pinned. Permissions are limited to `contents: read`, `pages: write` and `id-token: write` as required by GitHub Pages deployment.

## Existing historical publisher

At the start of this cutover the repository still launched GitHub's dynamic `pages build and deployment` workflow from the branch-based Pages configuration. That publisher represents the historical repository-root deployment contract and can race with the maintained Actions publisher.

A successful custom deployment is therefore not enough to claim single deployment authority. The repository is only fully cut over when GitHub Pages **Build and deployment → Source** is set to **GitHub Actions** and a subsequent `main` push no longer launches the dynamic branch/Jekyll publisher.

The GitHub connector used for this modernization does not expose that Pages administration mutation, so this setting must remain a visible operational boundary rather than being silently assumed.

## Rollback

Code rollback is deterministic:

- pre-storefront foundation merge: `d9c2390c02452ca30533fd70a6cec6575da44f5a`;
- storefront maturity merge: `b69517c84f9e6e7f19f4348b50ea1f33f1d477f2`;
- exact historical 2023 source: `3224d89c0c512b3509cea25f1c49a119d371e338`.

For a failed public cutover, redeploy the last known-good maintained commit rather than rewriting history. The historical Vercel deployment remains historical evidence and is not the rollback authority for 2026.

## Closure evidence required

Before issues #3 and #1 can close:

- permanent quality must pass on the cutover PR;
- cutover merge must pass post-merge quality;
- custom Pages build/deploy must succeed;
- the public origin must serve the maintained asset hashes/content;
- direct/deep route behavior must be smoke-tested;
- the duplicate dynamic publisher must no longer be active on a subsequent `main` push.
