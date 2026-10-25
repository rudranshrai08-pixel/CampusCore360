# CampusCore360 Student Success AI Demo Guide

## What to show

Open **Student Success AI** from the workspace navigation, or go to `/student-success`.

1. Point out the college criteria. The demo defaults to **75% minimum attendance** and **60% minimum performance**. Open **Criteria** to change them; the results recalculate immediately.
2. Open **How it works**. It explains the three stages: read the student signals, score the concern, and suggest a next step.
3. Review the student cards. They compare attendance, current average, and previous average. Each card shows the concern, relative support score, contributing factors, and a personalized recommendation.
4. Show the dashboard bell. It lists students who meet the current support criteria and links to the detailed analysis.
5. Select **Prepare message** on a student. Review the personalized email preview and choose **Open email draft**. This hands the reviewed draft to the user's email application.
6. Choose **Download report** to export the current student analysis as CSV for review in a spreadsheet.
7. In **Students**, edit a record's attendance average, current average, or previous average. Return to Student Success AI to show how the alert and recommendation respond to the updated figures.

## How the demo analysis works

The prototype uses a small, deterministic, explainable rules engine in `Frontend/src/ai/studentSuccessEngine.js`:

- Flag attendance when it is below the configured attendance minimum.
- Flag performance when the current average is below the configured performance minimum.
- Flag a falling trend when the current average is at least 5 points below the previous average.
- Calculate a **relative support score**, not a probability: attendance gap × 5 (45% weight), performance gap × 5 (35% weight), and downward trend × 10 (20% weight). Each factor is capped at 100.
- Choose a supportive next step based on the combination of concerns. Use the same student metrics and recommendation to create a message preview.

The rules run in the browser against the current student records in `sessionStorage`. The attendance value is the student's aggregate attendance average entered in Student Management; the daily class register is still a separate demo list. The included records are sample data. The score helps prioritize review; it is not a diagnosis, a prediction of a student's future, or a substitute for a faculty member's judgment.

## Where the work lives

- `Frontend/src/Components/student-success/StudentSuccess.jsx` — student analysis screen, criteria controls, notifications, message preview, and report action.
- `Frontend/src/Components/student-success/studentSuccessEngine.js` — thresholds, support rules, recommendations, message text, and CSV generation.
- `Frontend/src/Components/student-success/student-success.css` — responsive screen styling.
- `Frontend/src/Components/students/students.jsx` — attendance and current/previous performance inputs that feed the analysis.
- `Frontend/src/Components/modules/ModulePage.jsx` — shared workspace navigation and student support notification bell.
- `Frontend/src/App.jsx` — dashboard navigation and `/student-success` route.

## What is and is not connected yet

This is a **frontend demo of an explainable AI-style decision-support workflow**. It currently does not call a generative AI model, connect the daily class register to attendance averages, save to a server database, or send mail automatically. The message is prepared for a person to review; the email application handles any sending.

When the backend is ready, connect authenticated attendance and assessment APIs, persist student records and college criteria on the server, and move any model or email credentials to server-side environment variables. Keep the current threshold checks as clear guardrails, ask a model only for optional supportive wording, and require staff review before messages are sent. Never put a private model or email API key in the React frontend.

## Short presentation script

> “This is the Student Success AI prototype for CampusCore360. It reviews each student's attendance, current marks, and previous marks against configurable college criteria. When it sees a low attendance value, low performance, or a significant decline, it explains the signals, assigns a relative support score, and recommends a practical next step. Staff can preview a personalized message and export the cohort analysis. For this demo, the analysis is explainable browser-side logic using sample session data; the backend, live data, external AI model, and automatic email delivery will be connected in a later phase.”
