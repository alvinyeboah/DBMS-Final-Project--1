// components/Courses.tsx
"use client";
import { useEffect, useState } from 'react';

interface Course {
  course_id: number;
  course_name: string;
  course_description: string;
}

interface Enrollment {
  enrollment_id: number;
  course_id: number;
  student_id: number;
  enrollment_date: string;
  status: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch available courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch current enrollments
  const fetchEnrollments = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/enrollments');
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  // Enroll in a course
  const enrollInCourse = async (courseId: number) => {
    try {
      const response = await fetch('http://localhost:5001/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: courseId, status: 'Enrolled' }) // Add user ID here if needed
      });
      if (response.ok) {
        setMessage('Successfully enrolled in the course!');
        fetchEnrollments(); // Refresh enrollments
      } else {
        setMessage('Error enrolling in the course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setMessage('Error enrolling in the course.');
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.course_id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{course.course_name}</h2>
            <p className="text-sm text-gray-600 mb-4">{course.course_description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => enrollInCourse(course.course_id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Enrollments</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        {enrollments.length > 0 ? (
          <ul>
            {enrollments.map((enrollment) => (
              <li key={enrollment.enrollment_id} className="mb-2">
                {/* Here you would typically fetch and display more course details */}
                Course ID: {enrollment.course_id} - Status: {enrollment.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>You are not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
}
