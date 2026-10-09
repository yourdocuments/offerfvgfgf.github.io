# WebsitesDeal Offer Page

Upload all files to the repo root, keeping the admin folder: index.html, blog.html, snkbusiness.html, posts.css, posts.js, logo.jpg, favicon.png, og.png, admin/index.html.

The logo and favicon are embedded inside the pages, so they show even if the image files are missing.

## Admin dashboard (yoursite/admin/)
1. Firebase console: create a project, add a Web app, copy the config.
2. Build > Authentication > Sign-in method: enable Email/Password. Add your own user (Users > Add user).
3. Build > Firestore Database: create the database, then Rules tab: paste firestore.rules (change the email) and Publish.
4. admin/index.html: fill in FIREBASE and SUPER_ADMIN at the top of the script.
5. index.html: fill in SITE = { projectId, apiKey } near the bottom of the script.
6. Open /admin, sign in, Site settings > Save. Add more admins from the Admins tab.

Without step 5 the page simply uses the defaults written in the OFFER block.

Navbar: Home | Subscribe | Our Sites | SNK Business (snkbusiness.snkbp.com) | Blog | How it works | Support (support.websitesdeal.com)

Before sharing links: replace `https://YOUR-DOMAIN/og.png` in the og:image tags with your real domain.
