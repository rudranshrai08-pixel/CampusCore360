import { useState } from "react";
import "./students.css";
function Students() {
  const [search, setSearch] = useState("");

  const students = [
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
  ];

  const filteredStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.id} ${student.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          onClick={() => alert("Add Student form coming next.")}
        >
          ＋ Add Student
        </button>
      </div>

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

        <select className="students-filter">
          <option>All Courses</option>
          <option>MCA</option>
          <option>BCA</option>
          <option>B.Tech</option>
        </select>

        <select className="students-filter">
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
                        onClick={() =>
                          alert(`Viewing ${student.name}`)
                        }
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

    </div>
  );
}

export default Students;