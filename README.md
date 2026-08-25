# stools Worker

Serves SuperTranslate at:

`https://stools.whyacat-on-steam.workers.dev/SuperTranslate`

## Cloudflare Git integration

- Build command: leave blank
- Deploy command: `npm run deploy`

Cloudflare/npm installs the dependencies from `package.json` before deploy.

## Local testing

```bash
npm install
npm run dev
```

Then open:

`http://localhost:8787/SuperTranslate`

## Structure

- `src/index.js` — Worker routes
- `public/SuperTranslate/index.html` — SuperTranslate frontend
- `wrangler.jsonc` — Worker + static asset config
