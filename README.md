# GuardScan marketing & docs site

Source for <https://guardscancli.vercel.app>, the site for [GuardScan](https://github.com/ntanwir10/GuardScan), a privacy-first AI code review and security scanning CLI.

Stack: Vite, React, TypeScript, React Router, Tailwind CSS, shadcn/ui.

## Run locally

Requires Node.js 22 (the same version GuardScan itself requires).

```bash
npm ci
npm run dev        # http://localhost:8080 (see vite.config.ts)
```

## Build and check

```bash
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm run lint
```

## Deploy

Vercel project `guardscan-landing-site` deploys `main` to production automatically. Pull requests get SSO-protected preview deployments, so merging to `main` is what publishes the site. `vercel.json` rewrites every path to `index.html` so client-side routes work on refresh.

## Where content comes from

- Pages and components: `src/pages/` and `src/components/`. The CLI reference is `src/pages/Documentation.tsx`.
- Blog posts: `src/data/blogArticles.ts` (one entry per slug; the sitemap in `public/sitemap.xml` must be updated by hand when posts are added or their dates change).
- Install channels: `src/lib/install-channels.ts`. Only entries with `live: true` render; flip a channel to `true` only after it is actually published.
- SEO and structured data: `src/components/SEO.tsx`, `src/lib/seo-schemas.ts`, `public/sitemap.xml`, `public/robots.txt`, `public/site.webmanifest`.

## Keeping the site accurate

The source of truth for commands, flags, and supported models is the GuardScan repository (`cli/src/commands/*.ts`, `cli/src/providers/model-registry.ts`) and the published CLI's `--help` output. Check any `guardscan ...` command against `guardscan <command> --help` before adding it, and do not add pricing for third-party products or compliance claims.
