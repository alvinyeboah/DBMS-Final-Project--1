const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thyme84?pro',
  database: 'EduGhana'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Fetch students
app.get('/api/students', (req, res) => {
  const sql = 'SELECT student_id, first_name, last_name, email, date_of_birth FROM Students';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch staffs
app.get('/api/staffs', (req, res) => {
  const sql = 'SELECT staff_id, first_name, last_name, email, date_of_birth FROM Staff';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch detailed student info by ID
app.get('/api/student/:id', (req, res) => {
  const studentId = req.params.id;
  const sql = 'SELECT * FROM Students WHERE student_id = ?';
  db.query(sql, [studentId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result[0]);
  });
});

// Fetch detailed staff info by ID
app.get('/api/staff/:id', (req, res) => {
  const staffId = req.params.id;
  const sql = 'SELECT * FROM Staff WHERE staff_id = ?';
  db.query(sql, [staffId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result[0]);
  });
});

// Fetch courses
app.get('/api/courses', (req, res) => {
  const sql = 'SELECT course_id, course_name, course_description FROM Courses';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch enrollments
app.get('/api/enrollments', (req, res) => {
  const sql = `
    SELECT 
      e.enrollment_id, 
      s.first_name AS student_name, 
      c.course_name, 
      e.enrollment_date, 
      e.status 
    FROM Enrollments e
    JOIN Students s ON e.student_id = s.student_id
    JOIN Courses c ON e.course_id = c.course_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch discussions
app.get('/api/discussions', (req, res) => {
  const sql = `
    SELECT 
      d.discussion_id, 
      d.course_id, 
      d.title, 
      d.content, 
      d.created_by, 
      d.created_at, 
      d.updated_at, 
      s.first_name AS created_by_first_name, 
      s.last_name AS created_by_last_name 
    FROM Discussions d
    JOIN Staff s ON d.created_by = s.staff_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch discussion replies
app.get('/api/discussion-replies/:discussionId', (req, res) => {
  const { discussionId } = req.params;
  const sql = `
    SELECT 
      dr.reply_id, 
      dr.discussion_id, 
      dr.staff_id, 
      dr.content, 
      dr.created_at, 
      dr.updated_at, 
      s.first_name AS staff_first_name, 
      s.last_name AS staff_last_name 
    FROM Discussion_Replies dr
    JOIN Staff s ON dr.staff_id = s.staff_id
    WHERE dr.discussion_id = ?
  `;
  db.query(sql, [discussionId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch assessments
app.get('/api/assessments', (req, res) => {
  const sql = `
    SELECT 
      a.assessment_id, 
      c.course_name, 
      a.assessment_type, 
      a.title, 
      a.description, 
      a.due_date 
    FROM Assessments a
    JOIN Courses c ON a.course_id = c.course_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch grades
app.get('/api/grades', (req, res) => {
  const sql = `
    SELECT 
      g.gradebook_id, 
      c.course_name, 
      s.first_name AS student_name, 
      a.title AS assessment_title, 
      g.final_grade, 
      g.graded_at 
    FROM Gradebook g
    JOIN Courses c ON g.course_id = c.course_id
    JOIN Students s ON g.student_id = s.student_id
    JOIN Assessments a ON g.assessment_id = a.assessment_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch replies
app.get('/api/replies', (req, res) => {
  const sql = `
    SELECT 
      dr.reply_id, 
      dr.discussion_id, 
      dr.staff_id, 
      dr.content, 
      dr.created_at, 
      dr.updated_at, 
      s.first_name AS staff_first_name, 
      s.last_name AS staff_last_name 
    FROM Discussion_Replies dr
    JOIN Staff s ON dr.staff_id = s.staff_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Fetch submissions
app.get('/api/submissions', (req, res) => {
  const sql = `
    SELECT 
      sub.submission_id, 
      sub.assessment_id, 
      sub.student_id, 
      sub.content, 
      sub.submitted_at, 
      sub.grade, 
      sub.feedback, 
      s.first_name AS student_first_name, 
      s.last_name AS student_last_name, 
      a.title AS assessment_title 
    FROM Submissions sub
    JOIN Students s ON sub.student_id = s.student_id
    JOIN Assessments a ON sub.assessment_id = a.assessment_id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// POST endpoint for adding a new discussion
app.post('/api/discussions', (req, res) => {
  const { course_id, title, content, created_by } = req.body;
  const sql = 'INSERT INTO Discussions (course_id, title, content, created_by, created_at) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [course_id, title, content, created_by], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, discussion_id: result.insertId });
  });
});

// POST endpoint for adding a new reply
app.post('/api/replies', (req, res) => {
  const { discussion_id, staff_id, content } = req.body;
  const sql = 'INSERT INTO Discussion_Replies (discussion_id, staff_id, content, created_at) VALUES (?, ?, ?, NOW())';
  db.query(sql, [discussion_id, staff_id, content], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, reply_id: result.insertId });
  });
});

// POST endpoint for adding a new submission
// POST endpoint for adding a new submission
app.post('/api/submissions', (req, res) => {
  const { assessment_id, student_id, submission_date, submission_grade, feedback } = req.body;
  const sql = 'INSERT INTO Submissions (assessment_id, student_id, submission_date, submission_grade, feedback) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [assessment_id, student_id, submission_date, submission_grade, feedback], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, submission_id: result.insertId });
  });
});


// POST endpoint for adding a new enrollment
app.post('/api/enrollments', (req, res) => {
  const { student_id, course_id, enrollment_date, status } = req.body;
  const sql = 'INSERT INTO Enrollments (student_id, course_id, enrollment_date, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [student_id, course_id, enrollment_date, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, enrollment_id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
