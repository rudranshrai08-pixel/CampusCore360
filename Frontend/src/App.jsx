import { useMemo, useState } from "react";

import { MotionConfig, motion } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Users,
  BookOpen,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  ChevronDown,
  LayoutDashboard,
  GraduationCap,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Plus,
  Sparkles,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Students from "./Components/students/students.jsx";
import ModulePage, { Workspace } from "./Components/modules/ModulePage.jsx";
import StudentSuccess from "./Components/student-success/StudentSuccess.jsx";
import { analyzeStudent, readStudentRecords, readStudentSuccessSettings } from "./ai/studentSuccessEngine.js";

/* =========================================================
   LOGIN
   ========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 900);
  };

  return (
    <div className="cc-login-page">

      {/* Animated Background */}
      <div className="cc-login-background">

        <motion.div
          className="cc-orb cc-orb-one"
          animate={{
            x: [0, 45, 0],
            y: [0, -35, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="cc-orb cc-orb-two"
          animate={{
            x: [0, -40, 0],
            y: [0, 35, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="cc-orb cc-orb-three"
          animate={{
            y: [0, -25, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="cc-login-grid" />
      </div>

      <div className="cc-login-container">

        {/* =================================================
            LEFT SIDE
            ================================================= */}

        <motion.section
          className="cc-login-showcase"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >

          <motion.div
            className="cc-logo"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 180,
            }}
          >
            C
          </motion.div>

          <motion.div
            className="cc-showcase-content"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
          >

            <div className="cc-status">
              <span className="cc-status-dot" />
              SMART CAMPUS PLATFORM
            </div>

            <h1>
              CampusCore<span>360</span>
            </h1>

            <h2>
              One Platform.
              <br />
              <span>Smarter Campus.</span>
            </h2>

            <p className="cc-showcase-description">
              A modern campus management platform designed to
              connect students, faculty, academics and campus
              operations in one intelligent ecosystem.
            </p>

            <div className="cc-feature-list">

              <motion.div
                className="cc-feature"
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.45,
                }}
                whileHover={{
                  x: 6,
                }}
              >

                <div className="cc-feature-icon">
                  <Users size={19} />
                </div>

                <div>
                  <strong>
                    Smart Campus Management
                  </strong>

                  <span>
                    Manage your campus from one platform.
                  </span>
                </div>

              </motion.div>

              <motion.div
                className="cc-feature"
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.6,
                }}
                whileHover={{
                  x: 6,
                }}
              >

                <div className="cc-feature-icon">
                  <BookOpen size={19} />
                </div>

                <div>
                  <strong>
                    Connected Academics
                  </strong>

                  <span>
                    Organize courses, faculty and students.
                  </span>
                </div>

              </motion.div>

              <motion.div
                className="cc-feature"
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.75,
                }}
                whileHover={{
                  x: 6,
                }}
              >

                <div className="cc-feature-icon">
                  <BarChart3 size={19} />
                </div>

                <div>
                  <strong>
                    Powerful Insights
                  </strong>

                  <span>
                    Monitor your campus with useful analytics.
                  </span>
                </div>

              </motion.div>

            </div>

          </motion.div>

          <div className="cc-showcase-footer">
            <span>
              © 2026 CampusCore360
            </span>

            <span>
              Intelligent Campus ERP
            </span>
          </div>

        </motion.section>

        {/* =================================================
            RIGHT LOGIN
            ================================================= */}

        <section className="cc-login-form-area">

          <motion.div
            className="cc-login-card"
            initial={{
              opacity: 0,
              y: 45,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: "easeOut",
            }}
          >

            {/* Mobile Brand */}

            <div className="cc-mobile-brand">

              <div className="cc-mobile-logo">
                C
              </div>

              <div>

                <strong>
                  CampusCore<span>360</span>
                </strong>

                <small>
                  Intelligent Campus ERP
                </small>

              </div>

            </div>

            {/* Heading */}

            <motion.div
              className="cc-login-heading"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
              }}
            >

              <div className="cc-welcome">
                <span>✦</span>
                Welcome back
              </div>

              <h2>
                Sign in to your account
              </h2>

              <p>
                Enter your credentials to access your
                campus dashboard.
              </p>

            </motion.div>

            {/* Login Form */}

            <form onSubmit={handleLogin}>

              {/* Email */}

              <motion.div
                className="cc-form-group"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                }}
              >

                <label htmlFor="cc-email">
                  Email Address
                </label>

                <div className="cc-input-wrapper">

                  <Mail
                    size={19}
                    className="cc-input-icon"
                  />

                  <input
                    id="cc-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="admin@gmail.com"
                    autoComplete="email"
                  />

                </div>

              </motion.div>

              {/* Password */}

              <motion.div
                className="cc-form-group"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                }}
              >

                <label htmlFor="cc-password">
                  Password
                </label>

                <div className="cc-input-wrapper">

                  <Lock
                    size={19}
                    className="cc-input-icon"
                  />

                  <input
                    id="cc-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="cc-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </motion.div>

              {/* Error */}

              {error && (
                <motion.div
                  className="cc-login-error"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Remember + Forgot */}

              <motion.div
                className="cc-login-options"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.65,
                }}
              >

                <label className="cc-remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span className="cc-checkbox">
                    ✓
                  </span>

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="cc-forgot"
                  onClick={() => setError("Password recovery is not configured. Contact your campus administrator for access.")}
                >
                  Forgot Password?
                </button>

              </motion.div>

              {/* Sign In Button */}

              <motion.button
                type="submit"
                className="cc-login-button"
                disabled={isLoading}
                whileHover={{
                  scale: isLoading ? 1 : 1.015,
                }}
                whileTap={{
                  scale: isLoading ? 1 : 0.98,
                }}
              >

                {isLoading ? (
                  <>
                    <span className="cc-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>
                      Sign In
                    </span>

                    <ArrowRight size={20} />
                  </>
                )}

              </motion.button>

            </form>

            {/* Security */}

            <motion.div
              className="cc-security"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
            >

              <ShieldCheck size={17} />

              <span>
                Your information is protected and secure.
              </span>

            </motion.div>

            {/* Footer */}

            <div className="cc-card-footer">
              CampusCore360 © 2026
            </div>

          </motion.div>

        </section>

      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentAlerts = useMemo(() => {
    const criteria = readStudentSuccessSettings();
    return readStudentRecords().map((student) => analyzeStudent(student, criteria)).filter((student) => student.needsSupport);
  }, []);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);
  const [topbarPanel, setTopbarPanel] = useState("");
  const [dashboardSearch, setDashboardSearch] = useState("");

  const activeMenu =
    location.pathname === "/dashboard"
      ? "Dashboard"
      : location.pathname === "/student-success"
        ? "Student Success AI"
        : location.pathname
            .replace("/", "")
            .replace("-", " ")
            .replace(/\b\w/g, (char) =>
              char.toUpperCase()
            );

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: GraduationCap },
    { name: "Faculty", icon: Users },
    { name: "Academics", icon: BookOpen },
    { name: "Attendance", icon: ClipboardCheck },
    { name: "Courses", icon: BookOpen },
    { name: "Examinations", icon: CalendarDays },
    { name: "Reports", icon: BarChart3 },
    { name: "Student Success AI", icon: Sparkles },
  ];

  const handleMenuClick = (name) => {
    setSidebarOpen(false);

    const routes = {
      Dashboard: "/dashboard",
      Students: "/students",
      Faculty: "/faculty",
      Academics: "/academics",
      Attendance: "/attendance",
      Courses: "/courses",
      Examinations: "/examinations",
      Reports: "/reports",
      "Student Success AI": "/student-success",
    };

    navigate(routes[name]);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="erp-dashboard">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <button
          type="button"
          className="erp-overlay"
          aria-label="Close navigation"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside
        className={`erp-sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        } ${
          sidebarCollapsed
            ? "sidebar-collapsed"
            : ""
        }`}
      >

        {/* Brand */}

        <div className="erp-brand">

          <div className="erp-brand-logo">
            C
          </div>

          <div>
            <h2>
              CampusCore<span>360</span>
            </h2>

            <p>
              Campus ERP
            </p>
          </div>

          <button
            className="sidebar-toggle"
            onClick={() =>
              setSidebarCollapsed(
                !sidebarCollapsed
              )
            }
            title={
              sidebarCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed
              ? "›"
              : "‹"}
          </button>

        </div>

        {/* Menu title */}

        <div className="erp-menu-title">
          MAIN MENU
        </div>

        {/* Navigation */}

        <nav className="erp-nav" aria-label="Main navigation">

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`erp-nav-item ${
                activeMenu === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleMenuClick(
                  item.name
                )
              }
              aria-current={activeMenu === item.name ? "page" : undefined}
              data-tooltip={item.name}
            >

              <span className="erp-nav-icon">
                <item.icon size={18} strokeWidth={1.8} />
              </span>

              <span>
                {item.name}
              </span>

            </button>
          ))}

        </nav>

        {/* Bottom */}

        <div className="erp-sidebar-bottom">

          <button
            className={`erp-nav-item ${
              activeMenu === "Settings"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setSidebarOpen(false);
              navigate("/settings");
            }}
            data-tooltip="Settings"
          >

            <span className="erp-nav-icon">
              <Settings size={18} />
            </span>

            <span>
              Settings
            </span>

          </button>

          <button
            className="erp-nav-item logout-item"
            onClick={handleLogout}
          >

            <span className="erp-nav-icon">
              <LogOut size={18} />
            </span>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =================================================
          MAIN
          ================================================= */}

      <main className="erp-main">

        {/* TOPBAR */}

        <header className="erp-topbar">

          <button
            className="erp-menu-toggle"
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>

          <div className="workspace-search-wrap dashboard-search-wrap"><label className="erp-search workspace-search"><Search size={17} /><input type="text" aria-label="Search workspace pages" placeholder="Search workspace pages…" value={dashboardSearch} onChange={(event) => setDashboardSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setDashboardSearch(""); if (event.key === "Enter" && dashboardSearch.trim()) { const result = menuItems.find((item) => item.name.toLowerCase().includes(dashboardSearch.toLowerCase())); if (result) handleMenuClick(result.name); } }} /></label>{dashboardSearch.trim() && <div className="workspace-search-results">{menuItems.filter((item) => item.name.toLowerCase().includes(dashboardSearch.toLowerCase())).map((item) => <button key={item.name} onClick={() => { handleMenuClick(item.name); setDashboardSearch(""); }}><item.icon size={15} />{item.name}<span>→</span></button>)}{!menuItems.some((item) => item.name.toLowerCase().includes(dashboardSearch.toLowerCase())) && <span>No matching pages</span>}</div>}</div>

          <div className="erp-topbar-right">

            <button
              className="erp-icon-btn"
              title="Notifications"
              aria-label="Notifications"
              aria-expanded={topbarPanel === "notifications"}
              onClick={() => setTopbarPanel((current) => current === "notifications" ? "" : "notifications")}
            >

              <Bell size={18} />

              {studentAlerts.length > 0 && <span className="notification-dot" />}

            </button>

            {topbarPanel === "notifications" && <div className="dashboard-popover dashboard-notification-popover"><strong>{studentAlerts.length ? `${studentAlerts.length} student check-in${studentAlerts.length === 1 ? "" : "s"} suggested` : "You're all caught up"}</strong><span>{studentAlerts.length ? "Current attendance and performance signals." : "No students are below the current criteria."}</span>{studentAlerts.slice(0, 3).map((student) => <button key={student.id} className="dashboard-notification-entry" onClick={() => navigate("/student-success")}><i className={student.severity === "high" ? "priority" : ""} /><span><strong>{student.name}</strong><small>{student.concerns.join(" + ")}</small></span><ArrowRight size={14} /></button>)}<button className="dashboard-notification-link" onClick={() => navigate("/student-success")}>Open Student Success AI<ArrowRight size={14} /></button></div>}

            <button className="erp-profile dashboard-profile-button" aria-expanded={topbarPanel === "profile"} onClick={() => setTopbarPanel((current) => current === "profile" ? "" : "profile")}>

              <div className="erp-avatar">
                A
              </div>

              <div className="erp-profile-info">

                <strong>
                  Admin
                </strong>

                <span>
                  Administrator
                </span>

              </div>

              <span className="profile-arrow">⌄</span>
            </button>
            {topbarPanel === "profile" && <div className="dashboard-popover dashboard-profile-popover"><strong>Admin</strong><span>admin@campuscore.edu</span><button onClick={() => navigate("/settings")}>Account settings</button><button onClick={handleLogout}>Sign out</button></div>}

          </div>

        </header>


        {/* =================================================
            CONTENT
            ================================================= */}

        <section className="erp-content">

          {/* PAGE HEADER */}

          <div className="erp-page-header">

            <div>

              <span className="erp-welcome">CAMPUS OVERVIEW · {new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</span>

              <h1>
                Dashboard
              </h1>

              <p>
                Good morning, Admin 👋 Here's what's happening across your campus today.
              </p>

            </div>

            <button
              className="erp-primary-btn"
              onClick={() => navigate("/students", { state: { openAddStudent: true } })}
            >

              <Plus size={17} />

              Add Student

            </button>

          </div>


          {/* =================================================
              STATISTICS
              ================================================= */}

          <div className="erp-stats-grid">

            {/* Students */}

            <button
              className="erp-stat-card"
              onClick={() =>
                handleMenuClick(
                  "Students"
                )
              }
            >

              <div className="erp-stat-top">

                <div className="erp-stat-icon blue"><GraduationCap size={20} /></div>

                <span className="erp-stat-growth">
                  +8.2%
                </span>

              </div>

              <div className="erp-stat-number">
                2,450
              </div>

              <div className="erp-stat-label">
                Total Students
              </div>

              <div className="erp-stat-footer">

                <span>
                  Compared to last month
                </span>

                <span>
                  →
                </span>

              </div>

            </button>


            {/* Faculty */}

            <button
              className="erp-stat-card"
              onClick={() =>
                handleMenuClick(
                  "Faculty"
                )
              }
            >

              <div className="erp-stat-top">

                <div className="erp-stat-icon purple"><Users size={20} /></div>

                <span className="erp-stat-growth">
                  +4.5%
                </span>

              </div>

              <div className="erp-stat-number">
                186
              </div>

              <div className="erp-stat-label">
                Total Faculty
              </div>

              <div className="erp-stat-footer">

                <span>
                  Compared to last month
                </span>

                <span>
                  →
                </span>

              </div>

            </button>


            {/* Courses */}

            <button
              className="erp-stat-card"
              onClick={() =>
                handleMenuClick(
                  "Courses"
                )
              }
            >

              <div className="erp-stat-top">

                <div className="erp-stat-icon orange"><BookOpen size={20} /></div>

                <span className="erp-stat-growth">
                  +12%
                </span>

              </div>

              <div className="erp-stat-number">
                64
              </div>

              <div className="erp-stat-label">
                Active Courses
              </div>

              <div className="erp-stat-footer">

                <span>
                  Currently running
                </span>

                <span>
                  →
                </span>

              </div>

            </button>


            {/* Attendance */}

            <button
              className="erp-stat-card"
              onClick={() =>
                handleMenuClick(
                  "Attendance"
                )
              }
            >

              <div className="erp-stat-top">

                <div className="erp-stat-icon green"><ClipboardCheck size={20} /></div>

                <span className="erp-stat-growth">
                  +2.4%
                </span>

              </div>

              <div className="erp-stat-number">
                92.6%
              </div>

              <div className="erp-stat-label">
                Average Attendance
              </div>

              <div className="erp-stat-footer">

                <span>
                  Overall campus
                </span>

                <span>
                  →
                </span>

              </div>

            </button>

            <button className="erp-stat-card" onClick={() => handleMenuClick("Examinations")}>
              <div className="erp-stat-top"><div className="erp-stat-icon purple"><CalendarDays size={20} /></div><span className="erp-stat-growth">Next 14 days</span></div>
              <div className="erp-stat-number">08</div><div className="erp-stat-label">Upcoming Exams</div><div className="erp-stat-footer"><span>Across 5 departments</span><span>→</span></div>
            </button>

            <button className="erp-stat-card" onClick={() => handleMenuClick("Reports")}>
              <div className="erp-stat-top"><div className="erp-stat-icon orange"><ClipboardCheck size={20} /></div><span className="erp-stat-growth">Needs review</span></div>
              <div className="erp-stat-number">12</div><div className="erp-stat-label">Pending Tasks</div><div className="erp-stat-footer"><span>Academic operations</span><span>→</span></div>
            </button>

          </div>

          <section className="dashboard-analytics-grid">
            <article className="erp-panel enrollment-panel"><div className="erp-panel-header"><div><h2>Student enrollment</h2><p>Enrollment trend</p></div><span className="analytics-period">Last 6 months <ChevronDown size={13} /></span></div><div className="enrollment-chart" role="img" aria-label="Student enrollment trend rises steadily from May through October"><div className="chart-y-labels"><span>2,600</span><span>2,400</span><span>2,200</span><span>2,000</span></div><div className="chart-plot"><div className="chart-gridlines"><i /><i /><i /><i /></div><svg viewBox="0 0 600 190" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="enrollment-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4f7df3" stopOpacity=".22"/><stop offset="100%" stopColor="#4f7df3" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 145 C50 135 68 119 120 125 S200 105 240 110 S310 80 360 92 S430 57 480 70 S550 35 600 42 V190 H0 Z"/><path className="chart-line" d="M0 145 C50 135 68 119 120 125 S200 105 240 110 S310 80 360 92 S430 57 480 70 S550 35 600 42"/><circle cx="600" cy="42" r="5" /></svg><div className="chart-x-labels"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div></div></div><div className="chart-legend"><span><i />Student enrollment</span><strong>2,450 <small>students</small></strong></div></article>
            <article className="erp-panel distribution-panel"><div className="erp-panel-header"><div><h2>Course distribution</h2><p>Enrollment by school</p></div><button className="erp-text-btn" onClick={() => navigate("/courses")}>View courses</button></div><div className="distribution-list"><div><span><i className="distribution-blue"/>Engineering</span><div><b style={{ width: "79%" }}/></div><strong>32%</strong></div><div><span><i className="distribution-purple"/>Computing</span><div><b style={{ width: "66%" }}/></div><strong>27%</strong></div><div><span><i className="distribution-cyan"/>Business</span><div><b style={{ width: "48%" }}/></div><strong>21%</strong></div><div><span><i className="distribution-orange"/>Sciences</span><div><b style={{ width: "39%" }}/></div><strong>20%</strong></div></div></article>
          </section>


          {/* =================================================
              MAIN GRID
              ================================================= */}

          <div className="erp-main-grid">

            {/* Attendance */}

            <div className="erp-panel attendance-panel">

              <div className="erp-panel-header">

                <div>

                  <h2>
                    Attendance Overview
                  </h2>

                  <p>
                    Current academic session
                  </p>

                </div>

                <button
                  className="erp-small-btn"
                  onClick={() =>
                    handleMenuClick(
                      "Attendance"
                    )
                  }
                >
                  View Details
                </button>

              </div>


              <div className="attendance-content">

                <div className="attendance-circle">

                  <div>

                    <strong>
                      92.6%
                    </strong>

                    <span>
                      Attendance
                    </span>

                  </div>

                </div>


                <div className="attendance-details">

                  <div className="attendance-item">

                    <span className="attendance-dot present" />

                    <div>

                      <strong>
                        Present
                      </strong>

                      <span>
                        2,268 Students
                      </span>

                    </div>

                    <b>
                      92.6%
                    </b>

                  </div>


                  <div className="attendance-item">

                    <span className="attendance-dot absent" />

                    <div>

                      <strong>
                        Absent
                      </strong>

                      <span>
                        182 Students
                      </span>

                    </div>

                    <b>
                      7.4%
                    </b>

                  </div>


                  <div className="attendance-progress">

                    <div className="attendance-progress-fill" />

                  </div>

                </div>

              </div>

            </div>


            {/* Quick Actions */}

            <div className="erp-panel">

              <div className="erp-panel-header">

                <div>

                  <h2>
                    Quick Actions
                  </h2>

                  <p>
                    Frequently used modules
                  </p>

                </div>

              </div>


              <div className="quick-actions">

                <button
                  onClick={() => navigate("/students", { state: { openAddStudent: true } })}
                >

                  <span className="quick-icon blue">
                    ＋
                  </span>

                  <div>

                    <strong>
                      Add Student
                    </strong>

                    <small>
                      Create student record
                    </small>

                  </div>

                  <span>
                    →
                  </span>

                </button>


                <button
                  onClick={() => navigate("/faculty")}
                >

                  <span className="quick-icon purple">
                    ♟
                  </span>

                  <div>

                    <strong>
                      Manage Faculty
                    </strong>

                    <small>
                      View faculty records
                    </small>

                  </div>

                  <span>
                    →
                  </span>

                </button>


                <button
                  onClick={() => navigate("/courses")}
                >

                  <span className="quick-icon orange">
                    ▣
                  </span>

                  <div>

                    <strong>
                      Manage Courses
                    </strong>

                    <small>
                      View active courses
                    </small>

                  </div>

                  <span>
                    →
                  </span>

                </button>


                <button
                  onClick={() => navigate("/reports")}
                >

                  <span className="quick-icon green">
                    ◫
                  </span>

                  <div>

                    <strong>
                      Generate Report
                    </strong>

                    <small>
                      Download campus report
                    </small>

                  </div>

                  <span>
                    →
                  </span>

                </button>

                <button onClick={() => navigate("/attendance")}>
                  <span className="quick-icon blue"><ClipboardCheck size={18} /></span>
                  <div><strong>Mark Attendance</strong><small>Open today's class register</small></div><span>→</span>
                </button>

                <button onClick={() => navigate("/examinations")}>
                  <span className="quick-icon purple"><CalendarDays size={18} /></span>
                  <div><strong>Schedule Exam</strong><small>Manage upcoming assessments</small></div><span>→</span>
                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              BOTTOM GRID
              ================================================= */}

          <div className="erp-bottom-grid">

            {/* Recent Activities */}

            <div className="erp-panel">

              <div className="erp-panel-header">

                <div>

                  <h2>
                    Recent Activities
                  </h2>

                  <p>
                    Latest campus updates
                  </p>

                </div>

                <button
                  className="erp-text-btn"
                  onClick={() => navigate("/reports")}
                >
                  View All
                </button>

              </div>


              <div className="activity-list">

                <div className="activity-item">

                  <div className="activity-avatar blue">
                    ♙
                  </div>

                  <div>

                    <strong>
                      24 new students registered
                    </strong>

                    <span>
                      Student Management • 15 minutes ago
                    </span>

                  </div>

                </div>


                <div className="activity-item">

                  <div className="activity-avatar purple">
                    ♟
                  </div>

                  <div>

                    <strong>
                      Faculty profile updated
                    </strong>

                    <span>
                      Faculty Management • 42 minutes ago
                    </span>

                  </div>

                </div>


                <div className="activity-item">

                  <div className="activity-avatar orange">
                    ▣
                  </div>

                  <div>

                    <strong>
                      New course added: Data Science
                    </strong>

                    <span>
                      Academics • 1 hour ago
                    </span>

                  </div>

                </div>


                <div className="activity-item">

                  <div className="activity-avatar green">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Attendance report generated
                    </strong>

                    <span>
                      Reports • 2 hours ago
                    </span>

                  </div>

                </div>

              </div>

            </div>


            {/* System Status */}

            <div className="erp-panel system-panel">

              <div className="erp-panel-header">

                <div>

                  <h2>
                    System Status
                  </h2>

                  <p>
                    CampusCore360 services
                  </p>

                </div>

                <span className="system-online">
                  ● Online
                </span>

              </div>


              <div className="system-status-list">

                <div>

                  <span>
                    Database
                  </span>

                  <b>
                    Operational
                  </b>

                  <i />

                </div>

                <div>

                  <span>
                    Authentication
                  </span>

                  <b>
                    Operational
                  </b>

                  <i />

                </div>

                <div>

                  <span>
                    Student Portal
                  </span>

                  <b>
                    Operational
                  </b>

                  <i />

                </div>

                <div>

                  <span>
                    API Services
                  </span>

                  <b>
                    Operational
                  </b>

                  <i />

                </div>

              </div>

              <div className="system-footer">
                Last updated just now
              </div>

            </div>

          </div>


          {/* Footer */}

          <footer className="erp-footer">

            <span>
              © 2026 CampusCore360
            </span>

            <span>
              Intelligent Campus ERP
            </span>

          </footer>

        </section>

      </main>

    </div>
  );
}


/* =========================================================
   APP ROUTES
   ========================================================= */

function App() {
  return (
    <BrowserRouter>

      <MotionConfig reducedMotion="user">
      <Routes>

        {/* Home */}

        <Route
          path="/"
          element={
            <Navigate
              to="/student-success"
              replace
            />
          }
        />

        {/* Login */}

        <Route
          path="/login"
          element={
            <Login />
          }
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

        {/* Students */}

        <Route
          path="/students"
          element={
            <Workspace activePage="Students">
              <Students />
            </Workspace>
          }
        />

        <Route
          path="/student-success"
          element={<StudentSuccess />}
        />

        {/* Faculty */}

        <Route
          path="/faculty"
          element={
            <ModulePage
              title="Faculty"
              description="Manage faculty profiles, departments and information."
            />
          }
        />

        {/* Academics */}

        <Route
          path="/academics"
          element={
            <ModulePage
              title="Academics"
              description="Manage academic programs, semesters and activities."
            />
          }
        />

        {/* Attendance */}

        <Route
          path="/attendance"
          element={
            <ModulePage
              title="Attendance"
              description="Track and manage student attendance."
            />
          }
        />

        {/* Courses */}

        <Route
          path="/courses"
          element={
            <ModulePage
              title="Courses"
              description="Manage courses, subjects and course schedules."
            />
          }
        />

        {/* Examinations */}

        <Route
          path="/examinations"
          element={
            <ModulePage
              title="Examinations"
              description="Manage examinations, schedules and results."
            />
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <ModulePage
              title="Reports"
              description="View and generate campus management reports."
            />
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ModulePage
              title="Settings"
              description="Manage CampusCore360 system settings."
            />
          }
        />

        {/* Unknown URL */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
      </MotionConfig>

    </BrowserRouter>
  );
}

export default App;
