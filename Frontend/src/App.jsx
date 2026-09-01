import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary frontend login
    if (email === "admin@gmail.com" && password === "admin123") {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand">
          <div className="brand-logo">C</div>

          <div>
            <h1>CampusCore360</h1>
            <p>Intelligent Campus ERP</p>
          </div>
        </div>

        <div className="login-heading">
          <h2>Welcome Back</h2>
          <p>Login to access your campus dashboard</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">

            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>CampusCore360 © 2026</p>
        </div>

      </div>
    </div>
  );
}


function Dashboard() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-logo">C</div>
          <div>
            <h2>CampusCore360</h2>
            <span>Intelligent Campus ERP</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <p className="nav-title">MAIN MENU</p>

          <a className="nav-item active">
            <span>📊</span>
            Dashboard
          </a>

          <a className="nav-item">
            <span>👨‍🎓</span>
            Students
          </a>

          <a className="nav-item">
            <span>👨‍🏫</span>
            Faculty
          </a>

          <a className="nav-item">
            <span>📅</span>
            Attendance
          </a>

          <a className="nav-item">
            <span>💰</span>
            Fees
          </a>

          <a className="nav-item">
            <span>📝</span>
            Exams
          </a>

          <a className="nav-item">
            <span>📚</span>
            Courses
          </a>

          <a className="nav-item">
            <span>📢</span>
            Notices
          </a>

          <p className="nav-title">SYSTEM</p>

          <a className="nav-item">
            <span>⚙️</span>
            Settings
          </a>

        </nav>

        <div className="sidebar-bottom">
          <div className="admin-mini">
            <div className="avatar">A</div>
            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

      </aside>


      {/* Main Content */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="topbar">

          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="topbar-actions">

            <div className="search-box">
              🔍
              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <button className="icon-btn">
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="profile">
              <div className="avatar">A</div>
              <div>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
            </div>

          </div>

        </header>


        {/* Dashboard Content */}
        <section className="dashboard-content">

          {/* Stats */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">👨‍🎓</div>
              <div>
                <p>Total Students</p>
                <h2>2,450</h2>
                <span className="positive">↑ 8.2% this year</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">👨‍🏫</div>
              <div>
                <p>Total Faculty</p>
                <h2>186</h2>
                <span className="positive">↑ 4.5% this year</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">📚</div>
              <div>
                <p>Active Courses</p>
                <h2>72</h2>
                <span className="neutral">Current semester</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">📊</div>
              <div>
                <p>Avg. Attendance</p>
                <h2>87.4%</h2>
                <span className="positive">↑ 2.1% this month</span>
              </div>
            </div>

          </div>


          {/* Middle Section */}
          <div className="dashboard-grid">

            {/* Attendance */}
            <div className="dashboard-card attendance-card">

              <div className="card-header">
                <div>
                  <h3>Attendance Overview</h3>
                  <p>Current academic semester</p>
                </div>

                <select>
                  <option>This Month</option>
                  <option>This Semester</option>
                </select>
              </div>

              <div className="attendance-content">

                <div className="attendance-circle">
                  <div>
                    <strong>87%</strong>
                    <span>Attendance</span>
                  </div>
                </div>

                <div className="attendance-info">

                  <div>
                    <span className="legend blue-bg"></span>
                    <p>Present</p>
                    <strong>87%</strong>
                  </div>

                  <div>
                    <span className="legend gray-bg"></span>
                    <p>Absent</p>
                    <strong>8%</strong>
                  </div>

                  <div>
                    <span className="legend orange-bg"></span>
                    <p>Leave</p>
                    <strong>5%</strong>
                  </div>

                </div>

              </div>

            </div>


            {/* Quick Actions */}
            <div className="dashboard-card">

              <div className="card-header">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Frequently used modules</p>
                </div>
              </div>

              <div className="quick-actions">

                <button>
                  <span>➕</span>
                  Add Student
                </button>

                <button>
                  <span>👨‍🏫</span>
                  Add Faculty
                </button>

                <button>
                  <span>📢</span>
                  Create Notice
                </button>

                <button>
                  <span>📝</span>
                  Schedule Exam
                </button>

              </div>

            </div>

          </div>


          {/* Bottom Section */}
          <div className="dashboard-grid bottom-grid">

            {/* Notices */}
            <div className="dashboard-card">

              <div className="card-header">
                <div>
                  <h3>Recent Notices</h3>
                  <p>Latest campus announcements</p>
                </div>

                <button className="view-all">
                  View All
                </button>
              </div>

              <div className="notice-list">

                <div className="notice">
                  <div className="notice-icon blue">📢</div>
                  <div>
                    <strong>Mid Semester Examination</strong>
                    <p>Examinations will begin from 15 September.</p>
                    <small>2 hours ago</small>
                  </div>
                </div>

                <div className="notice">
                  <div className="notice-icon green">🎓</div>
                  <div>
                    <strong>Placement Drive</strong>
                    <p>Registration is open for upcoming campus placements.</p>
                    <small>Yesterday</small>
                  </div>
                </div>

                <div className="notice">
                  <div className="notice-icon orange">📅</div>
                  <div>
                    <strong>Holiday Notice</strong>
                    <p>Campus will remain closed on the upcoming holiday.</p>
                    <small>2 days ago</small>
                  </div>
                </div>

              </div>

            </div>


            {/* Upcoming Events */}
            <div className="dashboard-card">

              <div className="card-header">
                <div>
                  <h3>Upcoming Events</h3>
                  <p>Important dates</p>
                </div>
              </div>

              <div className="event-list">

                <div className="event">
                  <div className="event-date">
                    <strong>15</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <strong>Mid Semester Exam</strong>
                    <p>All Departments</p>
                  </div>
                </div>

                <div className="event">
                  <div className="event-date">
                    <strong>20</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <strong>Placement Drive</strong>
                    <p>Final Year Students</p>
                  </div>
                </div>

                <div className="event">
                  <div className="event-date">
                    <strong>25</strong>
                    <span>SEP</span>
                  </div>

                  <div>
                    <strong>Faculty Meeting</strong>
                    <p>Conference Hall</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


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

      </Routes>

    </BrowserRouter>
  );
}

export default App;