InterviewAI — Frontend enhancements

What's included:
- Dark / Light theme toggle (persistent via localStorage)
- Responsive & accessibility-minded tweaks
- Lazy-load helper for images (data-src)
- Simple service worker (offline caching)
- Basic PWA manifest
- Contact modal (client-side only, stores analytics locally)
- Small i18n selector scaffold
- Privacy-friendly local analytics (localStorage)

How to test locally:
1. Open `index.html` in your browser (preferably via a local server).
2. Toggle theme via the moon/sun button in the top-right.
3. Click the floating "Contact" button to send a sample message (stored locally).
4. To test service worker, serve the folder over HTTP (e.g., `npx http-server .`) and open in Chrome.

Files added: `app.js`, `sw.js`, `manifest.json`, `README.md`.
