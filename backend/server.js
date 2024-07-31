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

app.get('/api/students', (req, res) => {
    const sql = 'SELECT student_id, first_name, last_name, email, date_of_birth FROM Students';
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  });
  
  app.get('/api/staffs', (req, res) => {
    const sql = 'SELECT staff_id, first_name, last_name, email, date_of_birth FROM Staff';
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(result);
    });
  });

// API endpoint to get detailed student info by ID
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

// API endpoint to get detailed staff info by ID
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
