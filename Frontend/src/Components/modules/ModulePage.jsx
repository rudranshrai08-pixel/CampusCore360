import { useEffect, useMemo, useState } from "react";
import {
  Activity, Bell, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight,
  ClipboardCheck, Download, Eye, FileBarChart2, GraduationCap,
  LayoutDashboard, LogOut, Menu, Plus, Search, Settings, SlidersHorizontal,
  Sparkles, Users, X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { analyzeStudent, readStudentRecords, readStudentSuccessSettings } from "../../ai/studentSuccessEngine.js";
import "./modules.css";

const navigation = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Students", "/students", GraduationCap],
  ["Faculty", "/faculty", Users],
  ["Academics", "/academics", GraduationCap],
  ["Attendance", "/attendance", ClipboardCheck],
  ["Courses", "/courses", Activity],
  ["Examinations", "/examinations", CalendarDays],
  ["Reports", "/reports", FileBarChart2],
  ["Student Success AI", "/student-success", Sparkles],
];

const demoModules = {
  Faculty: {
    description: "Manage faculty profiles, departments and teaching assignments.",
    entity: "faculty member",
    fields: ["Name", "Email", "Department", "Designation", "Courses", "Status"],
    columns: ["Faculty member", "Department", "Designation", "Courses", "Email", "Status"],
    stats: [["Faculty members", "186", "+4.5%", "vs last term"], ["Departments", "12", "Across campus", "Academic units"], ["Teaching", "142", "76%", "of all faculty"], ["On leave", "08", "This week", "Planned absence"]],
    records: [
      { Name: "Dr. Ananya Mehta", Email: "ananya.mehta@campuscore.edu", Department: "Computer Science", Designation: "Associate Professor", Courses: "04", Status: "Active" },
      { Name: "Prof. Rohan Iyer", Email: "rohan.iyer@campuscore.edu", Department: "Business Studies", Designation: "Professor", Courses: "03", Status: "Active" },
      { Name: "Dr. Sana Kapoor", Email: "sana.kapoor@campuscore.edu", Department: "Life Sciences", Designation: "Assistant Professor", Courses: "02", Status: "On leave" },
      { Name: "Prof. Arjun Rao", Email: "arjun.rao@campuscore.edu", Department: "Engineering", Designation: "Professor", Courses: "05", Status: "Active" },
      { Name: "Dr. Meera Nair", Email: "meera.nair@campuscore.edu", Department: "Mathematics", Designation: "Lecturer", Courses: "03", Status: "Active" },
      { Name: "Prof. Kabir Sen", Email: "kabir.sen@campuscore.edu", Department: "Humanities", Designation: "Associate Professor", Courses: "02", Status: "Active" },
    ],
  },
  Academics: {
    description: "Explore programs, departments and the current academic session.",
    entity: "academic program",
    fields: ["Program", "Department", "Degree", "Duration", "Students", "Status"],
    columns: ["Program", "Department", "Degree", "Duration", "Students", "Status"],
    stats: [["Departments", "12", "4 schools", "Academic units"], ["Programs", "38", "+3 this year", "Across campus"], ["Current session", "2025–26", "Semester 2", "In progress"], ["Subjects", "246", "Across 38 programs", "Curriculum"]],
    records: [
      { Program: "Computer Applications", Department: "Computer Science", Degree: "MCA", Duration: "2 years", Students: "248", Status: "Active" },
      { Program: "Business Administration", Department: "Business Studies", Degree: "MBA", Duration: "2 years", Students: "186", Status: "Active" },
      { Program: "Data Science", Department: "Computer Science", Degree: "B.Sc.", Duration: "3 years", Students: "124", Status: "Review" },
      { Program: "Mechanical Engineering", Department: "Engineering", Degree: "B.Tech", Duration: "4 years", Students: "312", Status: "Active" },
      { Program: "Biotechnology", Department: "Life Sciences", Degree: "B.Sc.", Duration: "3 years", Students: "96", Status: "Active" },
      { Program: "Applied Mathematics", Department: "Mathematics", Degree: "M.Sc.", Duration: "2 years", Students: "72", Status: "Active" },
    ],
  },
  Attendance: {
    description: "Review today's attendance and follow up on class participation.",
    entity: "attendance record",
    fields: ["Student", "Student ID", "Course", "Date", "Status"],
    columns: ["Student", "Student ID", "Course", "Date", "Status"],
    stats: [["Attendance rate", "92.6%", "+2.4%", "vs last week"], ["Present", "2,268", "Today", "Across all classes"], ["Absent", "182", "Today", "Follow-up needed"], ["Late / leave", "46", "Today", "Combined total"]],
    records: [
      { Student: "Aarav Sharma", "Student ID": "STU001", Course: "MCA · Data Structures", Date: "Today, 9:00 AM", Status: "Present" },
      { Student: "Diya Patel", "Student ID": "STU024", Course: "BCA · Web Development", Date: "Today, 9:00 AM", Status: "Late" },
      { Student: "Kabir Verma", "Student ID": "STU106", Course: "B.Tech · Mathematics", Date: "Today, 10:30 AM", Status: "Absent" },
      { Student: "Sara Khan", "Student ID": "STU138", Course: "MCA · Data Structures", Date: "Today, 10:30 AM", Status: "Present" },
      { Student: "Ishaan Gupta", "Student ID": "STU214", Course: "BCA · Web Development", Date: "Today, 11:30 AM", Status: "Leave" },
      { Student: "Maya Rao", "Student ID": "STU302", Course: "B.Tech · Mathematics", Date: "Today, 11:30 AM", Status: "Present" },
    ],
  },
  Courses: {
    description: "Browse active courses and manage faculty, credits and enrollment.",
    entity: "course",
    fields: ["Course name", "Course code", "Faculty", "Department", "Semester", "Credits", "Students", "Status"],
    columns: ["Course", "Course code", "Faculty", "Department", "Semester", "Credits", "Students", "Status"],
    stats: [["Active courses", "64", "+12%", "vs last term"], ["Enrolled students", "2,450", "Across campus", "Current session"], ["Departments", "12", "38 programs", "Offering courses"], ["Need assignment", "03", "Review needed", "Faculty allocation"]],
    records: [
      { "Course name": "Data Structures & Algorithms", "Course code": "CS201", Faculty: "Dr. Ananya Mehta", Department: "Computer Science", Semester: "Semester 2", Credits: "4", Students: "124", Status: "Active" },
      { "Course name": "Financial Accounting", "Course code": "BM104", Faculty: "Prof. Rohan Iyer", Department: "Business Studies", Semester: "Semester 1", Credits: "3", Students: "86", Status: "Active" },
      { "Course name": "Applied Mathematics", "Course code": "MT202", Faculty: "Dr. Meera Nair", Department: "Mathematics", Semester: "Semester 2", Credits: "4", Students: "112", Status: "Active" },
      { "Course name": "Human Computer Interaction", "Course code": "CS310", Faculty: "Prof. Kabir Sen", Department: "Computer Science", Semester: "Semester 4", Credits: "3", Students: "74", Status: "Review" },
      { "Course name": "Engineering Physics", "Course code": "PH101", Faculty: "Prof. Arjun Rao", Department: "Engineering", Semester: "Semester 1", Credits: "4", Students: "96", Status: "Active" },
      { "Course name": "Genetics & Genomics", "Course code": "LS215", Faculty: "Dr. Sana Kapoor", Department: "Life Sciences", Semester: "Semester 3", Credits: "3", Students: "62", Status: "Active" },
    ],
  },
  Examinations: {
    description: "Coordinate upcoming assessments, schedules and examination rooms.",
    entity: "examination",
    fields: ["Exam", "Course", "Date", "Time", "Room", "Faculty", "Status"],
    columns: ["Examination", "Course", "Date", "Time", "Room", "Faculty", "Status"],
    stats: [["Upcoming exams", "08", "Next 14 days", "Scheduled"], ["Students", "1,284", "Across 8 exams", "Registered"], ["Exam rooms", "24", "Reserved", "Campus-wide"], ["Needs review", "02", "Room allocation", "Action needed"]],
    records: [
      { Exam: "Mid-term assessment", Course: "Data Structures · CS201", Date: "Oct 08, 2026", Time: "9:00 AM", Room: "Hall A · 120 seats", Faculty: "Dr. Ananya Mehta", Status: "Scheduled" },
      { Exam: "Unit test 2", Course: "Financial Accounting · BM104", Date: "Oct 10, 2026", Time: "11:00 AM", Room: "Room 204 · 60 seats", Faculty: "Prof. Rohan Iyer", Status: "Scheduled" },
      { Exam: "Practical examination", Course: "Web Development · CS310", Date: "Oct 12, 2026", Time: "2:00 PM", Room: "Lab 3 · 40 seats", Faculty: "Prof. Kabir Sen", Status: "Review" },
      { Exam: "Mid-term assessment", Course: "Applied Mathematics · MT202", Date: "Oct 14, 2026", Time: "9:00 AM", Room: "Hall B · 100 seats", Faculty: "Dr. Meera Nair", Status: "Scheduled" },
      { Exam: "Lab practical", Course: "Engineering Physics · PH101", Date: "Oct 16, 2026", Time: "10:30 AM", Room: "Physics Lab · 36 seats", Faculty: "Prof. Arjun Rao", Status: "Scheduled" },
    ],
  },
};

const reportCards = [
  { title: "Student overview", detail: "Enrollment, demographics and program distribution", color: "blue", icon: Users },
  { title: "Attendance summary", detail: "Daily presence, absences and class trends", color: "green", icon: ClipboardCheck },
  { title: "Faculty directory", detail: "Department, workload and teaching assignments", color: "violet", icon: GraduationCap },
  { title: "Course enrollment", detail: "Course capacity and student registrations", color: "amber", icon: Activity },
  { title: "Examination schedule", detail: "Upcoming assessments and room allocation", color: "cyan", icon: CalendarDays },
  { title: "Academic performance", detail: "Term results and program-level outcomes", color: "rose", icon: FileBarChart2 },
];

const academicCatalog = {
  Programs: {
    entity: "academic program",
    fields: ["Program", "Department", "Degree", "Duration", "Students", "Status"],
    columns: ["Program", "Department", "Degree", "Duration", "Students", "Status"],
    records: demoModules.Academics.records,
  },
  Departments: {
    entity: "department",
    fields: ["Department", "Head of department", "Faculty", "Programs", "Status"],
    columns: ["Department", "Head of department", "Faculty", "Programs", "Status"],
    records: [
      { Department: "Computer Science", "Head of department": "Dr. Ananya Mehta", Faculty: "24", Programs: "06", Status: "Active" },
      { Department: "Business Studies", "Head of department": "Prof. Rohan Iyer", Faculty: "18", Programs: "04", Status: "Active" },
      { Department: "Engineering", "Head of department": "Prof. Arjun Rao", Faculty: "32", Programs: "08", Status: "Active" },
      { Department: "Life Sciences", "Head of department": "Dr. Sana Kapoor", Faculty: "16", Programs: "05", Status: "Active" },
      { Department: "Mathematics", "Head of department": "Dr. Meera Nair", Faculty: "12", Programs: "03", Status: "Active" },
    ],
  },
  Sessions: {
    entity: "academic session",
    fields: ["Session", "Term", "Start date", "End date", "Status"],
    columns: ["Session", "Term", "Start date", "End date", "Status"],
    records: [
      { Session: "2025–26", Term: "Semester 2", "Start date": "Jan 12, 2026", "End date": "May 08, 2026", Status: "Active" },
      { Session: "2025–26", Term: "Semester 1", "Start date": "Aug 04, 2025", "End date": "Dec 12, 2025", Status: "Completed" },
      { Session: "2026–27", Term: "Semester 1", "Start date": "Aug 03, 2026", "End date": "Dec 11, 2026", Status: "Scheduled" },
    ],
  },
  Subjects: {
    entity: "subject",
    fields: ["Subject", "Subject code", "Department", "Semester", "Credits", "Status"],
    columns: ["Subject", "Subject code", "Department", "Semester", "Credits", "Status"],
    records: [
      { Subject: "Data Structures", "Subject code": "CS201", Department: "Computer Science", Semester: "Semester 2", Credits: "4", Status: "Active" },
      { Subject: "Database Systems", "Subject code": "CS204", Department: "Computer Science", Semester: "Semester 2", Credits: "3", Status: "Active" },
      { Subject: "Financial Accounting", "Subject code": "BM104", Department: "Business Studies", Semester: "Semester 1", Credits: "3", Status: "Active" },
      { Subject: "Applied Mathematics", "Subject code": "MT202", Department: "Mathematics", Semester: "Semester 2", Credits: "4", Status: "Active" },
    ],
  },
};

function readModuleRecords(title, fallback, view = "default") {
  try {
    const saved = window.sessionStorage.getItem(`campuscore360:${title}:${view}`);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function formatAttendanceDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function todayDateValue() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

function readAttendanceRecords(date) {
  const students = readStudentRecords();
  const savedRecords = readModuleRecords("Attendance", [], date);
  const savedByStudent = new Map(savedRecords.map((record) => [record["Student ID"], record]));
  const validStatuses = new Set(["Present", "Absent", "Late", "Leave"]);

  return students.map((student) => {
    const savedRecord = savedByStudent.get(student.id);
    const savedStatus = savedRecord?.Status;
    return {
      Student: student.name,
      "Student ID": student.id,
      Course: student.course,
      Date: formatAttendanceDate(date),
      Status: validStatuses.has(savedStatus) ? savedStatus : "Present",
    };
  });
}

function Workspace({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const studentAlerts = useMemo(() => {
    const criteria = readStudentSuccessSettings();
    return readStudentRecords().map((student) => analyzeStudent(student, criteria)).filter((student) => student.needsSupport);
  }, []);

  const navigateTo = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <div className="erp-dashboard workspace-shell">
      {drawerOpen && <button className="erp-overlay" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} />}
      <aside className={`erp-sidebar ${drawerOpen ? "sidebar-open" : ""} ${collapsed ? "sidebar-collapsed" : ""}`}>
        <div className="erp-brand">
          <div className="erp-brand-logo">C</div>
          <div><h2>CampusCore<span>360</span></h2><p>Campus ERP</p></div>
          <button className="sidebar-toggle" onClick={() => setCollapsed((value) => !value)} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button>
        </div>
        <div className="erp-menu-title">WORKSPACE</div>
        <nav className="erp-nav" aria-label="Main navigation">
          {navigation.map(([label, path, Icon]) => (
            <button key={path} className={`erp-nav-item ${location.pathname === path ? "active" : ""}`} onClick={() => navigateTo(path)} data-tooltip={label} aria-current={location.pathname === path ? "page" : undefined}>
              <span className="erp-nav-icon"><Icon size={18} strokeWidth={1.8} /></span><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="erp-sidebar-bottom">
          <button className={`erp-nav-item ${location.pathname === "/settings" ? "active" : ""}`} onClick={() => navigateTo("/settings")} data-tooltip="Settings"><span className="erp-nav-icon"><Settings size={18} /></span><span>Settings</span></button>
          <button className="erp-nav-item logout-item" onClick={() => navigateTo("/login")} data-tooltip="Sign out"><span className="erp-nav-icon"><LogOut size={18} /></span><span>Sign out</span></button>
        </div>
      </aside>
      <main className="erp-main">
        <header className="erp-topbar">
          <button className="erp-menu-toggle" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}><Menu size={21} /></button>
          <div className="workspace-search-wrap"><label className="erp-search workspace-search"><Search size={17} /><input aria-label="Search workspace pages" value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setGlobalSearch(""); if (event.key === "Enter" && globalSearch.trim()) { const first = navigation.find(([label]) => label.toLowerCase().includes(globalSearch.trim().toLowerCase())); if (first) navigateTo(first[1]); } }} placeholder="Search workspace pages…" /></label>{globalSearch.trim() && <div className="workspace-search-results">{navigation.filter(([label]) => label.toLowerCase().includes(globalSearch.trim().toLowerCase())).map(([label, path, Icon]) => <button key={path} onClick={() => { navigateTo(path); setGlobalSearch(""); }}><Icon size={15} />{label}<ChevronRight size={14} /></button>)}{!navigation.some(([label]) => label.toLowerCase().includes(globalSearch.trim().toLowerCase())) && <span>No matching pages</span>}</div>}</div>
          <div className="erp-topbar-right">
            <div className="workspace-popover-wrap">
              <button className="erp-icon-btn" title="Notifications" aria-label="Notifications" aria-expanded={noticeOpen} onClick={() => { setNoticeOpen((value) => !value); setProfileOpen(false); }}><Bell size={18} />{studentAlerts.length > 0 && <span className="notification-dot" />}</button>
              {noticeOpen && <div className="workspace-popover workspace-alert-popover"><strong>{studentAlerts.length ? `${studentAlerts.length} student check-in${studentAlerts.length === 1 ? "" : "s"} suggested` : "You're all caught up"}</strong><span>{studentAlerts.length ? "Based on current attendance and performance criteria." : "No students are below the current support criteria."}</span>{studentAlerts.slice(0, 3).map((student) => <button key={student.id} onClick={() => navigateTo("/student-success")}><span className={`workspace-alert-dot alert-${student.severity}`} /><span><strong>{student.name}</strong><small>{student.concerns.join(" + ")}</small></span><ChevronRight size={14} /></button>)}<button className="workspace-alert-link" onClick={() => navigateTo("/student-success")}>Open Student Success AI<ChevronRight size={14} /></button></div>}
            </div>
            <div className="workspace-popover-wrap">
              <button className="erp-profile workspace-profile" aria-expanded={profileOpen} onClick={() => { setProfileOpen((value) => !value); setNoticeOpen(false); }}><div className="erp-avatar">A</div><div className="erp-profile-info"><strong>Admin</strong><span>Administrator</span></div><ChevronDown size={15} className="profile-arrow" /></button>
              {profileOpen && <div className="workspace-popover workspace-profile-menu"><strong>Admin</strong><span>admin@campuscore.edu</span><button onClick={() => navigateTo("/settings")}><Settings size={15} /> Account settings</button><button onClick={() => navigateTo("/login")}><LogOut size={15} /> Sign out</button></div>}
            </div>
          </div>
        </header>
        <section className="erp-content workspace-content">{children}<footer className="erp-footer"><span>© 2026 CampusCore360</span><span>Campus operations, in sync.</span></footer></section>
      </main>
    </div>
  );
}

function PageHeading({ title, description, eyebrow = "CAMPUS MANAGEMENT", action }) {
  return (
    <div className="module-page-heading">
      <div className="module-breadcrumb"><span>Workspace</span><ChevronRight size={13} /><strong>{title}</strong></div>
      <div className="module-heading-row"><div><span className="module-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>
    </div>
  );
}

function StatusBadge({ children }) {
  const normalized = String(children || "Active").toLowerCase().replaceAll(" ", "-");
  return <span className={`module-status status-${normalized}`}><i />{children || "Active"}</span>;
}

function ModulePage({ title, description }) {
  const config = demoModules[title];
  const isAttendance = title === "Attendance";
  const [attendanceDate, setAttendanceDate] = useState(todayDateValue);
  const [records, setRecords] = useState(() => isAttendance
    ? readAttendanceRecords(attendanceDate)
    : readModuleRecords(title, config?.records || [], title === "Academics" ? "Programs" : "default"));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All records");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(null);
  const [form, setForm] = useState({});
  const [toast, setToast] = useState("");
  const [settingsTab, setSettingsTab] = useState("Profile");
  const [academicTab, setAcademicTab] = useState("Programs");
  const [activeFilter, setActiveFilter] = useState("All");
  const pageSize = 6;
  const isReports = title === "Reports";
  const isSettings = title === "Settings";
  const moduleConfig = title === "Academics" ? { ...config, ...academicCatalog[academicTab] } : config || { description, entity: "record", fields: [], columns: [], stats: [], records: [] };

  useEffect(() => {
    try {
      const view = isAttendance ? attendanceDate : title === "Academics" ? academicTab : "default";
      window.sessionStorage.setItem(`campuscore360:${title}:${view}`, JSON.stringify(records));
    } catch {
      // Keep the current screen usable when browser storage is unavailable.
    }
  }, [academicTab, attendanceDate, isAttendance, records, title]);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2600);
  };

  const filteredRecords = useMemo(() => records.filter((record) => {
    const matchesSearch = Object.values(record).join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "All records" || String(record.Status || "Active").toLowerCase() === filter.toLowerCase();
    const matchesAttendance = activeFilter === "All" || String(record.Status).toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesAttendance;
  }), [records, search, filter, activeFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const visibleRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);
  const columnValue = (record, column) => record[column] ?? ({ "Faculty member": record.Name, Examination: record.Exam, Course: record["Course name"] }[column] ?? "");
  const recordLabel = (record) => columnValue(record, moduleConfig.columns[0]) || "Record";

  const openCreate = () => {
    setForm(Object.fromEntries(moduleConfig.fields.map((field) => [field, field === "Status" ? "Active" : ""])));
    setDialog({ mode: "create" });
  };

  const openEdit = (record) => {
    setForm({ ...record });
    setDialog({ mode: "edit", record });
  };

  const saveRecord = (event) => {
    event.preventDefault();
    if (!String(Object.values(form)[0] || "").trim()) return;
    if (dialog.mode === "edit") {
      setRecords((current) => current.map((record) => record === dialog.record ? form : record));
      showToast(`${moduleConfig.entity} updated`);
    } else {
      setRecords((current) => [{ ...form, Status: form.Status || "Active" }, ...current]);
      setPage(1);
      showToast(`${moduleConfig.entity} added`);
    }
    setDialog(null);
  };

  const deleteRecord = () => {
    setRecords((current) => current.filter((record) => record !== dialog.record));
    setDialog(null);
    showToast(`${moduleConfig.entity} removed`);
  };

  const setAttendance = (record, nextStatus) => {
    setRecords((current) => current.map((item) => item === record ? { ...item, Status: nextStatus } : item));
    showToast(`Attendance marked ${nextStatus.toLowerCase()}`);
  };

  const changeAttendanceDate = (date) => {
    setAttendanceDate(date);
    setRecords(readAttendanceRecords(date));
    setPage(1);
    setActiveFilter("All");
  };

  const headingAction = !isSettings && !isReports
    ? <button className="module-primary-btn" onClick={openCreate}><Plus size={17} />{isAttendance ? "Record attendance" : `Add ${moduleConfig.entity}`}</button>
    : null;

  return (
    <Workspace activePage={title}>
      <PageHeading title={title} description={description || moduleConfig.description} action={headingAction} eyebrow={isAttendance ? "TODAY'S REGISTER" : undefined} />

      {isSettings ? (
        <SettingsPanel activeTab={settingsTab} onTabChange={setSettingsTab} onSave={() => showToast("Your preferences have been saved")} />
      ) : isReports ? (
        <ReportsPanel onPreview={(report) => setDialog({ mode: "preview", report })} onGenerate={(report) => showToast(`${report} is ready to preview`)} />
      ) : <>
        {title === "Academics" && <div className="academic-tabs" role="tablist" aria-label="Academic records">{Object.keys(academicCatalog).map((tab) => <button key={tab} role="tab" aria-selected={academicTab === tab} className={academicTab === tab ? "selected" : ""} onClick={() => { setAcademicTab(tab); setRecords(readModuleRecords(title, academicCatalog[tab].records, tab)); setSearch(""); setFilter("All records"); setPage(1); }}>{tab}</button>)}</div>}
        <div className="module-stats-grid">
          {moduleConfig.stats.map(([label, value, delta, caption], index) => <motion.article className="module-stat-card" key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><span className={`module-stat-icon tone-${index % 4}`}>{[<Users size={19} />, <Activity size={19} />, <CalendarDays size={19} />, <ClipboardCheck size={19} />][index]}</span><span className="module-stat-delta">{delta}</span><strong>{value}</strong><span className="module-stat-label">{label}</span><small>{caption}</small></motion.article>)}
        </div>

        {isAttendance && <AttendanceSummary date={attendanceDate} onDateChange={changeAttendanceDate} />}

        <section className="module-table-card">
          <div className="module-table-heading"><div><h2>{isAttendance ? "Class register" : `${title} directory`}</h2><p>{filteredRecords.length} records</p></div><button className="module-export-btn" onClick={() => showToast("Export is not available yet")}><Download size={15} />Export</button></div>
          <div className="module-toolbar">
            <label className="module-search"><Search size={17} /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={`Search ${title.toLowerCase()}…`} aria-label={`Search ${title}`} /></label>
            {isAttendance ? <div className="module-filter-pills" role="group" aria-label="Filter attendance">{["All", "Present", "Absent", "Late", "Leave"].map((status) => <button key={status} className={activeFilter === status ? "selected" : ""} onClick={() => { setActiveFilter(status); setPage(1); }}>{status}</button>)}</div> : <label className="module-select-wrap"><SlidersHorizontal size={15} /><select value={filter} onChange={(event) => { setFilter(event.target.value); setPage(1); }} aria-label="Filter by status"><option>All records</option><option>Active</option><option>Scheduled</option><option>Review</option><option>On leave</option></select><ChevronDown size={14} /></label>}
          </div>
          {isAttendance && <div className="attendance-date-row"><label><CalendarDays size={16} />Class date<input type="date" value={attendanceDate} onChange={(event) => changeAttendanceDate(event.target.value)} /></label><label>Course<select aria-label="Select course"><option>All courses</option><option>Data Structures · CS201</option><option>Web Development · CS310</option><option>Applied Mathematics · MT202</option></select></label><span className="attendance-date-note">Select a student row to update today's register.</span></div>}
          <div className="module-table-scroll"><table className="module-table"><thead><tr>{moduleConfig.columns.map((column) => <th key={column}>{column}</th>)}<th className="module-actions-col">Actions</th></tr></thead><tbody>
            {visibleRecords.map((record, index) => <tr key={`${record[moduleConfig.columns[0]]}-${index}`}>
              {moduleConfig.columns.map((column, cell) => <td key={column}>{cell === 0 ? <div className="module-person-cell"><span className={`module-row-avatar avatar-${index % 5}`}>{String(recordLabel(record)).split(" ").filter(Boolean).slice(-2).map((word) => word[0]).join("").slice(0, 2)}</span><div><strong>{columnValue(record, column)}</strong>{isAttendance && <small>{record["Student ID"]}</small>}</div></div> : column === "Status" ? <StatusBadge>{record[column]}</StatusBadge> : columnValue(record, column)}</td>)}
              <td><div className="module-row-actions">{isAttendance ? <select className="attendance-row-select" aria-label={`Mark ${record.Student}`} value={record.Status} onChange={(event) => setAttendance(record, event.target.value)}><option>Present</option><option>Absent</option><option>Late</option><option>Leave</option></select> : <><button title="View details" aria-label={`View ${recordLabel(record)}`} onClick={() => setDialog({ mode: "preview", report: recordLabel(record), record })}><Eye size={16} /></button><button title="Edit" aria-label={`Edit ${recordLabel(record)}`} onClick={() => openEdit(record)}><Settings size={15} /></button><button title="Delete" aria-label={`Delete ${recordLabel(record)}`} onClick={() => setDialog({ mode: "delete", record })}><X size={16} /></button></>}</div></td>
            </tr>)}
          </tbody></table></div>
          {visibleRecords.length === 0 && <div className="module-empty"><span><Search size={21} /></span><strong>No matching records</strong><p>Try adjusting your search or filter.</p><button onClick={() => { setSearch(""); setFilter("All records"); setActiveFilter("All"); }}>Clear filters</button></div>}
          <div className="module-table-footer"><span>Showing {filteredRecords.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredRecords.length)} of {filteredRecords.length}</span><div><button aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={16} /></button><span>Page {page} of {pageCount}</span><button aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronRight size={16} /></button></div></div>
        </section>
      </>}

      <AnimatePresence>{dialog && <ModuleDialog dialog={dialog} fields={moduleConfig.fields} form={form} onFormChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))} onClose={() => setDialog(null)} onSave={saveRecord} onDelete={deleteRecord} />}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="module-toast" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><span><Check size={15} /></span>{toast}</motion.div>}</AnimatePresence>
    </Workspace>
  );
}

function AttendanceSummary({ date, onDateChange }) {
  return <section className="attendance-summary"><div className="attendance-summary-copy"><span className="module-eyebrow">CAMPUS-WIDE SNAPSHOT</span><h2>Today's attendance</h2><p>Across all scheduled classes</p><label><CalendarDays size={15} /><input type="date" aria-label="Attendance summary date" value={date} onChange={(event) => onDateChange(event.target.value)} /></label></div><div className="attendance-donut"><div><strong>92.6%</strong><span>Present</span></div></div><div className="attendance-legend"><span><i className="legend-present" />Present <b>2,268</b></span><span><i className="legend-absent" />Absent <b>182</b></span><span><i className="legend-late" />Late <b>28</b></span><span><i className="legend-leave" />Leave <b>18</b></span></div></section>;
}

function ReportsPanel({ onPreview, onGenerate }) {
  return <div className="reports-grid">{reportCards.map(({ title, detail, color, icon: Icon }, index) => <motion.article className="report-card" key={title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}><span className={`report-icon report-${color}`}><Icon size={20} /></span><h2>{title}</h2><p>{detail}</p><div><button className="module-secondary-btn" onClick={() => onPreview(title)}><Eye size={15} />Preview</button><button className="module-primary-btn" onClick={() => onGenerate(title)}><FileBarChart2 size={15} />Generate</button></div></motion.article>)}</div>;
}

function SettingsPanel({ activeTab, onTabChange, onSave }) {
  const tabs = ["Profile", "Account", "Security", "Notifications", "Appearance", "System preferences"];
  const settingsFields = activeTab === "Profile" ? [["Full name", "Admin User"], ["Work email", "admin@campuscore.edu"], ["Role", "Campus administrator"], ["Institution", "CampusCore University"]] : activeTab === "Notifications" ? [["Email digests", "Weekly summary"], ["Attendance alerts", "Daily"], ["Examination reminders", "7 days before"], ["System notices", "Enabled"]] : activeTab === "Appearance" ? [["Theme", "Light"], ["Accent color", "Campus blue"], ["Density", "Comfortable"]] : [["Workspace setting", activeTab], ["Campus timezone", "Asia/Kolkata"], ["Academic session", "2025–26"], ["Date format", "DD MMM YYYY"]];
  const savedValue = (label, fallback) => {
    try { return window.sessionStorage.getItem(`campuscore360:settings:${activeTab}:${label}`) ?? fallback; }
    catch { return fallback; }
  };
  const saveValue = (label, value) => {
    try { window.sessionStorage.setItem(`campuscore360:settings:${activeTab}:${label}`, value); }
    catch { /* Keep the editable control usable without browser storage. */ }
  };
  return <section className="settings-card"><nav className="settings-tabs" aria-label="Settings sections">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? "selected" : ""} onClick={() => onTabChange(tab)}>{tab}</button>)}</nav><div className="settings-content"><div className="settings-intro"><span className="module-eyebrow">PREFERENCES</span><h2>{activeTab}</h2><p>Manage your {activeTab.toLowerCase()} preferences.</p></div><form onSubmit={(event) => { event.preventDefault(); onSave(); }} className="settings-form">{settingsFields.map(([label, value]) => <label key={label}><span>{label}</span><input value={savedValue(label, value)} onChange={(event) => saveValue(label, event.target.value)} /></label>)}<div className="settings-save-row"><span></span><button className="module-primary-btn" type="submit"><Check size={16} />Save changes</button></div></form></div></section>;
}

function ModuleDialog({ dialog, fields, form, onFormChange, onClose, onSave, onDelete }) {
  const isDelete = dialog.mode === "delete";
  const isPreview = dialog.mode === "preview";
  const record = dialog.record;
  return <motion.div className="module-dialog-overlay" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><motion.section className="module-dialog" role="dialog" aria-modal="true" aria-labelledby="module-dialog-title" initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .98 }}>
    <button className="module-dialog-close" onClick={onClose} aria-label="Close dialog"><X size={19} /></button>
    {isDelete ? <><span className="dialog-icon dialog-danger"><X size={19} /></span><h2 id="module-dialog-title">Remove this record?</h2><p>This removes <strong>{record?.[Object.keys(record)[0]]}</strong> from this list.</p><div className="module-dialog-actions"><button className="module-secondary-btn" onClick={onClose}>Keep record</button><button className="module-danger-btn" onClick={onDelete}>Remove record</button></div></> : isPreview ? <><span className="dialog-icon"><Eye size={19} /></span><span className="module-eyebrow">RECORD DETAILS</span><h2 id="module-dialog-title">{dialog.report}</h2><p>{record ? "Record details." : "Review the current report details."}</p>{record && <div className="preview-record-grid">{Object.entries(record).map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>}<div className="module-dialog-actions"><button className="module-primary-btn" onClick={onClose}>Done</button></div></> : <><span className="dialog-icon"><Plus size={19} /></span><span className="module-eyebrow">CAMPUS DIRECTORY</span><h2 id="module-dialog-title">{dialog.mode === "edit" ? "Edit record" : "Add a record"}</h2><p>Enter the details below.</p><form onSubmit={onSave} className="module-dialog-form">{fields.map((field, index) => <label key={field}><span>{field}{index === 0 ? " *" : ""}</span>{field === "Status" ? <select value={form[field] || "Active"} onChange={(event) => onFormChange(field, event.target.value)}><option>Active</option><option>Scheduled</option><option>Review</option><option>On leave</option></select> : <input autoFocus={index === 0} required={index === 0} value={form[field] || ""} onChange={(event) => onFormChange(field, event.target.value)} placeholder={`Enter ${field.toLowerCase()}`} />}</label>)}<div className="module-dialog-actions"><button className="module-secondary-btn" type="button" onClick={onClose}>Cancel</button><button className="module-primary-btn" type="submit"><Check size={16} />{dialog.mode === "edit" ? "Save changes" : "Add record"}</button></div></form></>}
  </motion.section></motion.div>;
}

export { Workspace };
export default ModulePage;
