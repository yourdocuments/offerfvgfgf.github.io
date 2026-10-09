# WebsitesDeal Offer Landing Page

## Files
- `index.html` — public single-offer landing page.
- `admin/index.html` — demo admin dashboard.

## Publish to GitHub Pages
1. Download and unzip this folder.
2. Upload `index.html` and the `admin` folder to the root of your GitHub repository.
3. In GitHub, open **Settings → Pages**.
4. Select **Deploy from a branch**, choose your main branch and `/ (root)`, then save.
5. Public page: `https://YOUR-USERNAME.github.io/REPOSITORY/`
6. Admin page: `https://YOUR-USERNAME.github.io/REPOSITORY/admin/`

## Demo admin login
- Username: `admin`
- Password: `DealAdmin2026!`

Change the demo credentials in `admin/index.html` before publishing. This client-side login is for preview/demo only; it is not secure and must not be used for sensitive or production admin access.

## Important data limitation
The admin saves settings in browser `localStorage`. It updates the public page only when opened in the same browser/device. It does **not** publish changes to all visitors. To manage live public offers for everyone, connect Firebase (Firestore + Firebase Authentication + security rules) or another shared backend.

## Offer button and support
- The default offer CTA links to `https://support.websitesdeal.com`.
- Edit the destination from the admin dashboard (demo mode).
- Support links point to `https://support.websitesdeal.com`.

## Suggested next production upgrade
Add Firebase Authentication for admin-only access, Firestore for shared public offer settings, and strict Firestore rules. Do not store secrets or payment credentials in client-side HTML.
