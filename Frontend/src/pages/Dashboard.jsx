import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios.get("http://localhost:5000/api/course", {
      headers: { Authorization: token }
    })
    .then(res => setCourses(res.data))
    .catch(() => navigate("/login"));
  }, []);

  return (
    <div style={{ width: "600px", margin: "50px auto" }}>
      <h2>My Courses</h2>

      <button onClick={() => navigate("/generate")}>
        + Generate New Course
      </button>

      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <b>{course.prompt}</b>
            <br />
            Status: {course.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
