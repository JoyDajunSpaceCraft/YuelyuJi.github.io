# Yuelyu Ji — personal website

A static site. No Jekyll, no Ruby, no build step: GitHub Pages serves these files
exactly as they are in the repo, so **push = deploy**.

Live at <https://joydajunspacecraft.github.io/YuelyuJi.github.io/>

```
index.html            all of the content lives here
assets/css/style.css  all of the styling
assets/js/main.js     theme toggle, scrollspy, news collapse, publication filter
assets/img/           prof_pic.png, favicon.svg
assets/pdf/cv.pdf     your CV (drop the file here; the site links to it)
404.html  robots.txt  sitemap.xml  .nojekyll
```

## Editing

Everything you'd normally want to change is in `index.html`, marked with
`<!-- EDIT: ... -->` comments. Open it, copy the nearest existing block, change
the text, commit. That's the whole workflow.

### Add a news item

Newest first, at the top of `<ul class="news">`:

```html
<li>
  <time datetime="2026-09-01">Sep 2026</time>
  <div class="body"><em>Paper title</em> accepted to <a href="URL">Venue</a>.</div>
</li>
```

The list collapses to the latest 6 with a "Show all news" button — that's
automatic, nothing to configure.

### Add a publication

Copy one `<article class="pub">` block into the right year in `<div id="pubList">`.
Two attributes matter:

- `data-type` — `conference`, `journal`, or `preprint`; drives the filter buttons.
- `data-year` — must match the `data-year` on the `<h3 class="pub-year">` above it,
  so the year heading hides correctly when filtered out.

Add `pub--selected` to the `class` to mark it as a highlighted paper.
For a new year, also copy a `<h3 class="pub-year" data-year="2027">2027</h3>` heading.

Wrap your own name as `<span class="me">Yuelyu Ji</span>` so it renders in bold.

### Add a project

Copy one `<article class="card">` block in the `#projects` section.

### Replace the CV

Put the PDF at `assets/pdf/cv.pdf`. Both the "CV" chip in the header and the
"Download full CV" button already point there. The CV *section* on the page is
plain HTML in `#cv` — edit the timeline entries directly.

### Change the portrait

Replace `assets/img/prof_pic.png`. Any portrait-ish aspect ratio works; the CSS
crops it to 4:5.

### Change the colours

The palette is the `--accent*` variables at the top of `assets/css/style.css`,
defined once for light and once under `:root[data-theme="dark"]`. Change those
six values and the whole site follows.

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Outstanding TODOs

Search `index.html` for `TODO(` — each one marks a spot where a real value still
needs to be filled in.
