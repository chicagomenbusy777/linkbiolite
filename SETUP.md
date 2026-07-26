# LinkBio Lite — setup (no Firebase, no signup)

Rebuilt as a single-owner static page: no account, no backend, no
dashboard. You edit one file to change your links.

## Setup

1. Copy `config.js.example` → `config.js`.
2. Fill in your name, bio, and links:
   ```js
   window.PROFILE_CONFIG = {
     displayName: "홍길동",
     bio: "개발자 / 콘텐츠 크리에이터",
     links: [
       { label: "인스타그램", url: "https://instagram.com/..." },
       { label: "유튜브", url: "https://youtube.com/..." }
     ]
   };
   ```
3. Commit `config.js` and push. That's it — refresh the live site.

To change your links later: edit `config.js`, commit, push. No login.

## Trade-off vs. the earlier Firebase version

This is one page for one person now, not a SaaS where many different
people sign up and each get their own `yoursite.com/page.html?u=slug`.
If you want that back (many customers, each with their own account and
page), it needs a real backend again — say so and it can be rebuilt
that way, same as before.
