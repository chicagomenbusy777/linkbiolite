# LinkBio Lite — Firebase setup

Same pattern as the other Firebase-backed projects in this batch.

1. https://console.firebase.google.com → new project.
2. **Build → Firestore Database → Create database** → Production mode.
3. **Build → Authentication → Sign-in method** → enable **Email/Password**
   (every user signs up themselves — no single admin account here).
4. Project settings → Your apps → register a web app → copy the config
   into `firebase-config.js` (copy from `firebase-config.js.example`).
   Commit it — it's a client identifier, not a secret.
5. **Firestore Database → Rules** → paste `firestore.rules` → Publish.
6. Push to `main`, enable GitHub Pages.

Try it: sign up → claim a slug → add a couple links → save → open
`page.html?u=yourslug` in a new tab.

## Known MVP limitations

- One profile per account. No slug-change flow once claimed (would need
  copying data to a new doc and deleting the old one).
- No custom domains, no analytics on link clicks, no drag-to-reorder for
  links (just add/remove, top-to-bottom order = input order).
- No password reset / email verification.
