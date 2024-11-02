import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/settime.css';

const SetTime = () => {

    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [form, setForm] = useState({
        day: '',
        time: '',
        time_end: ''
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);

    };
    const handleTable = () => {
        if (form.day === '' || form.time === '') {
            alert('กรุณาใส่วันกับเวลาให้ครบ')
        }

        else {
            const [hours, minutes] = form.time.split(":").map(Number);
            const additionalHours = 2; // จำนวนชั่วโมงที่จะบวก

            // บวกชั่วโมง
            const totalHours = hours + additionalHours;
            const newHours = totalHours % 24; // ใช้ % 24 เพื่อป้องกันการเกิน 24 ชั่วโมง

            console.log(typeof form.day, typeof form.time, newHours, minutes);
            navigate('/tablepage', { state: { day: form.day, time: form.time, time_end: `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` } });
        }
    };



    const handleNavClick = (path) => {
        navigate(path);
    };


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            navigate('/first');
        }
    }, [navigate]);
    const toggleDropdown = () => {
        if (userData.user) {
            // ถ้ามีข้อมูลผู้ใช้ให้แสดง dropdown
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
        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        navigate('/first');
    };

    return (
        <div className="settime-container">
            <nav className="navbarsettime">
                <div className="logo-settime">DPT Restaurant</div>
                <ul className="navLink-settime">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
                <div className="dropdown-settime">
                    <button className="settime-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownsettime-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="settime-form">
                <h2>Reserve a Table</h2>
                <form onSubmit={handleSubmit}>
                    <div className="settime-group">
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
                    <button type="submit" className="submit-btn" onClick={handleTable}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetTime;
