# VPCI Panther Press Website

## ⚙️ Stack

- [**Next.js** + **TypeScript**](https://nextjs.org/)
- [**Preline UI**](https://preline.co/)
- [**Aceternity UI**](https://ui.aceternity.com/components/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**Lucide Icons**](https://lucide.dev/)
- [**fuse.js**](https://fusejs.io/)
- [**Directus CMS**](https://directus.io/)
- **Cloudflare Pages** (via [OpenNext](https://opennext.js.org/cloudflare))

## 👨🏻‍💻 Running Locally

**Recommended extensions:**

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

1. Clone the repository:

```bash
git clone https://github.com/vpci-panther-press/panther-press-next.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Adding Data

Content is managed through **Directus CMS**.

### Adding Articles, Authors, and Other Content

1. **Access the Directus Dashboard**: Navigate to the Directus admin panel

2. **Create or Edit Content**: Use the Directus interface to:
   - Add new articles with rich text content (HTML)
   - Manage author profiles
   - Upload images and media

3. **Preview Changes**: The Next.js application automatically fetches the latest content from Directus

4. **Publish**: Once you're satisfied with your changes in Directus, they will be reflected on the website after the next build or when the cache refreshes

Note:
As a board member, all new articles you create will be published as a draft by default and will not be seen on the website. You will be able to preview all articles by entering draft mode in the Directus admin panel. The draft property will be toggled off by board managers when the article is ready to be published live, which will then be reflected on the website immediately.

### Repository Structure

```
app/                 # Next.js App Router
  api/                # API route for Directus draft mode
  about-us/           # About Us page
  articles/           # Article pages
  authors/            # Author pages
  issues/             # Issues pages
  search/             # Search page
  tags/               # Tag pages
components/         # Reusable components + page structures, more abstracted
  aceternity/        # Aceternity UI components; only some are used, customized as needed
lib/                # Library code (Directus client + wrapper functions, etc.)
data/               # Global site config (ex. site name, description, etc.)
```

## 🚀 Deployment

The website is automatically deployed to Cloudflare Pages when changes are pushed to the main branch.

### Manual Deployment

To manually deploy to Cloudflare:

```bash
pnpm run deploy
```

To preview the production build locally on the Cloudflare runtime:

```bash
pnpm run preview
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                                 |
| :---------------- | :----------------------------------------------------- |
| `pnpm install`    | Installs dependencies                                  |
| `pnpm dev`        | Starts local dev server at `localhost:3000`            |
| `pnpm build`      | Build your production site to `./.next/`               |
| `pnpm start`      | Preview your build locally with Next.js                |
| `pnpm lint`       | Lint with ESLint                                       |
| `pnpm deploy`     | Build and deploy to Cloudflare Pages                   |
| `pnpm upload`     | Build and upload to Cloudflare (without deploying)     |
| `pnpm preview`    | Preview production build on Cloudflare runtime locally |
| `pnpm cf-typegen` | Generate TypeScript types for Cloudflare environment   |

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Directus Documentation](https://docs.directus.io/)
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
