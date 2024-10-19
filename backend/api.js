const bcrypt = require('bcrypt');
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// กำหนดค่าการเชื่อมต่อกับ MySQL
const db = mysql.createConnection({
    host: 'ddc.dumri.in.th',
    user: 'myadmin01',
    password: 'Go6AM0Hnv8jqer65',
    database: 'myadmin01',
    port:3306
  });
  

// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});



app.get('/api/user', function(req, res){
  db.query("SELECT * FROM userdb_dtp", function(err, result, fields){
    if(err) {
      return res.status(400).send('Not found');
    }
    console.log(result);
    res.send(result);
  });
})

app.get("/names", (req, res) => {
  const query = "SELECT user FROM userdb_dtp"; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Failed to retrieve data" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/phone", (req, res) => {
    const query = "SELECT tel FROM userdb_dtp"; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Failed to retrieve data" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get("/table", (req, res) => {
    const query = "SELECT table_no FROM timedb_dtp"; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Failed to retrieve data" });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.post("/register", (req, res) => {
    const { user, password, tel, role } = req.body;
  
    // ตรวจสอบว่าข้อมูลครบถ้วน
    if (!user || !password || !tel || !role) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }
  
    // Hash the password before storing it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Failed to register user" });
      }
  
      // คำสั่ง SQL ในการแทรกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
      const query = "INSERT INTO userdb_dtp (user, password, tel, role) VALUES (?, ?, ?, ?)";
  
      db.query(query, [user, hashedPassword, tel, role], (err, results) => {
        if (err) {
          console.error("Error inserting data into MySQL:", err);
          return res.status(500).json({ error: "Failed to register user" });
        }
        
        res.status(200).json({ message: "User registered successfully!" });
      });
    });
  });
//   app.post('/api/login', (req, res) => {
//     const { user, password } = req.body;

//     // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
//     const query = 'SELECT * FROM userdb_dtp WHERE user = ?';
//     db.query(query, [user], (err, results) => {
//         if (err) {
//             console.error('Error querying database:', err);
//             return res.status(500).json({ error: 'Database query failed' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const userData = results[0];

//         // เปรียบเทียบรหัสผ่านกับ hash ที่เก็บไว้
//         bcrypt.compare(password, userData.password, (err, isMatch) => {
//             if (err) {
//                 console.error('Error comparing passwords:', err);
//                 return res.status(500).json({ error: 'Error comparing passwords' });
//             }

//             if (!isMatch) {
//                 return res.status(401).json({ error: 'Invalid password' });
//             }

//             // ถ้ารหัสผ่านถูกต้อง ให้ส่งข้อมูล role กลับไป
//             res.status(200).json({ role: userData.role });
//         });
//     });
// });

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
