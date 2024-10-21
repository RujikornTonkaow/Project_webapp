import React, { useState, useEffect } from 'react';
import './Style/homepage.css';
import { useNavigate, useLocation } from 'react-router-dom';

function HomePage() {
    // const username = "Rujikorn Limtrakul"; // Example username
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    // const location = useLocation();
    // const { name } = location.state || {};
    // const { user, tel, role } = location.state || {};
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
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

    return (
        <div className="home-header">
            {/* Navigation Bar */}
            {/* <div className="headerContent"> */}
            {/*<div className="logoColumn">
                    <h1 className="logo">DPT Restaurant</h1>
                </div> */}
            <nav className="navbar-home">
                <div className="logo-home">DPT Restaurant</div>
                <ul className="navlink-home">
                    <li className="navItem"><a href="#home" className='active' onClick={() => handleNavClick('/homepage')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
                {/* <button className="home-tag">{userData.user}</button> */}
                {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                <div className="dropdown-home">
                    <button className="home-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownhome-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            {/* <div className="userColumn">
                    <span className="username">{username}</span>
                </div> */}

            {/* </div> */}
            <section
                className="heroSection-home"
            >
                
                <div className="heroContent-home">
                    <h2 className="welcomeText-home">Welcome to</h2>
                    <p className="restaurantName">DPT Restaurant</p>
                    <button className="booking-button" onClick={() => handleNavClick('/settime')}>
                        Booking
                        {/* <span className="srOnly">Access your account</span> */}
                    </button>
                    
                </div>
                <div className="overlay"></div>
                
            </section>
        </div>
    );
};

export default HomePage;
