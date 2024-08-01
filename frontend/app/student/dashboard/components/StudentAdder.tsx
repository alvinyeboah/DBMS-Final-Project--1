"use client";
import { useState, useEffect } from 'react';

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    date_of_birth: ''
  });
  const [message, setMessage] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (response.ok) {
        setMessage('Student added successfully!');
        fetchStudents();
      } else {
        setMessage('Error adding student.');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setMessage('Error adding student.');
    }
  };

  const deleteStudent = async (studentId: number) => {
    try {
      const response = await fetch(`http://localhost:5001/api/students/${studentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage('Student deleted successfully!');
          fetchStudents(); // Refresh the student list
        } else {
          setMessage('Error deleting student.');
        }
      } else {
        const errorText = await response.text();
        setMessage(`Error deleting student: ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      setMessage('Error deleting student.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 z-40">
      <h1 className="text-2xl font-bold mb-4">Student Manager</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.first_name}
          onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.last_name}
          onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={newStudent.password}
          onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={newStudent.date_of_birth}
          onChange={(e) => setNewStudent({ ...newStudent, date_of_birth: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={addStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">All Students</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student.student_id} className="mb-2 flex items-center justify-between">
                {student.first_name} {student.last_name} - {student.email}
                <button
                  onClick={() => deleteStudent(student.student_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
}
