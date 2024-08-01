"use client";
import { useEffect, useState } from 'react';

interface Grade {
  gradebook_id: number;
  course_name: string;
  student_name: string;
  assessment_title: string;
  final_grade: number;
  graded_at: string;
}

export default function Grades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGrades() {
      try {
        const response = await fetch('http://localhost:5001/api/grades');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setError('Failed to fetch grades');
      } finally {
        setLoading(false);
      }
    }

    fetchGrades();
  }, []);

  if (loading) {
    return <div className="p-6 flex justify-center items-center text-gray-500">Loading grades...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600 bg-red-100 border border-red-300 rounded-lg">{error}</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-white4">Grades</h1>
      {grades.length === 0 ? (
        <p className="text-center text-gray-600">No grades available.</p>
      ) : (
        <ul className="space-y-4">
          {grades.map((grade) => (
            <li key={grade.gradebook_id} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">{grade.course_name}</h2>
                <span className="text-sm text-gray-500">{new Date(grade.graded_at).toLocaleDateString()}</span>
              </div>
              <p className="text-lg font-medium text-gray-800 mb-2">
                <strong>Student:</strong> {grade.student_name}
              </p>
              <p className="text-lg font-medium text-gray-800 mb-2">
                <strong>Assessment:</strong> {grade.assessment_title}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Grade:</strong> {grade.final_grade}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
