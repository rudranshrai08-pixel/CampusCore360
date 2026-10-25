import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { readStudentRecords, studentSuccessKey } from "../../ai/studentSuccessEngine.js";
import "./students.css";

function Students() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Branches");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(() => Boolean(location.state?.openAddStudent));
  const [editingId, setEditingId] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [page, setPage] = useState(1);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");

const [newStudent, setNewStudent] = useState({
  name: "",
  email: "",
  course: "MCA",
  year: "1st Year",
  status: "Active",
  attendance: 100,
  performance: 70,
  previousPerformance: 70,
});
  const [students, setStudents] = useState(readStudentRecords);

 const filteredStudents = students.filter((student) => {
  const matchesSearch =
    `${student.name} ${student.email} ${student.id} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCourse =
    courseFilter === "All Branches" ||
    student.course === courseFilter;

  const matchesYear =
    yearFilter === "All Years" ||
    student.year === yearFilter;

  return matchesSearch && matchesCourse && matchesYear;
});
const pageSize = 6;
const visibleStudents = filteredStudents.slice((page - 1) * pageSize, page * pageSize);
const pageCount = Math.max(1, Math.ceil(filteredStudents.length / pageSize));

const createStudentId = (records) => {
  const existingIds = new Set(records.map((student) => student.id));
  let number = 1;
  while (existingIds.has(`STU${String(number).padStart(3, "0")}`)) number += 1;
  return `STU${String(number).padStart(3, "0")}`;
};

const openAddForm = () => {
  setEditingId(null);
  setNewStudent({ name: "", email: "", course: "MCA", year: "1st Year", status: "Active", attendance: 100, performance: 70, previousPerformance: 70 });
  setFormError("");
  setShowForm(true);
};

useEffect(() => {
  if (location.state?.openAddStudent) {
    navigate(location.pathname, { replace: true, state: null });
  }
}, [location.key, location.pathname, location.state, navigate]);

useEffect(() => {
  try {
    window.localStorage.setItem(studentSuccessKey, JSON.stringify(students));
  } catch {
    // Keep student management available if browser storage is disabled.
  }
}, [students]);

const openEditForm = (student) => {
  setEditingId(student.id);
  setNewStudent({ name: student.name, email: student.email, course: student.course, year: student.year, status: student.status, attendance: Number.parseFloat(student.attendance) || 0, performance: student.performance ?? 70, previousPerformance: student.previousPerformance ?? student.performance ?? 70 });
  setFormError("");
  setShowForm(true);
};

const showFeedback = (message) => {
  setToast(message);
  window.clearTimeout(showFeedback.timer);
  showFeedback.timer = window.setTimeout(() => setToast(""), 2600);
};

const saveStudent = () => {
  if (!newStudent.name.trim() || !newStudent.email.trim()) {
    setFormError("Enter a student name and email address to continue.");
    return;
  }
  if (editingId) {
    setStudents((current) => current.map((student) => student.id === editingId ? {
      ...student,
      ...newStudent,
      attendance: `${Math.min(100, Math.max(0, Number(newStudent.attendance) || 0))}%`,
      performance: Math.min(100, Math.max(0, Number(newStudent.performance) || 0)),
      previousPerformance: Math.min(100, Math.max(0, Number(newStudent.previousPerformance) || 0)),
    } : student));
    showFeedback("Student details updated");
  } else {
    const student = { id: createStudentId(students), ...newStudent, performance: Math.min(100, Math.max(0, Number(newStudent.performance) || 0)), previousPerformance: Math.min(100, Math.max(0, Number(newStudent.previousPerformance) || 0)), attendance: `${Math.min(100, Math.max(0, Number(newStudent.attendance) || 0))}%` };
    setStudents((current) => [student, ...current]);
    setPage(1);
    showFeedback("Student added to the directory");
  }
  setShowForm(false);
};
  return (
    <div className="students-page">

      {/* HEADER */}
      <div className="students-header">
        <div>
          <span className="students-badge">STUDENT MANAGEMENT</span>
          <h1>Students</h1>
          <p>
            Manage student records, profiles and academic information.
          </p>
        </div>

        <button
          className="students-add-btn"
          onClick={openAddForm}
        >
          <Plus size={16} /> Add Student
        </button>
      </div>
      <div className="students-summary-grid"><div><span>Enrolled students</span><strong>{students.length}</strong><small>Across all programs</small></div><div><span>Active enrollment</span><strong>{students.filter((student) => student.status === "Active").length}</strong><small>Currently enrolled</small></div><div><span>Average attendance</span><strong>{students.length ? `${Math.round(students.reduce((sum, student) => sum + Number.parseInt(student.attendance || "0", 10), 0) / students.length)}%` : "—"}</strong><small>Across recorded students</small></div><div><span>Average performance</span><strong>{students.length ? `${Math.round(students.reduce((sum, student) => sum + Number(student.performance ?? 70), 0) / students.length)}%` : "—"}</strong><small>Used by Student Success AI</small></div></div>
      {showForm && (
  <div className="student-form-card">

    <div className="student-form-heading"><div><span className="students-badge">{editingId ? "UPDATE RECORD" : "NEW ENROLLMENT"}</span><h2>{editingId ? "Edit student" : "Add a student"}</h2></div><button className="student-form-close" aria-label="Close form" onClick={() => setShowForm(false)}><X size={18} /></button></div>

    <div className="student-form-grid">

      <input
        type="text"
        placeholder="Student Name"
        aria-label="Student name"
        value={newStudent.name}
        onChange={(e) =>
          setNewStudent({
            ...newStudent,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email Address"
        aria-label="Email address"
        value={newStudent.email}
        onChange={(e) =>
          setNewStudent({
            ...newStudent,
            email: e.target.value,
          })
        }
      />

      <select
        aria-label="Student branch"
        value={newStudent.course}
        onChange={(e) =>
          setNewStudent({
            ...newStudent,
            course: e.target.value,
          })
        }
      >
        <option>MCA</option>
        <option>BCA</option>
        <option>B.Tech</option>
        <option>B.Tech AI</option>
        <option>B.Tech CS AI</option>
        <option>CS IT</option>
      </select>

      <select
        value={newStudent.year}
        onChange={(e) =>
          setNewStudent({
            ...newStudent,
            year: e.target.value,
          })
        }
      >
        <option>1st Year</option>
        <option>2nd Year</option>
        <option>3rd Year</option>
        <option>4th Year</option>
      </select>

      <select aria-label="Enrollment status" value={newStudent.status} onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <label className="student-score-field">Attendance average (%)<input type="number" min="0" max="100" aria-label="Attendance average" value={newStudent.attendance} onChange={(event) => setNewStudent({ ...newStudent, attendance: event.target.value })} /></label>
      <label className="student-score-field">Current average (%)<input type="number" min="0" max="100" aria-label="Current average performance" value={newStudent.performance} onChange={(event) => setNewStudent({ ...newStudent, performance: event.target.value })} /></label>
      <label className="student-score-field">Previous average (%)<input type="number" min="0" max="100" aria-label="Previous average performance" value={newStudent.previousPerformance} onChange={(event) => setNewStudent({ ...newStudent, previousPerformance: event.target.value })} /></label>

    </div>

    {formError && <div className="student-form-error" role="alert">{formError}</div>}

    <div className="student-form-actions">

      <button
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>

      <button
        onClick={saveStudent}
      >
        {editingId ? "Save changes" : "Add student"}
      </button>

    </div>

  </div>
)}
      {/* SEARCH & FILTER */}
      <div className="students-toolbar">

        <div className="students-search">
            <Search size={17} />

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <select
  className="students-filter"
  value={courseFilter}
  onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
>
          <option>All Branches</option>
          <option>MCA</option>
          <option>BCA</option>
          <option>B.Tech</option>
          <option>B.Tech AI</option>
          <option>B.Tech CS AI</option>
          <option>CS IT</option>
        </select>

        <select
  className="students-filter"
  value={yearFilter}
  onChange={(e) => { setYearFilter(e.target.value); setPage(1); }}
>
          <option>All Years</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
        </select>

      </div>

      {/* STUDENTS TABLE */}
      <div className="students-card">

        <div className="students-card-header">
          <div>
            <h2>Student Records</h2>
            <p>
              {filteredStudents.length} students found
            </p>
          </div>
        </div>

        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {visibleStudents.length === 0 && <tr><td colSpan="9"><div className="students-empty-state"><span><Search size={19} /></span><strong>No students found</strong><p>Try another search term or clear your filters.</p><button onClick={() => { setSearch(""); setCourseFilter("All Branches"); setYearFilter("All Years"); }}>Clear filters</button></div></td></tr>}

              {visibleStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <strong>{student.id}</strong>
                  </td>

                  <td>
                    <div className="student-name">
                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>

                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>{student.email}</td>

                  <td>{student.course}</td>

                  <td>{student.year}</td>

                  <td><span className={`student-attendance ${Number.parseInt(student.attendance, 10) >= 90 ? "good" : "watch"}`}>{student.attendance}</span></td>
                  <td><span className={`student-attendance ${Number(student.performance ?? 70) >= 60 ? "good" : "watch"}`}>{student.performance ?? 70}%</span></td>

                  <td>
                    <span
                      className={`student-status ${
                        student.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>

                    <div className="student-actions">

                      <button
                        title="View Student"
                        aria-label={`View ${student.name}`}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        title="Edit Student"
                        aria-label={`Edit ${student.name}`}
                        onClick={() => openEditForm(student)}
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        title="Delete Student"
                        aria-label={`Delete ${student.name}`}
                        onClick={() => setDeletingStudent(student)}
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="students-pagination"><span>Showing {filteredStudents.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredStudents.length)} of {filteredStudents.length} students</span><div><button aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={16} /></button><span>Page {page} of {pageCount}</span><button aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}><ChevronRight size={16} /></button></div></div>

      </div>
      {selectedStudent && (
  <div className="student-modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedStudent(null); }}>
    <section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-dialog-title">

      <button
        className="student-modal-close"
        aria-label="Close student details"
        onClick={() => setSelectedStudent(null)}
      >
        ×
      </button>

      <div className="student-modal-avatar">
        {selectedStudent.name.charAt(0)}
      </div>

      <h2 id="student-dialog-title">{selectedStudent.name}</h2>
      <p className="student-modal-id">
        {selectedStudent.id}
      </p>

      <div className="student-modal-details">
        <div>
          <span>Email</span>
          <strong>{selectedStudent.email}</strong>
        </div>

        <div>
          <span>Branch</span>
          <strong>{selectedStudent.course}</strong>
        </div>

        <div>
          <span>Year</span>
          <strong>{selectedStudent.year}</strong>
        </div>

        <div><span>Attendance</span><strong>{selectedStudent.attendance}</strong></div>
        <div><span>Current average</span><strong>{selectedStudent.performance ?? 70}%</strong></div>
        <div><span>Previous average</span><strong>{selectedStudent.previousPerformance ?? selectedStudent.performance ?? 70}%</strong></div>

        <div>
          <span>Status</span>
          <strong>{selectedStudent.status}</strong>
        </div>
      </div>

    </section>
  </div>
)}
      {deletingStudent && <div className="student-modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeletingStudent(null); }}><section className="student-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-student-title"><span className="student-confirm-icon"><Trash2 size={19} /></span><h2 id="delete-student-title">Remove this student?</h2><p><strong>{deletingStudent.name}</strong> will be removed from this local student list.</p><div className="student-confirm-actions"><button onClick={() => setDeletingStudent(null)}>Keep student</button><button onClick={() => { setStudents((current) => current.filter((student) => student.id !== deletingStudent.id)); setDeletingStudent(null); showFeedback("Student removed from the directory"); }}>Remove student</button></div></section></div>}
      {toast && <div className="students-toast" role="status"><span>✓</span>{toast}</div>}
    </div>
  );
}

export default Students;
