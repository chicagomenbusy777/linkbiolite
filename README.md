# LinkBio Lite

Radically simple "link in bio" page builder — sign up, claim a slug, add
links, get a shareable public page.

- **Live site**: https://chicagomenbusy777.github.io/linkbiolite/
- **Setup**: [SETUP.md](SETUP.md) — Firebase connection, ~10 min.

## Files

| File | Role |
|---|---|
| `index.html` | Landing page |
| `login.html` / `auth.js` | Signup/login |
| `dashboard.html` / `dashboard.js` | Claim slug, edit profile + links |
| `page.html` / `page.js` | Public profile page (`?u=slug`) — no auth needed to view |
| `firestore.rules` | Owner-only writes, public reads |
