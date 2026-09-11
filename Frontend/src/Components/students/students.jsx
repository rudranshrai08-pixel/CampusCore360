import { useState } from "react";
import "./students.css";
function Students() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [yearFilter, setYearFilter] = useState("All Years");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

const [newStudent, setNewStudent] = useState({
  name: "",
  email: "",
  course: "MCA",
  year: "1st Year",
  status: "Active",
});
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Mayank Shakya",
      email: "mayank@campuscore360.com",
      course: "MCA",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: "STU002",
      name: "Ankit Kumar",
      email: "ankit@campuscore360.com",
      course: "BCA",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: "STU003",
      name: "Priya Singh",
      email: "priya@campuscore360.com",
      course: "MCA",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: "STU004",
      name: "Babulal Yadav",
      email: "babulal@campuscore360.com",
      course: "B.Tech",
      year: "3rd Year",
      status: "Inactive",
    },
  ]);

 const filteredStudents = students.filter((student) => {
  const matchesSearch =
    `${student.name} ${student.email} ${student.id} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCourse =
    courseFilter === "All Courses" ||
    student.course === courseFilter;

  const matchesYear =
    yearFilter === "All Years" ||
    student.year === yearFilter;

  return matchesSearch && matchesCourse && matchesYear;
});
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
          onClick={() => setShowForm(true)}
        >
          ＋ Add Student
        </button>
      </div>
      {showForm && (
  <div className="student-form-card">

    <h2>Add New Student</h2>

    <div className="student-form-grid">

      <input
        type="text"
        placeholder="Student Name"
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
        value={newStudent.email}
        onChange={(e) =>
          setNewStudent({
            ...newStudent,
            email: e.target.value,
          })
        }
      />

      <select
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

    </div>

    <div className="student-form-actions">

      <button
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>

      <button
        onClick={() => {
          if (!newStudent.name.trim() || !newStudent.email.trim()) {
            alert("Please enter student name and email.");
            return;
          }

          const student = {
            id: `STU${String(students.length + 1).padStart(3, "0")}`,
            ...newStudent,
          };

          setStudents([...students, student]);

          setNewStudent({
            name: "",
            email: "",
            course: "MCA",
            year: "1st Year",
            status: "Active",
          });

          setShowForm(false);
        }}
      >
        Add Student
      </button>

    </div>

  </div>
)}
      {/* SEARCH & FILTER */}
      <div className="students-toolbar">

        <div className="students-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
  className="students-filter"
  value={courseFilter}
  onChange={(e) => setCourseFilter(e.target.value)}
>
          <option>All Courses</option>
          <option>MCA</option>
          <option>BCA</option>
          <option>B.Tech</option>
        </select>

        <select
  className="students-filter"
  value={yearFilter}
  onChange={(e) => setYearFilter(e.target.value)}
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
                <th>Course</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

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
                        onClick={() => setSelectedStudent(student)}
                      >
                        👁
                      </button>

                      <button
                        title="Edit Student"
                        onClick={() =>
                          alert(`Editing ${student.name}`)
                        }
                      >
                        ✏
                      </button>

                      <button
                        title="Delete Student"
                        onClick={() =>
                          alert(`Delete ${student.name}`)
                        }
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
      {selectedStudent && (
  <div className="student-modal-overlay">
    <div className="student-modal">

      <button
        className="student-modal-close"
        onClick={() => setSelectedStudent(null)}
      >
        ×
      </button>

      <div className="student-modal-avatar">
        {selectedStudent.name.charAt(0)}
      </div>

      <h2>{selectedStudent.name}</h2>
      <p className="student-modal-id">
        {selectedStudent.id}
      </p>

      <div className="student-modal-details">
        <div>
          <span>Email</span>
          <strong>{selectedStudent.email}</strong>
        </div>

        <div>
          <span>Course</span>
          <strong>{selectedStudent.course}</strong>
        </div>

        <div>
          <span>Year</span>
          <strong>{selectedStudent.year}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{selectedStudent.status}</strong>
        </div>
      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default Students;