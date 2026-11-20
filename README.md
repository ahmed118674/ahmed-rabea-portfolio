# Ahmed Rabea | Personal Portfolio

A fast, responsive portfolio website with light and dark themes. It is plain HTML, CSS and JavaScript, so it needs no build step and no installs.

## Project structure

```
ahmed-rabea-portfolio/
├── index.html          Page structure and SEO tags
├── css/
│   └── styles.css      All styling (colors and fonts are variables at the top)
├── js/
│   ├── data.js         ALL YOUR CONTENT lives here (edit this file)
│   └── main.js         Builds the page from data.js (no need to edit)
├── assets/
│   ├── favicon.svg     Browser tab icon
│   └── images/
│       ├── profile.jpg Your hero photo
│       └── projects/   Put project screenshots here
└── README.md
```

## How to edit your content

Open `js/data.js`. Everything is in one place:

| To change...                    | Edit this in `data.js`                    |
| ------------------------------- | ----------------------------------------- |
| Name, title, intro              | `name`, `title`, `intro`                  |
| Profile photo                   | Replace `assets/images/profile.jpg`, or change `photo` |
| LinkedIn, Facebook, WhatsApp, email | `links`                               |
| Biography and interests         | `about`                                   |
| Skills                          | `skills` (add or remove lines)            |
| Projects                        | `projects` (copy the template in the comment) |
| Achievements, certificates, events | `achievements` (copy the template)     |
| CV download button              | `links.cv` (path to a PDF, or `""` to hide) |
| Default theme                   | `settings.defaultTheme`                   |

While `projects` and `achievements` are empty, the site shows clearly marked placeholder cards. Once you add real entries, the placeholders disappear. To hide those sections entirely until you have content, set `settings.showPlaceholders` to `false`.

### Adding a project

1. Put a screenshot in `assets/images/projects/` (about 1600x1000 px works well).
2. In `data.js`, add to the `projects` list:

```js
{
  name: "My App",
  description: "What it does in one or two sentences.",
  tech: ["Flutter", "Dart"],
  image: "assets/images/projects/my-app.jpg",
  link: "https://github.com/your-name/my-app",
  linkLabel: "View on GitHub"
},
```

### Page title and link preview

The browser tab title and the preview shown when you share the link (WhatsApp, LinkedIn and others) come from the `<title>` and `<meta>` tags at the top of `index.html`. Edit them there if you change your title.

## Preview locally

Open `index.html` in a browser. Or run a small local server:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish for free

The site is static, so any static host works:

- **Netlify Drop**: drag the whole folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the folder to a repository, then enable Pages in the settings
- **Cloudflare Pages** or **Vercel**: connect the repository or upload the folder

For link previews to show your photo on social networks, use a full web address in the `og:image` tag in `index.html` once you know your final domain (for example `https://your-domain.com/assets/images/profile.jpg`).

## Fonts

The site loads Bricolage Grotesque and Instrument Sans from Google Fonts. If the fonts cannot load (offline, for example), it falls back to your system fonts.
