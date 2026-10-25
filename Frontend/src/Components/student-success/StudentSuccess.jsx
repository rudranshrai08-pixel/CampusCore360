import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ArrowDownRight, ArrowRight, CheckCircle2, CircleHelp, Download, Mail, Search, Settings2, ShieldCheck, Sparkles, TrendingDown, TrendingUp, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Workspace } from "../modules/ModulePage.jsx";
import {
  analyzeStudent,
  createPersonalizedMessage,
  downloadStudentSuccessReport,
  readStudentRecords,
  readStudentSuccessSettings,
  studentSuccessSettingsKey,
} from "../../ai/studentSuccessEngine.js";
import "./student-success.css";

const filters = ["All students", "Needs support", "Attendance", "Performance"];

function StudentSuccess() {
  const [students] = useState(readStudentRecords);
  const [thresholds, setThresholds] = useState(readStudentSuccessSettings);
  const [filter, setFilter] = useState("All students");
  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const studentSectionRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(studentSuccessSettingsKey, JSON.stringify(thresholds));
    } catch {
      // The insight screen remains usable when browser storage is disabled.
    }
  }, [thresholds]);

  const analyses = useMemo(() => students.map((student) => analyzeStudent(student, thresholds)), [students, thresholds]);
  const supportStudents = analyses.filter((student) => student.needsSupport);
  const attendanceAlerts = analyses.filter((student) => student.concerns.includes("attendance"));
  const performanceAlerts = analyses.filter((student) => student.concerns.includes("performance") || student.concerns.includes("declining performance"));
  const averageAttendance = analyses.length ? Math.round(analyses.reduce((sum, student) => sum + student.attendance, 0) / analyses.length) : 0;
  const averagePerformance = analyses.length ? Math.round(analyses.reduce((sum, student) => sum + student.performance, 0) / analyses.length) : 0;

  const visibleStudents = analyses
    .filter((student) => {
      const text = `${student.name} ${student.id} ${student.course} ${student.year}`.toLowerCase();
      const matchesSearch = text.includes(search.trim().toLowerCase());
      const matchesFilter = filter === "All students"
        || (filter === "Needs support" && student.needsSupport)
        || (filter === "Attendance" && student.concerns.includes("attendance"))
        || (filter === "Performance" && (student.concerns.includes("performance") || student.concerns.includes("declining performance")));
      return matchesSearch && matchesFilter;
    })
    .sort((first, second) => Number(second.needsSupport) - Number(first.needsSupport) || first.attendance - second.attendance);

  const updateThreshold = (field, value) => {
    const number = Number(value);
    if (Number.isFinite(number)) setThresholds((current) => ({ ...current, [field]: Math.min(100, Math.max(0, number)) }));
  };

  return (
    <Workspace>
      <div className="success-page">
        <div className="success-heading">
          <div>
            <span className="success-eyebrow"><Sparkles size={14} /> PERSONALIZED STUDENT SUPPORT</span>
            <h1>Student Success AI</h1>
            <p>Spot early signals, understand what each student needs, and prepare a supportive next step.</p>
          </div>
          <div className="success-heading-actions">
            <button className={`success-settings-button ${showMethod ? "active" : ""}`} onClick={() => setShowMethod((value) => !value)} aria-expanded={showMethod}>
              <CircleHelp size={16} /> How it works
            </button>
            <button className={`success-settings-button ${showSettings ? "active" : ""}`} onClick={() => setShowSettings((value) => !value)} aria-expanded={showSettings}>
              <Settings2 size={16} /> Criteria
            </button>
            <button className="success-report-button" onClick={() => downloadStudentSuccessReport(analyses, thresholds)}>
              <Download size={16} /> Download report
            </button>
          </div>
        </div>

        <div className="success-transparency"><ShieldCheck size={15} /><span><strong>Student support insights</strong> · Insights use attendance and assessment averages against your college criteria. Review each suggestion before contacting a student.</span></div>

        <AnimatePresence>
          {showMethod && <motion.section className="success-method-panel" initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }}>
            <div className="success-method-heading"><span className="success-method-icon"><Activity size={17} /></span><div><span className="success-section-kicker">HOW INSIGHTS ARE CREATED</span><h2>How a student insight is created</h2><p>Attendance, performance and progress are compared with college criteria in the browser.</p></div></div>
            <div className="success-method-steps">
              <article><span>01</span><strong>Read the signals</strong><p>Compare attendance and average marks with the college criteria; compare this average with the previous one.</p></article>
              <article><span>02</span><strong>Score the concern</strong><p>Combine the threshold gaps and a falling trend into a relative support score. It is not a probability or diagnosis.</p></article>
              <article><span>03</span><strong>Suggest a next step</strong><p>Choose supportive guidance and create a message preview using the student’s name and actual recorded figures.</p></article>
            </div>
            <div className="success-method-footnote"><strong>Scoring weights:</strong> attendance gap 45% · performance gap 35% · performance trend 20%. Suggestions are rules-based and should be reviewed by staff.</div>
          </motion.section>}
        </AnimatePresence>

        <AnimatePresence>
          {showSettings && <motion.section className="success-criteria-panel" initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }}>
            <div><span className="success-section-kicker">COLLEGE CRITERIA</span><h2>Set support thresholds</h2><p>A student is flagged when their result falls below either minimum.</p></div>
            <label>Minimum attendance <span><input type="number" min="0" max="100" value={thresholds.attendanceMinimum} onChange={(event) => updateThreshold("attendanceMinimum", event.target.value)} />%</span></label>
            <label>Minimum performance average <span><input type="number" min="0" max="100" value={thresholds.performanceMinimum} onChange={(event) => updateThreshold("performanceMinimum", event.target.value)} />%</span></label>
            <button className="success-criteria-close" onClick={() => setShowSettings(false)} aria-label="Close criteria"><X size={17} /></button>
          </motion.section>}
        </AnimatePresence>

        <div className="success-metrics">
          <article className="success-metric-card"><span className="success-metric-icon blue"><Users size={18} /></span><span className="success-metric-label">Students reviewed</span><strong>{analyses.length}</strong><small>Current student records</small></article>
          <article className={`success-metric-card ${supportStudents.length ? "attention" : ""}`}><span className="success-metric-icon amber"><ArrowDownRight size={18} /></span><span className="success-metric-label">Need a check-in</span><strong>{supportStudents.length}</strong><small>{attendanceAlerts.length} attendance · {performanceAlerts.length} performance</small></article>
          <article className="success-metric-card"><span className="success-metric-icon green"><CheckCircle2 size={18} /></span><span className="success-metric-label">Average attendance</span><strong>{averageAttendance}%</strong><small>College minimum {thresholds.attendanceMinimum}%</small></article>
          <article className="success-metric-card"><span className="success-metric-icon violet"><TrendingUp size={18} /></span><span className="success-metric-label">Average performance</span><strong>{averagePerformance}%</strong><small>Support benchmark {thresholds.performanceMinimum}%</small></article>
        </div>

        <section className="success-insight-banner">
          <div className="success-insight-mark"><Sparkles size={20} /></div>
          <div className="success-insight-copy">
            <span className="success-section-kicker">STUDENT SUPPORT SUMMARY</span>
            <h2>{supportStudents.length ? `${supportStudents.length} student${supportStudents.length === 1 ? "" : "s"} could use a timely check-in` : "No students are below the current criteria"}</h2>
            <p>{supportStudents.length ? "Start with students who have both attendance and performance concerns. Each profile includes a tailored message and a practical study suggestion." : "Keep reviewing attendance and performance as new records are added."}</p>
          </div>
          {supportStudents.length > 0 && <button onClick={() => { setFilter("Needs support"); setSearch(""); studentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Review students <ArrowRight size={15} /></button>}
        </section>

        <section className="success-student-section" ref={studentSectionRef}>
          <div className="success-list-heading">
            <div><span className="success-section-kicker">INDIVIDUAL FOLLOW-UP</span><h2>Student analysis</h2><p>Each recommendation is based on the student’s recorded progress.</p></div>
            <label className="success-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student or branch" aria-label="Search students or branches" /></label>
          </div>
          <div className="success-filter-row" role="group" aria-label="Filter student support list">
            {filters.map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}{item === "Needs support" && <span>{supportStudents.length}</span>}</button>)}
          </div>
          <div className="success-student-list">
            {visibleStudents.map((student, index) => <motion.article className={`success-student-card ${student.needsSupport ? "needs-support" : "on-track"}`} key={student.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * .04, .24) }}>
              <div className="success-student-top">
                <div className="success-student-identity"><span className={`success-avatar avatar-${index % 5}`}>{student.name.split(" ").map((word) => word[0]).slice(0, 2).join("")}</span><div><h3>{student.name}</h3><p>{student.id} <i /> {student.course} · {student.year}</p></div></div>
                <span className={`success-risk risk-${student.severity}`}>{student.needsSupport ? (student.severity === "high" ? "Priority check-in" : "Support suggested") : "On track"}<i>{student.riskScore}/100</i></span>
              </div>
              <div className="success-progress-grid">
                <ProgressMetric label="Attendance" value={student.attendance} threshold={thresholds.attendanceMinimum} suffix="%" />
                <ProgressMetric label="Performance average" value={student.performance} threshold={thresholds.performanceMinimum} suffix="%" />
                <div className={`success-trend ${student.performanceChange < 0 ? "declining" : "improving"}`}><span>Compared with previous average</span><strong>{student.performanceChange > 0 ? "+" : ""}{student.performanceChange} pts {student.performanceChange < 0 ? <TrendingDown size={15} /> : <TrendingUp size={15} />}</strong></div>
              </div>
              <div className="success-risk-explanation"><span>Relative support score</span><div><i style={{ width: `${student.riskScore}%` }} /></div><small>Attendance {student.riskFactors.attendance} · Performance {student.riskFactors.performance} · Trend {student.riskFactors.trend}</small></div>
              <div className="success-recommendation"><span className="success-recommendation-icon"><Sparkles size={16} /></span><div><strong>{student.needsSupport ? "Suggested next step" : "Keep the momentum"}</strong><p>{student.recommendation}</p></div></div>
              <div className="success-card-footer"><span className="success-concerns">{student.concerns.length ? student.concerns.map((concern) => <i key={concern}>{concern}</i>) : <i className="good-concern">No current concern</i>}</span><button className="success-message-button" onClick={() => setSelectedStudent(student)}><Mail size={15} /> Prepare message</button></div>
            </motion.article>)}
            {visibleStudents.length === 0 && <div className="success-empty"><span><Search size={19} /></span><strong>No students match this view</strong><p>Try another filter or search term.</p></div>}
          </div>
        </section>
      </div>

      <AnimatePresence>{selectedStudent && <MessageDialog student={selectedStudent} thresholds={thresholds} onClose={() => setSelectedStudent(null)} />}</AnimatePresence>
    </Workspace>
  );
}

function ProgressMetric({ label, value, threshold, suffix }) {
  const below = value < threshold;
  return <div className={`success-progress ${below ? "below" : ""}`}><div className="success-progress-label"><span>{label}</span><strong>{value}{suffix}</strong></div><div className="success-progress-track"><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div><small>{below ? `Below ${threshold}${suffix} college minimum` : `Meets ${threshold}${suffix} college minimum`}</small></div>;
}

function MessageDialog({ student, thresholds, onClose }) {
  const message = createPersonalizedMessage(student, thresholds);
  const subject = `A personal check-in from CampusCore360`;
  const emailUrl = `mailto:${encodeURIComponent(student.email || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  return <motion.div className="success-dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <motion.section className="success-message-dialog" role="dialog" aria-modal="true" aria-labelledby="success-message-title" initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
      <button className="success-dialog-close" aria-label="Close message preview" onClick={onClose}><X size={18} /></button>
      <span className="success-dialog-icon"><Mail size={19} /></span><span className="success-section-kicker">PERSONALIZED MESSAGE PREVIEW</span>
      <h2 id="success-message-title">Check in with {student.name.split(" ")[0]}</h2>
      <p className="success-dialog-recipient">To: {student.email}</p>
      <pre>{message}</pre>
      <div className="success-dialog-note">Review the message before sending. This opens your email app; CampusCore360 does not send or store email.</div>
      <div className="success-dialog-actions"><button className="success-settings-button" onClick={onClose}>Close</button><a className="success-report-button" href={emailUrl}><Mail size={15} /> Open email draft</a></div>
    </motion.section>
  </motion.div>;
}

export default StudentSuccess;
