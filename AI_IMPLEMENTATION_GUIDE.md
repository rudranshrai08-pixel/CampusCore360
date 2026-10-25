# CampusCore360 Student Success AI: Presentation Guide

## Open the demo

Run the frontend with `npm run dev`, then open the local address printed in the terminal. The home page opens Student Success AI. You can also choose **Student Success AI** from the workspace sidebar.

## What the demo shows

- Six sample students: Mayank Shakya (MCA), Ansh Chaurasia (B.Tech AI), Ankit Singh (B.Tech CS AI), Alok Singh (CS IT), Aman Mishra (CS IT), and Tanishq Singh (CS IT).
- The sample attendance values are all above the default college minimum of 75%. Some assessment averages are intentionally low or falling so the support alerts can be demonstrated.
- Email addresses use the reserved `example.com` domain as dummy data.
- The **Students** page lets staff add, edit, and remove demo records, including attendance and marks.
- Student records and criteria are saved automatically in this browser's local storage. Refreshing the page keeps them on the same browser and local website address. This is local demo storage, not a shared college database.
- The AI page compares each student's current information with college criteria, explains any concern, suggests a next step, prepares a personalized message for staff to review, and downloads a CSV report.

## Easy workflow explanation

1. **Enter student information.** The demo uses branch, attendance average, current marks, and previous marks from the Students page.
2. **Check the college rules.** The default minimums are 75% attendance and 60% performance; staff can change these in **Criteria**.
3. **Find support signals.** The engine flags attendance below the minimum, performance below the minimum, or a fall of at least five points from the previous average.
4. **Explain the result.** It shows which figures caused the alert and calculates a relative support score to help staff decide who to review first. The score is not a probability or a diagnosis.
5. **Suggest a helpful action.** The page recommends a practical study or attendance step and prepares a message using the student's name and figures.
6. **Keep a person in control.** A faculty member reviews the suggestion and message. The demo does not send email automatically.
7. **Review the cohort.** Staff can download the analysis and recommendations as a CSV report.

## What is implemented today

The current version is a **front-end prototype with transparent, rules-based analysis**. It does not send student information to an external AI model. Its decision steps are implemented in `Frontend/src/ai/studentSuccessEngine.js`:

- Attendance gap contributes 45% of the relative score.
- Performance gap contributes 35%.
- A downward performance trend contributes 20%.
- Each factor is capped before the combined score is shown.
- A rules-based recommendation and message are selected from the student's actual demo values.

The attendance input is an aggregate value entered in the Students page. It is not yet connected to the daily attendance register. Demo information lives in browser local storage, so another computer or browser will not see the same edits.

## A short answer for faculty

> “Student Success AI is an early-warning and support prototype inside CampusCore360. It checks student attendance and assessment averages against college criteria, and compares current marks with previous marks. If it sees a low value or a decline, it explains why, suggests a supportive next step, and drafts a personalized message for a faculty member to review. Staff can also export the results. The current demo uses sample data and transparent rules in the browser; it is not making final decisions or sending messages automatically.”

## If faculty asks, “Is this using ChatGPT or a live AI model?”

> “Not in this prototype. The current analysis uses explainable rules so we can demonstrate the complete workflow without a backend. The structure is ready to connect to secure campus data and an AI service in a later phase. Any model-generated advice should remain a suggestion and require staff review.”

## Future implementation plan

1. **Secure backend and database:** add staff sign-in, roles, server APIs, and a database so authorized staff share accurate records across devices.
2. **Live academic data:** connect the attendance register and assessment system; validate missing, old, or inconsistent records.
3. **Reliable early-warning model:** use approved historical data to evaluate whether risk indicators help identify students who may need support. Measure accuracy and check for unfair outcomes across groups before relying on it.
4. **Optional language model:** call an approved AI service only from the backend to help phrase supportive messages. Keep the college's numeric rules as guardrails and avoid exposing secret keys or unnecessary student data.
5. **Reviewed notifications:** let faculty approve messages before sending them through a mail provider; record who approved and sent each message.
6. **Privacy and monitoring:** limit access by role, protect sensitive data, keep an audit trail, and review alert quality with faculty and students.

## Where to find the code

- `Frontend/src/ai/studentSuccessEngine.js` — demo roster, criteria, support scoring, message wording, and CSV export.
- `Frontend/src/Components/student-success/StudentSuccess.jsx` — analysis cards, criteria controls, message review, and report action.
- `Frontend/src/Components/student-success/student-success.css` — Student Success AI page styles.
- `Frontend/src/Components/students/students.jsx` — student create/edit/delete form and academic data inputs.
- `Frontend/src/App.jsx` — app home route and workspace navigation.
