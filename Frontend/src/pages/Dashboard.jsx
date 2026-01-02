import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Fetch user info
    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: token }
    })
    .then(res => setUser(res.data))
    .catch(() => navigate("/login"));

    // Fetch courses
    axios.get("http://localhost:5000/api/courses", {
      headers: { Authorization: token }
    })                                                                
    .then(res => {
      setCourses(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch courses:", err);
      setLoading(false);
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CourseCrafter AI</h1>
              {user && <p className="text-sm text-gray-600">Welcome, {user.name}</p>}
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
            <p className="text-gray-600 text-sm">Manage your generated courses</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
            + New Course
          </button>
        </div>

        {/* Courses Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-600 mb-6">Start by generating your first course</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
              Generate Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div 
                key={course._id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">📖</div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    course.status === "completed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {course.status === "completed" ? "Completed" : "Processing"}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {course.title || "Untitled Course"}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.prompt}
                </p>
                
                {course.analysis && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.analysis.subject && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {course.analysis.subject}
                      </span>
                    )}
                    {course.analysis.level && (
                      <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                        {course.analysis.level}
                      </span>
                    )}
                  </div>
                )}
                
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm">
                  View Course
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
