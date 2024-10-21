import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ใช้สำหรับดึงข้อมูลโต๊ะจาก state
import './Style/tablebooking.css';
import Axios from 'axios';

const TableBooking = () => {
    const location = useLocation();
    const { table ,day ,time , time_end } = location.state || {}; // ดึงข้อมูลโต๊ะที่เลือกจาก state
    
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [form, setForm] = useState({
        day: day ,
        time: time  ,
        table: table ,
        time_end: time_end
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
        console.log(form);
    };
    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำทางไปที่หน้า login
            navigate('/first');
        }
    }, [navigate]);
    // ฟังก์ชันจัดการการคลิกเพื่อแสดงปุ่ม Logout
    const toggleDropdown = () => {
        if (userData.user) {
            // ถ้ามีข้อมูลผู้ใช้ให้แสดง dropdown
            setShowDropdown(!showDropdown);
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ให้ไปหน้า login
            navigate('/login');
        }
    };
    const goToAccount = () => {
        navigate('/account');
    };
    const goToBookingHistory = () => {
        navigate('/detailbooking');
    };
    // ฟังก์ชันจัดการ Logout
    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        // นำทางกลับไปหน้า login
        navigate('/first');
    };
    const handleSuccess = () => {

        Axios.post('http://localhost:5000/tablebooking', {
            table_no : form.table,
            user: userData.user,
            tel: userData.tel,
            day: form.day, 
            time_in: form.time, 
            time_out: form.time_end
     
        }).then((response) => {
            alert("Success ");
            navigate('/detailbooking');
            
        }).catch((error) => {
            console.error("Error registering user:", error);
            alert("Error registering user.");
        });
        


    }




    return (
        <div className="table-booking-container">
            <nav className="navbarbooking">
                <div className="logo-booking">DPT Restaurant</div>
                <ul className="navLink-booking">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
                {/* <button className="home-tag">{userData.user}</button> */}
                {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                <div className="dropdown-booking">
                    <button className="booking-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownbooking-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="table-booking-form">
                <h2>Reserve a Table</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.user}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Table</label>
                        <input
                            type="text"
                            name="table"
                            value={form.table}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Day</label>
                        <input
                            type="date"
                            name="day"
                            value={form.day}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.tel}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleSuccess}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TableBooking;
