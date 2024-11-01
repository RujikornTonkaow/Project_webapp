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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
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

app.get('/api/time', function (req, res) {
  db.query("SELECT * FROM timedb_dtp", function (err, result, fields) {
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

app.get('/tableforbooking', function (req, res) {
  db.query("SELECT table_no, day, time_in, time_out FROM timedb_dtp", function (err, result) {
    if (err) {
      return res.status(400).send('Not found');
    }
    res.send(result); // Send the query results to the frontend
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
      console.log("Hashed Password:", hashedPassword);
      res.status(200).json({ message: "User registered successfully!" });
    });
  });
});


app.post('/login', (req, res) => {
  const { user, password } = req.body;
  console.log('Username:', user, 'Password:', password);

  if (!user || !password) {
    return res.status(400).json({ error: 'Please provide both username and password' });
  }

  const query = 'SELECT * FROM userdb_dtp WHERE BINARY user = ?';
  db.query(query, [user], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = results[0];
    const storedHashedPassword = userData.password;
    console.log('Stored hashed password from DB:', storedHashedPassword);
    // Debugging
    console.log('Input password:', password); // Log input password

    // เปรียบเทียบรหัสผ่าน
    bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
      console.log('Stored hashed password:', storedHashedPassword); // Log hashed password from DB
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log('Password match:', isMatch); // Log result of comparison
      if (isMatch) {
        return res.status(200).json({
          message: 'Login successful',
          user: userData.user,
          role: userData.role,
          tel: userData.tel
        });
      } else {
        return res.status(401).json({ error: 'Incorrect password' });
      }
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

app.get('/configmenu', function (req, res) {
  db.query("SELECT * FROM menudb_dtp", function (err, result) {
    if (err) {
      return res.status(400).send('Not found');
    }
    res.status(200).json(result); // Send the query results to the frontend
  });
});

app.put('/updateMenuStatus/:id', async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;
  console.log(`Updating menu with ID: ${id}, New status: ${status}`);
  try {
    db.query("UPDATE menudb_dtp SET status=? WHERE id=? ", [status, id], (err, result) => {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Menu not found' });
      }
      res.json({ message: 'Menu status updated successfully', id: id, status: status });

    })

  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ message: error.message });
  }
});
// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
