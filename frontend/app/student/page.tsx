"use client";
import { useEffect, useState } from 'react';

const fetchStats = async (endpoint: string) => {
  try {
    const response = await fetch(`http://localhost:5001/api/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};

export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [coursesData, studentsData, staffData, departmentsData] = await Promise.all([
        fetchStats('courses'),
        fetchStats('students'),
        fetchStats('staffs'),
        fetchStats('departments')
      ]);
      setCourses(coursesData);
      setStudents(studentsData);
      setStaff(staffData);
      setDepartments(departmentsData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Courses</h2>
        <p className="text-2xl font-bold">{courses.length}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Students</h2>
        <p className="text-2xl font-bold">{students.length}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Staff</h2>
        <p className="text-2xl font-bold">{staff.length}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Departments</h2>
        <p className="text-2xl font-bold">{departments.length}</p>
      </div>

      {/* Additional Statistics */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Active Enrollments</h2>
        <p className="text-2xl font-bold">
          {/* Add logic to calculate the number of active enrollments */}
          {/* Example: {activeEnrollments.length} */}
        </p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Upcoming Assessments</h2>
        <p className="text-2xl font-bold">
          {/* Add logic to calculate the number of upcoming assessments */}
          {/* Example: {upcomingAssessments.length} */}
        </p>
      </div>
    </div>
  );
}
