import React, { useState, useEffect } from 'react';
import './Style/tablepage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TablePage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
  const location = useLocation();
  const { day, time, time_end } = location.state || {};
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookedTables, setBookedTables] = useState([]); // เก็บโต๊ะที่ถูกจอง

  const handleNavClick = (path) => {
    navigate(path); // Navigate to the given path
  };

  const handleTableClick = (table) => {
    // ส่งข้อมูลโต๊ะที่เลือกไปยังหน้า TableBooking พร้อมกับข้อมูล state
    console.log(table, day, time, time_end);
    navigate('/tablebooking', { state: { table, day, time, time_end } });
  };

  const toggleDropdown = () => {
    if (userData.user) {
      setShowDropdown(!showDropdown);
    } else {
      navigate('/login');
    }
  };
  const goToAccount = () => {
    navigate('/account');
  };
  const goToBookingHistory = () => {
    navigate('/detailbooking');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/first');
  };

  // ฟังก์ชันดึงข้อมูลโต๊ะที่ถูกจอง
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      navigate('/first');
    }

    // ดึงข้อมูลการจองจาก API หรือฐานข้อมูล
    const fetchBookedTables = async () => {
      // ดึงข้อมูลการจองของวันและช่วงเวลาที่กำหนด
      // ตัวอย่างการดึงข้อมูลการจอง
      const response = await axios.get('http://localhost:5000/tableforbooking');
      const bookings = response.data;
      const newBookings = bookings.map(booking => ({
        table: booking.table_no,
        day: booking.day,
        time: booking.time_in,
        time_end: booking.time_out
      }));
      console.log(bookings);
      // const bookings = [
      //   { table: 'A-01', day: '2024-10-22', time: '18:00', time_end: '20:00' },
      //   { table: 'B-02', day: '2024-10-22', time: '19:00', time_end: '21:00' },
      // ];

      const filteredBookings = newBookings.filter(
        (booking) =>
          booking.day === day &&
          ((time >= booking.time && time <= booking.time_end) ||
            (time_end >= booking.time_ && time_end <= booking.time_end))
      );
      setBookedTables(filteredBookings.map((b) => b.table));
    };

    fetchBookedTables();
  }, [day, time, time_end, navigate]);

  return (
    <div className="TablePage">
      <nav className="navbarTable">
        <div className="logo-table">DPT Restaurant</div>
        <ul className="navLink-table">
          <li className="navItem">
            <a href="#home" onClick={() => handleNavClick('/home')}>Home</a>
          </li>
          <li className="navItem">
            <a href="#about" onClick={() => handleNavClick('/about')}>About</a>
          </li>
          <li className="navItem">
            <a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a>
          </li>
          <li className="navItem">
            <a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a>
          </li>
          <li className="navItem">
            <a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table Booking</a>
          </li>
        </ul>
        <div className="dropdown-table">
          <button className="table-tag" onClick={toggleDropdown}>
            {userData.user || "LOGIN"}
          </button>

          {showDropdown && (
            <div className="dropdowntable-menu">
              <ul>
                <li onClick={goToAccount}>Account</li>
                <li onClick={goToBookingHistory}>Booking History</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div className="table-reservation">
        <h2>Reserve a Table</h2>
        <div className="table-grid">
          {['A-01', 'A-02', 'A-03', 'A-04', 'B-01', 'B-02', 'B-03', 'B-04',
            'C-01', 'C-02', 'C-03', 'C-04', 'D-01', 'D-02', 'D-03', 'D-04',
            'VIP-01', 'VIP-02'].map((table) => (
              <button
                key={table}
                className={`tableButton ${bookedTables.includes(table) ? 'booked' : ''}`} // เปลี่ยนสีถ้าถูกจอง
                onClick={() => handleTableClick(table)}
                disabled={bookedTables.includes(table)} // ปิดการทำงานถ้าถูกจอง
              >
                {table}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TablePage;
