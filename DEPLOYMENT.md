# Deploying the portfolio to Vercel

Vercel hosts the site for free and gives you a public link like `https://rj-salundaga.vercel.app`.
The recommended setup connects Vercel to a GitHub repository, so every time you push a change, the live site updates automatically.

**Time needed:** about 15–20 minutes the first time.

---

## Before you start

Run these in a terminal opened in the `rj-portfolio` folder (VS Code: **Terminal → New Terminal**):

```bash
npm run lint
npm run build
```

Both must finish without errors. If `npm run build` fails here, it will fail on Vercel too.

Also double-check:

- **Resume** — `public/documents/RJ-Salundaga-Resume.pdf` will be publicly downloadable. Make sure you're comfortable sharing everything in it (phone number, address, references' phone numbers).
- **Screenshots** — anything visible in `public/images/` will be public.
- **File names** — Vercel's servers are case-sensitive, Windows is not. `Dashboard.JPG` and `dashboard.jpg` are *different* files once deployed. Keep file names exactly as they're written in `src/data/`.

---

## Option A — GitHub + Vercel (recommended)

### Step 1: Create a GitHub repository

1. Sign in at [github.com](https://github.com) (create a free account if you don't have one).
2. Click **+** (top right) → **New repository**.
3. Repository name: `rj-portfolio`. Choose **Public** (recruiters can then see your code) or **Private**.
4. **Leave "Add a README", ".gitignore", and "license" unchecked** — the project already has these.
5. Click **Create repository**. Keep the page open; you'll need the repository URL.

### Step 2: Push the project to GitHub

In the terminal, inside `rj-portfolio`:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rj-portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

- If Git says **"Please tell me who you are"**, set your name and email for this project, then run the `git commit` line again:
  ```bash
  git config user.name "RJ Salundaga"
  git config user.email "angisalundaga@gmail.com"
  ```
- On the first `git push`, a browser window may ask you to sign in to GitHub — approve it.
- `node_modules`, `dist`, and `.env.local` are excluded automatically by `.gitignore`, so they won't be uploaded.

Refresh the GitHub page — your files should now be there.

### Step 3: Import the project into Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign Up** → **Continue with GitHub** (choose the free *Hobby* plan).
2. On the dashboard, click **Add New… → Project**.
3. Find `rj-portfolio` in the list and click **Import**. (If it's missing, click **Adjust GitHub App Permissions** and give Vercel access to the repository.)
4. Vercel detects the settings automatically. Confirm they read:

   | Setting | Value |
   | --- | --- |
   | Framework Preset | **Vite** |
   | Root Directory | `./` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **Deploy**. After about a minute you'll see a preview of the site and a link like `https://rj-portfolio-abc123.vercel.app`.

### Step 4: Get a clean URL

1. In the Vercel project, open **Settings → Domains**.
2. Edit the `.vercel.app` domain to something like `rj-salundaga.vercel.app` (if it's available) and save.

A custom domain (e.g. `rjsalundaga.com`) can be added on the same page later if you buy one.

### Step 5: Updating the site later

Edit files locally, check with `npm run dev`, then:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

Vercel rebuilds and publishes automatically within a minute or two. You can watch progress under the project's **Deployments** tab.

---

## Option B — Deploy from the terminal (no GitHub)

Quicker for a one-off, but updates are manual.

```bash
npx vercel          # first run: log in, then accept the defaults
npx vercel --prod   # publish to your production URL
```

Run `npx vercel --prod` again whenever you want to publish changes.

---

## After the first deploy

1. **Open the live site on your phone and laptop.** Check the navigation, the Axioma case study, the resume download, and the contact form.
2. **Add your GitHub profile link** — you'll have one now. In `src/data/site.js`, set
   `github: 'https://github.com/YOUR-USERNAME'` (and `linkedin` if you have a profile), then push.
3. **Make the social-preview image absolute.** In `index.html`, change
   `content="/images/projects/axioma/dashboard-overview.jpg"` to your full URL, e.g.
   `content="https://rj-salundaga.vercel.app/images/projects/axioma/dashboard-overview.jpg"`.
   Some platforms (LinkedIn, Facebook) need the full URL to show the preview image.
4. **Test the link preview** by pasting your URL into a LinkedIn post draft or Messenger chat.

---

## Optional: make the contact form send messages directly

Right now the form opens the visitor's email app. To receive messages without that step:

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. In Vercel: **Settings → Environment Variables** → add
   - Key: `VITE_CONTACT_ENDPOINT`
   - Value: your Formspree endpoint
   - Environments: Production (and Preview if you like)
3. Go to **Deployments**, open the latest one, and click **⋯ → Redeploy**.
   Environment variables are applied at build time, so the redeploy is required.
4. Send yourself a test message from the live site and confirm it arrives.

For local testing, put the same line in a `.env.local` file (see `.env.example`) and restart `npm run dev`.

---

## Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Build fails on Vercel | Run `npm run build` locally and fix the error shown; the Vercel build log shows the same message. |
| An image or the resume shows on your PC but not on Vercel | File-name capitalization or extension mismatch (e.g. `.JPG` vs `.jpg`, or `.pdf.pdf`). Rename the file to match `src/data/` exactly, commit, and push. |
| Changes don't appear | Check that `git push` succeeded and the latest deployment finished; then hard-refresh with **Ctrl + F5**. |
| `git push` is rejected | The GitHub repository wasn't empty. Run `git pull origin main --allow-unrelated-histories`, then `git push` again. |
| Contact form still opens the email app | `VITE_CONTACT_ENDPOINT` isn't set in Vercel, or you didn't redeploy after adding it. |
