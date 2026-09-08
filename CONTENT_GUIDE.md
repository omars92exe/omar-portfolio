# Your portfolio

The website content is kept in `content/portfolio.ts`. Add or reorder a project in the `projects` list and it will appear in both the scrolling opening and the project index. The count updates automatically.

Each project has a title, category, year, image, role, credit, description and longer story. Add films with a local `src`, a YouTube video ID, or an external `url`. Add a `gallery` list for images. Media paths start with `/media/` and refer to files in `public/media`.

The `profile` object contains the biography, experience and social links. The `music` list supplies the music section. The collage section currently displays six artworks extracted from the supplied portfolio; replace these with original high-resolution files when available.

Run the development preview with `npm run dev`. Run `npm run build` to create the static website. The existing Sites registration is in `.openai/hosting.json`; keep its project ID when updating this site.

Content sources: CV and portfolio dated May 2026, the supplied portrait, and supplied videos. Project collection names such as Imagined Worlds, Behind the Frame, Fragments of Memory and Stories of the UAE are editorial labels for this site. Employment listed as current reflects the supplied CV. Personal identity documents and administrative letters are not website assets.
