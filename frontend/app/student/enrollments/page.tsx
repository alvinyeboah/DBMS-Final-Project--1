// components/Enrollments.tsx
"use client";
import { useEffect, useState } from 'react';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const response = await fetch('http://localhost:5001/api/enrollments');
        const data = await response.json();
        setEnrollments(data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    }

    fetchEnrollments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Enrollments</h1>
      <ul className="mt-4">
        {enrollments.map((enrollment) => (
          <li key={enrollment.enrollment_id} className="border p-2 mb-2 rounded">
            <p><strong>Student:</strong> {enrollment.student_name}</p>
            <p><strong>Course:</strong> {enrollment.course_name}</p>
            <p><strong>Date:</strong> {enrollment.enrollment_date}</p>
            <p><strong>Status:</strong> {enrollment.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
