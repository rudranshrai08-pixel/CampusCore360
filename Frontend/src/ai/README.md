# CampusCore360 AI support logic

This folder contains the browser-side student support analysis used by the Student Success AI screen.

- `studentSuccessEngine.js` reads the current student session records and college thresholds.
- It flags attendance or performance below criteria, detects a falling average, assigns a relative explainable support score, and selects a personalized study suggestion.
- It creates a reviewable email draft and downloads a CSV cohort report.

This is a transparent, rules-based prototype. It does not call a hosted AI model or automatically send messages. When the backend is available, keep model and email credentials on the server and connect authenticated student, attendance, and assessment APIs here through server endpoints.

For the presentation walkthrough, see the repository-level `AI_IMPLEMENTATION_GUIDE.md`.
