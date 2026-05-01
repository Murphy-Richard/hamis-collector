# HAPPY Program Questionnaire

Client + Server implementation for Jobberman Ghana HAPPY Program.

## Files
- `index.html` — main form and lookup UI
- `styles.css` — styling
- `script.js` — client logic; contains `APPS_SCRIPT_URL`
- `apps-script/Code.gs` — server code (paste into Apps Script editor)

## Deployment
1. Open Google Sheet → Extensions → Apps Script.
2. Paste `Code.gs` into the editor.
3. Deploy → New deployment → Web App.
   - Execute as: Me
   - Who has access: Anyone
4. Copy the Web App URL (`.../exec`) and paste into `script.js` as `APPS_SCRIPT_URL`.

## Hosting
- Upload `index.html`, `styles.css`, and `script.js` to GitHub Pages, Netlify, Vercel, or Render.
- Ensure icons (`icon-152.png`, `icon-512.png`) are present if referenced.

## Testing
- Open hosted `index.html`.
- Use Lookup to query existing participant.
- Submit onboarding (no ParticipantID) → new row in General.
- Submit training/placement follow-ups with ParticipantID → rows in CapacityBuilding/Placement.
