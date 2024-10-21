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
  port: 3306
});


// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});



app.get('/api/user', function (req, res) {
  db.query("SELECT * FROM userdb_dtp", function (err, result, fields) {
    if (err) {
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

app.get('/time', function (req, res) {
  db.query("SELECT * FROM timedb_dtp", function (err, result, fields) {
    if (err) {
      return res.status(400).send('Not found');
    }
    console.log(result);
    res.send(result);
  });
})

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


app.post('/login', (req, res) => {
  const { user, password } = req.body;

  // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
  const query = 'SELECT * FROM userdb_dtp WHERE BINARY user = ?';
  db.query(query, [user], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // const userData = results[0];
    const user = results[0].user;
    const tel = results[0].tel;
    const storedHashedPassword = results[0].password;
    // เปรียบเทียบรหัสผ่านกับ hash ที่เก็บไว้
    bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!isMatch) {
        res.status(200).json({
          message: 'Login successful',
          user: user,
          role: results[0].role,
          tel: tel
        });
      } else
        // ถ้ารหัสผ่านถูกต้อง ให้ส่งข้อมูล role กลับไป
        res.status(401).json({ message: 'Unauthorized' });
    });
  });
});

app.post("/tablebooking", (req, res) => {
  const { table_no, user, tel, day, time_in, time_out } = req.body;


  // คำสั่ง SQL ในการแทรกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
  const query = "INSERT INTO timedb_dtp (table_no , user , tel , day , time_in , time_out) VALUES (?, ?, ?, ?,?,?)";

  db.query(query, [table_no, user, tel, day, time_in, time_out], (err, results) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      return res.status(500).json({ error: "Failed to book table" });
    }

    res.status(200).json({ message: "Table booked successfully!" });
  });
});
// API สำหรับดึงข้อมูลการจองตามชื่อผู้ใช้
app.get('/api/bookings/:user', (req, res) => {
  const { user } = req.params;
  const query = "SELECT * FROM timedb_dtp WHERE user = ?";
  db.query(query, [user], (err, results) => {
    if (err) {
      console.error("Error fetching booking data:", err);
      return res.status(500).json({ error: "Failed to fetch booking data" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: "No bookings found" }); // ส่งสถานะ 404 ถ้าไม่มีข้อมูล
    }
    
    res.status(200).json(results);
  });
});

// API สำหรับลบการจองตาม id
app.delete('/api/delbookings/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM timedb_dtp WHERE id = ?'; // ใช้ '?' เพื่อป้องกัน SQL Injection

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      return res.status(500).json({ error: "Failed to delete booking" });
    }

    // ดึงข้อมูลการจองใหม่หลังจากลบเสร็จ
    db.query("SELECT * FROM timedb_dtp", (err, result) => {
      if (err) {
        return res.status(400).send('Not found any timedb_dtp');
      }
      res.send({ bookings: result, status: "ok" });
    });
  });
});
// });
app.get('/api/bookings/:id', function (req, res) {
  const id = req.params.id;
  db.query("SELECT *FROM timedb_dtp where id=" + id, function (err, result, fields) {
    if (err) throw err;
    let bookings = result;
    if (bookings.length > 0) {
      res.send(bookings);
    }
    else {
      res.status(400).send('Not found products for' + id);
    }
    console.log(result);
  });

});
// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
