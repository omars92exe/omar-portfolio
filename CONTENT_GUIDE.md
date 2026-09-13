# Omar Alothman — Projects

The website uses the 13 numbered project folders supplied on 13 September 2026. Content is stored in `content/projects/`; numerical `order` controls both the scrolling sequence and project index. Original SSD files are unchanged.

Each project has a cover, description and an ordered `videos` array. Each video has a `title`, YouTube URL and `format` (`landscape` or `vertical`). Standard and Shorts links both use YouTube embeds. No local video files are served. One video plays at a time within the project overlay.

Images live under `public/media/projects/`. Optional `stills` have `image`, `caption`, and `kind` (`event` or `press`). TIFF and HEIC sources were converted to browser-friendly JPEG copies. Press images open at full size. Optional linked articles use the `press` array.

Add projects through new JSON files, or later through the prepared Pages CMS Projects collection. Use `published: false` for drafts. The About page uses only biography and creative approach from `content/profile.json`, with contact email omar@omaralothman.net.

GitHub and deployment remain deferred. Future Cloudflare Pages build: `npm run build`; output: `dist`; Node 22. The CMS configuration is prepared locally, not connected. Use a clean export when first moving to GitHub, to avoid including old MP4 files from local Git history.

Run `npm run check:content` to validate content and `npm run build` to generate the static website.

The extra Khuzam event MP4 has no separate YouTube link in its info document; event photographs are included. All 34 YouTube URLs in the documents are included in their written order.

## Static Vite architecture

`index.html` loads `src/main.tsx`. React Router renders `/` and `/about` entirely in the browser. Project JSON is bundled at build time using Vite's eager imports; there are no runtime content requests or server components. The existing components and stylesheet are retained.

Cloudflare Pages settings: framework Vite, build command `npm run build`, output directory `dist`, Node 22 or newer. No Worker entry point, Wrangler configuration, Functions directory, KV namespace, or Images binding is required. `public/_redirects` rewrites navigation routes to `index.html` so a direct visit or refresh on `/about` works.

Local development: `npm run dev`. Production verification: `npm run build`, then `npm run preview`. Both use port 3000 by default. Deploy only the contents of `dist`, not source or node_modules. Hosting account resources have not been changed.

Routing references: https://reactrouter.com/start/declarative/installation and https://developers.cloudflare.com/pages/configuration/serving-pages/
