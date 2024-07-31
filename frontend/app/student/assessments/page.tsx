"use client";
import { useEffect, useState } from 'react';

interface Assessment {
  assessment_id: number;
  course_id: number;
  assessment_type: string;
  title: string;
  description: string;
  due_date: string;
}

interface Submission {
  submission_id: number;
  assessment_id: number;
  student_id: number;
  submission_date: string;
  submission_grade: number;
  feedback: string;
}

export default function Assessments() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(null);
  const [submissionText, setSubmissionText] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  // Fetch assessments
  const fetchAssessments = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/assessments');
      const data = await response.json();
      setAssessments(data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  // Submit assessment
  const submitAssessment = async () => {
    if (selectedAssessment === null) {
      setMessage('Please select an assessment.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessment_id: selectedAssessment,
          student_id: 1, // Replace with actual student ID
          submission_date: new Date().toISOString().split('T')[0],
          submission_grade: 0, // Adjust based on actual submission
          feedback: submissionText,
        }),
      });
      if (response.ok) {
        setMessage('Submission successful!');
        fetchSubmissions(); // Refresh submissions
        setSubmissionText(''); // Clear input
        setSelectedAssessment(null); // Reset selection
      } else {
        setMessage('Error submitting assessment.');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setMessage('Error submitting assessment.');
    }
  };

  useEffect(() => {
    fetchAssessments();
    fetchSubmissions();
  }, []);

  return (
    <div className="p-6 z-40">
      <h1 className="text-2xl font-bold mb-4">Assessments</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.assessment_id} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{assessment.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{assessment.description}</p>
            <p className="text-sm text-gray-500">Due Date: {new Date(assessment.due_date).toLocaleDateString()}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={() => setSelectedAssessment(assessment.assessment_id)}
            >
              Select for Submission
            </button>
          </div>
        ))}
      </div>

      {selectedAssessment !== null && (
        <div className="bg-white p-6 shadow rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Submit Assessment</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            rows={4}
            placeholder="Write your submission here..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={submitAssessment}
          >
            Submit
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Submissions</h2>
      <div className="bg-white p-4 shadow rounded-lg">
        {submissions.length > 0 ? (
          <ul>
            {submissions.map((submission) => (
              <li key={submission.submission_id} className="mb-2">
                Assessment ID: {submission.assessment_id} - Grade: {submission.submission_grade} - Feedback: {submission.feedback}
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not submitted any assessments yet.</p>
        )}
      </div>
    </div>
  );
}
