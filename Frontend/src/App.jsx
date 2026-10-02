import { useState } from "react";
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
// ================= LOGIN =================

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

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

    // Temporary navigation.
    // Later this will be replaced with Backend API authentication.
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-ambient login-ambient-one" aria-hidden="true" />
      <div className="login-ambient login-ambient-two" aria-hidden="true" />

      {/* LEFT BRANDING SECTION */}

      <div className="login-brand-section">

        <div className="brand-content">

          <div className="brand-logo-large">
            C
          </div>

          <h1>CampusCore<span>360</span></h1>

          <p className="brand-tagline">
            Intelligent Campus ERP
          </p>

          <p className="brand-description">
            A centralized platform to manage students, faculty,
            academics and campus operations efficiently.
          </p>

          <div className="feature-list">

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Smart Campus Management</strong>
                <span>Manage your campus from one platform.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Secure & Reliable</strong>
                <span>Designed for modern educational institutions.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Centralized Information</strong>
                <span>Access important campus data easily.</span>
              </div>
            </div>

          </div>

        </div>

        <div className="brand-footer">
          © 2026 CampusCore360
        </div>

      </div>


      {/* RIGHT LOGIN SECTION */}

      <div className="login-section">

        <div className="login-card">

          <div className="mobile-brand">
            <div className="mobile-logo">C</div>
            <div>
              <h2>CampusCore<span>360</span></h2>
              <p>Intelligent Campus ERP</p>
            </div>
          </div>


          <div className="login-heading">

            <span className="welcome-badge">
              Welcome back
            </span>

            <h2>Sign in to your account</h2>

            <p>
              Enter your credentials to access your campus dashboard.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  @
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  •
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}


            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />

                <span>Remember me</span>

              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={() => alert("Forgot Password feature coming soon.")}
              >
                Forgot Password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn"
            >
              <span>Sign In</span>
              <span className="arrow">→</span>
            </button>

          </form>


          <div className="security-note">

            <span>🔒</span>

            <span>
              Your information is protected and secure.
            </span>

          </div>


          <div className="login-footer">
            CampusCore360 © 2026
          </div>

        </div>

      </div>

    </div>
  );
}
// ================= ERP MODULE PAGE =================

function ModulePage({ title, description }) {
  return (
    <div className="erp-module-page">
      <div className="erp-module-card">
        <span className="erp-welcome">CAMPUSCORE360</span>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="module-coming-soon">
          Module is ready for development.
        </div>
      </div>
    </div>
  );
}

// ================= DASHBOARD =================

function Dashboard() {
  const navigate = useNavigate();
const location = useLocation();

const [sidebarOpen, setSidebarOpen] = useState(false);
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

const activeMenu =
  location.pathname === "/dashboard"
    ? "Dashboard"
    : location.pathname
        .replace("/", "")
        .replace("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Students", icon: "♙" },
    { name: "Faculty", icon: "♟" },
    { name: "Academics", icon: "▤" },
    { name: "Attendance", icon: "✓" },
    { name: "Courses", icon: "▣" },
    { name: "Examinations", icon: "▤" },
    { name: "Reports", icon: "◫" },
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
  };

  navigate(routes[name]);
};

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="erp-dashboard">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="erp-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
  className={`erp-sidebar ${
    sidebarOpen ? "sidebar-open" : ""
  } ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
>

        <div className="erp-brand">
          <div className="erp-brand-logo">C</div>

          <div>
            <h2>CampusCore<span>360</span></h2>
            <p>Campus ERP</p>
          </div>
          <button
  className="sidebar-toggle"
  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
>
  {sidebarCollapsed ? "›" : "‹"}
</button>
        </div>

        <div className="erp-menu-title">
          MAIN MENU
        </div>

        <nav className="erp-nav">

          {menuItems.map((item) => (
            <button
  key={item.name}
  className={`erp-nav-item ${
    activeMenu === item.name ? "active" : ""
  }`}
  onClick={() => handleMenuClick(item.name)}
  data-tooltip={item.name}
>
              <span className="erp-nav-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </button>
          ))}

        </nav>

        <div className="erp-sidebar-bottom">

          <button
  className={`erp-nav-item ${
    activeMenu === "Settings" ? "active" : ""
  }`}
  onClick={() => {
    setSidebarOpen(false);
    navigate("/settings");
  }}
  data-tooltip="Settings"
>
            <span className="erp-nav-icon">⚙</span>
            <span>Settings</span>
          </button>

          <button
            className="erp-nav-item logout-item"
            onClick={handleLogout}
          >
            <span className="erp-nav-icon">↪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* MAIN AREA */}
      <main className="erp-main">

        {/* TOPBAR */}
        <header className="erp-topbar">

          <button
            className="erp-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="erp-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search students, faculty, courses..."
            />

          </div>

          <div className="erp-topbar-right">

            <button
              className="erp-icon-btn"
              title="Notifications"
              onClick={() => alert("No new notifications.")}
            >
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="erp-profile">

              <div className="erp-avatar">
                A
              </div>

              <div className="erp-profile-info">
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>

              <span className="profile-arrow">⌄</span>

            </div>

          </div>

        </header>


        {/* CONTENT */}
        <section className="erp-content">

          {/* PAGE HEADER */}
          <div className="erp-page-header">

            <div>
              <span className="erp-welcome">
                OVERVIEW
              </span>

              <h1>Dashboard</h1>

              <p>
                Welcome back, Admin. Here's what's happening on your campus.
              </p>
            </div>

            <button
              className="erp-primary-btn"
              onClick={() => alert("Add Student module coming soon.")}
            >
              <span>＋</span>
              Add Student
            </button>

          </div>


          {/* STAT CARDS */}
          <div className="erp-stats-grid">

            <button
              className="erp-stat-card"
              onClick={() => handleMenuClick("Students")}
            >
              <div className="erp-stat-top">
                <div className="erp-stat-icon blue">
                  ♙
                </div>

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
                <span>Compared to last month</span>
                <span>→</span>
              </div>
            </button>


            <button
              className="erp-stat-card"
              onClick={() => handleMenuClick("Faculty")}
            >
              <div className="erp-stat-top">
                <div className="erp-stat-icon purple">
                  ♟
                </div>

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
                <span>Compared to last month</span>
                <span>→</span>
              </div>
            </button>


            <button
              className="erp-stat-card"
              onClick={() => handleMenuClick("Courses")}
            >
              <div className="erp-stat-top">
                <div className="erp-stat-icon orange">
                  ▣
                </div>

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
                <span>Currently running</span>
                <span>→</span>
              </div>
            </button>


            <button
              className="erp-stat-card"
              onClick={() => handleMenuClick("Attendance")}
            >
              <div className="erp-stat-top">
                <div className="erp-stat-icon green">
                  ✓
                </div>

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
                <span>Overall campus</span>
                <span>→</span>
              </div>
            </button>

          </div>


          {/* MAIN GRID */}
          <div className="erp-main-grid">


            {/* ATTENDANCE */}
            <div className="erp-panel attendance-panel">

              <div className="erp-panel-header">

                <div>
                  <h2>Attendance Overview</h2>
                  <p>Current academic session</p>
                </div>

                <button
                  className="erp-small-btn"
                  onClick={() => handleMenuClick("Attendance")}
                >
                  View Details
                </button>

              </div>


              <div className="attendance-content">

                <div className="attendance-circle">

                  <div>
                    <strong>92.6%</strong>
                    <span>Attendance</span>
                  </div>

                </div>


                <div className="attendance-details">

                  <div className="attendance-item">
                    <span className="attendance-dot present"></span>
                    <div>
                      <strong>Present</strong>
                      <span>2,268 Students</span>
                    </div>
                    <b>92.6%</b>
                  </div>

                  <div className="attendance-item">
                    <span className="attendance-dot absent"></span>
                    <div>
                      <strong>Absent</strong>
                      <span>182 Students</span>
                    </div>
                    <b>7.4%</b>
                  </div>

                  <div className="attendance-progress">
                    <div className="attendance-progress-fill"></div>
                  </div>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}
            <div className="erp-panel">

              <div className="erp-panel-header">

                <div>
                  <h2>Quick Actions</h2>
                  <p>Frequently used modules</p>
                </div>

              </div>

              <div className="quick-actions">

                <button
                  onClick={() => alert("Add Student module coming soon.")}
                >
                  <span className="quick-icon blue">＋</span>
                  <div>
                    <strong>Add Student</strong>
                    <small>Create student record</small>
                  </div>
                  <span>→</span>
                </button>

                <button
                  onClick={() => alert("Faculty module coming soon.")}
                >
                  <span className="quick-icon purple">♟</span>
                  <div>
                    <strong>Manage Faculty</strong>
                    <small>View faculty records</small>
                  </div>
                  <span>→</span>
                </button>

                <button
                  onClick={() => alert("Course module coming soon.")}
                >
                  <span className="quick-icon orange">▣</span>
                  <div>
                    <strong>Manage Courses</strong>
                    <small>View active courses</small>
                  </div>
                  <span>→</span>
                </button>

                <button
                  onClick={() => alert("Reports module coming soon.")}
                >
                  <span className="quick-icon green">◫</span>
                  <div>
                    <strong>Generate Report</strong>
                    <small>Download campus report</small>
                  </div>
                  <span>→</span>
                </button>

              </div>

            </div>

          </div>


          {/* BOTTOM GRID */}
          <div className="erp-bottom-grid">


            {/* RECENT ACTIVITIES */}
            <div className="erp-panel">

              <div className="erp-panel-header">

                <div>
                  <h2>Recent Activities</h2>
                  <p>Latest campus updates</p>
                </div>

                <button
                  className="erp-text-btn"
                  onClick={() => alert("Showing all activities.")}
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


            {/* SYSTEM STATUS */}
            <div className="erp-panel system-panel">

              <div className="erp-panel-header">

                <div>
                  <h2>System Status</h2>
                  <p>CampusCore360 services</p>
                </div>

                <span className="system-online">
                  ● Online
                </span>

              </div>


              <div className="system-status-list">

                <div>
                  <span>Database</span>
                  <b>Operational</b>
                  <i></i>
                </div>

                <div>
                  <span>Authentication</span>
                  <b>Operational</b>
                  <i></i>
                </div>

                <div>
                  <span>Student Portal</span>
                  <b>Operational</b>
                  <i></i>
                </div>

                <div>
                  <span>API Services</span>
                  <b>Operational</b>
                  <i></i>
                </div>

              </div>

              <div className="system-footer">
                Last updated just now
              </div>

            </div>

          </div>


          {/* FOOTER */}
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


// ================= APP =================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
     <Route
  path="/students"
  element={<Students />}
/>

<Route
  path="/faculty"
  element={
    <ModulePage
      title="Faculty"
      description="Manage faculty profiles, departments and information."
    />
  }
/>

<Route
  path="/academics"
  element={
    <ModulePage
      title="Academics"
      description="Manage academic programs, semesters and activities."
    />
  }
/>

<Route
  path="/attendance"
  element={
    <ModulePage
      title="Attendance"
      description="Track and manage student attendance."
    />
  }
/>

<Route
  path="/courses"
  element={
    <ModulePage
      title="Courses"
      description="Manage courses, subjects and course schedules."
    />
  }
/>

<Route
  path="/examinations"
  element={
    <ModulePage
      title="Examinations"
      description="Manage examinations, schedules and results."
    />
  }
/>

<Route
  path="/reports"
  element={
    <ModulePage
      title="Reports"
      description="View and generate campus management reports."
    />
  }
/>

<Route
  path="/settings"
  element={
    <ModulePage
      title="Settings"
      description="Manage CampusCore360 system settings."
    />
  }
/>
  </Routes>
    </BrowserRouter>
    
  );
}

export default App;
