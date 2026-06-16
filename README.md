# santana.ie

Astro-powered personal website for Luiz Henrique Santana.

## Local Development

```sh
npm install
npm run dev
```

## Checks And Build

```sh
npm run check
npm run build
```

The build generates the static site in `dist/` and creates `dist/resume.pdf` from the print-optimized resume route.

## Cloudflare Pages

- Root directory: `personal-site`
- Build command: `npm run build`
- Output directory: `dist`
- Custom domain target: `santana.ie`

## Content

- Profile data: `src/data/profile.ts`
- Resume source: `src/content/resume/resume.md`
- Projects: `src/content/projects/*.md`
- Optional avatar image: add `public/avatar.jpg`
