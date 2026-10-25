export const studentSuccessKey = "campuscore360:students:v2";
export const studentSuccessSettingsKey = "campuscore360:student-success-settings:v2";

const legacyStudentKey = "campuscore360:students";
const legacySettingsKey = "campuscore360:student-success-settings";

export const sampleStudents = [
  { id: "STU001", name: "Mayank Shakya", email: "mayank.shakya@example.com", course: "MCA", year: "2nd Year", status: "Active", attendance: "96%", performance: 82, previousPerformance: 80 },
  { id: "STU002", name: "Ansh Chaurasia", email: "ansh.chaurasia@example.com", course: "B.Tech AI", year: "2nd Year", status: "Active", attendance: "94%", performance: 57, previousPerformance: 66 },
  { id: "STU003", name: "Ankit Singh", email: "ankit.singh@example.com", course: "B.Tech CS AI", year: "2nd Year", status: "Active", attendance: "93%", performance: 68, previousPerformance: 75 },
  { id: "STU004", name: "Alok Singh", email: "alok.singh@example.com", course: "CS IT", year: "2nd Year", status: "Active", attendance: "95%", performance: 74, previousPerformance: 72 },
  { id: "STU005", name: "Aman Mishra", email: "aman.mishra@example.com", course: "CS IT", year: "2nd Year", status: "Active", attendance: "96%", performance: 59, previousPerformance: 64 },
  { id: "STU006", name: "Tanishq Singh", email: "tanishq.singh@example.com", course: "CS IT", year: "2nd Year", status: "Active", attendance: "94%", performance: 80, previousPerformance: 80 },
];

export function readStudentRecords() {
  try {
    const saved = window.localStorage.getItem(studentSuccessKey);
    if (saved !== null) return normalizeStudents(JSON.parse(saved));

    const legacy = window.sessionStorage.getItem(legacyStudentKey);
    const legacyRecords = legacy ? JSON.parse(legacy) : null;
    const initialRecords = Array.isArray(legacyRecords) ? migrateLegacyStudents(legacyRecords) : sampleStudents;
    window.localStorage.setItem(studentSuccessKey, JSON.stringify(initialRecords));
    return normalizeStudents(initialRecords);
  } catch {
    return normalizeStudents(sampleStudents);
  }
}

export function readStudentSuccessSettings() {
  const defaults = { attendanceMinimum: 75, performanceMinimum: 60 };
  try {
    const saved = JSON.parse(window.localStorage.getItem(studentSuccessSettingsKey) || window.sessionStorage.getItem(legacySettingsKey) || "{}");
    return {
      attendanceMinimum: clampThreshold(saved.attendanceMinimum, defaults.attendanceMinimum),
      performanceMinimum: clampThreshold(saved.performanceMinimum, defaults.performanceMinimum),
    };
  } catch {
    return defaults;
  }
}

function normalizeStudents(records) {
  return (Array.isArray(records) ? records : sampleStudents).map((student) => ({
    ...student,
    attendance: Number.parseFloat(student.attendance) || 0,
    performance: Number(student.performance ?? 70),
    previousPerformance: Number(student.previousPerformance ?? student.performance ?? 70),
  }));
}

function migrateLegacyStudents(records) {
  // Replace the four original sample rows with the requested roster, while retaining
  // any students that were added by the user before persistent storage was introduced.
  const customRecords = records.filter((student) => !["STU001", "STU002", "STU003", "STU004"].includes(student.id));
  const usedIds = new Set(customRecords.map((student) => student.id));
  const migratedSamples = sampleStudents.map((student) => {
    if (!usedIds.has(student.id)) {
      usedIds.add(student.id);
      return student;
    }
    let nextId = 1;
    while (usedIds.has(`STU${String(nextId).padStart(3, "0")}`)) nextId += 1;
    const migrated = { ...student, id: `STU${String(nextId).padStart(3, "0")}` };
    usedIds.add(migrated.id);
    return migrated;
  });
  return [...migratedSamples, ...customRecords];
}

function clampThreshold(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(100, Math.max(0, number)) : fallback;
}

export function analyzeStudent(student, thresholds) {
  const attendance = Number(student.attendance) || 0;
  const performance = Number(student.performance) || 0;
  const previousPerformance = Number(student.previousPerformance ?? performance);
  const performanceChange = performance - previousPerformance;
  const attendanceLow = attendance < thresholds.attendanceMinimum;
  const performanceLow = performance < thresholds.performanceMinimum;
  const performanceDeclining = performanceChange <= -5;
  const concerns = [];

  if (attendanceLow) concerns.push("attendance");
  if (performanceLow) concerns.push("performance");
  if (performanceDeclining && !performanceLow) concerns.push("declining performance");

  const riskFactors = {
    attendance: Math.min(100, Math.max(0, thresholds.attendanceMinimum - attendance) * 5),
    performance: Math.min(100, Math.max(0, thresholds.performanceMinimum - performance) * 5),
    trend: Math.min(100, Math.max(0, -performanceChange) * 10),
  };
  const riskScore = Math.round(riskFactors.attendance * 0.45 + riskFactors.performance * 0.35 + riskFactors.trend * 0.2);

  let recommendation = "Keep up the steady effort. Review your progress with your faculty mentor at the next check-in.";
  if (attendanceLow && performanceLow) {
    recommendation = `Start with a simple reset: attend each scheduled class this week and set aside three 30-minute study blocks for your current ${student.course || "course"} subjects. Ask your faculty mentor to help choose the first topic.`;
  } else if (attendanceLow) {
    recommendation = `Your results are holding up, and regular class time can help keep them there. Attend your next classes consistently and speak with your mentor about any timetable or commute barriers.`;
  } else if (performanceLow || performanceDeclining) {
    recommendation = `Choose one subject that feels difficult, study it in three focused 30-minute blocks this week, and bring one question to faculty office hours. Check your next assessment against this average.`;
  }

  const severity = concerns.length > 1 || riskScore >= 40
    ? "high"
    : concerns.length > 0
      ? "watch"
      : "good";

  return {
    ...student,
    attendance,
    performance,
    previousPerformance,
    performanceChange,
    riskFactors,
    riskScore,
    concerns,
    recommendation,
    severity,
    needsSupport: concerns.length > 0,
  };
}

export function createPersonalizedMessage(student, thresholds) {
  const name = student.name?.trim().split(/\s+/)[0] || "there";
  const lines = [`Hi ${name},`, "", "We’re checking in because we want to support your progress this term."];

  if (student.attendance < thresholds.attendanceMinimum) {
    lines.push(`Your recorded attendance is ${student.attendance}%, below the college guideline of ${thresholds.attendanceMinimum}%.`);
  }
  if (student.performance < thresholds.performanceMinimum) {
    lines.push(`Your current average is ${student.performance}%, below the support benchmark of ${thresholds.performanceMinimum}%.`);
  } else if (student.performanceChange <= -5) {
    lines.push(`Your average has moved from ${student.previousPerformance}% to ${student.performance}%, so we’d like to help you address the change early.`);
  }

  lines.push("", student.recommendation, "", "Please reply or speak with your faculty mentor if you would like help making a plan.", "", "Your CampusCore360 Student Support Team");
  return lines.join("\n");
}

export function downloadStudentSuccessReport(analyses, thresholds) {
  const rows = [
    ["Student ID", "Student", "Email", "Course", "Attendance %", "Attendance minimum %", "Current average %", "Previous average %", "Change", "Relative support score / 100", "Risk tier", "Concerns", "Personalized next step"],
    ...analyses.map((student) => [
      student.id,
      student.name,
      student.email,
      student.course,
      student.attendance,
      thresholds.attendanceMinimum,
      student.performance,
      student.previousPerformance,
      student.performanceChange,
      student.riskScore,
      student.severity,
      student.concerns.join("; ") || "On track",
      student.recommendation,
    ]),
  ];
  const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "campuscore360-student-support-report.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}
