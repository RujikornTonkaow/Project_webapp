import React, { useEffect, useState } from 'react';
import './Style/aboutpage.css';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showDropdown, setShowDropdown] = useState(false);
    const handleNavClick = (path) => {
        navigate(path);
    };
    const toggleDropdown = () => {
        if (userData.user) {
            setShowDropdown(!showDropdown);
        } else {
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
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
        }
    }
        , [navigate]);
    return (
        <div className="about-container">

            <nav className="navbar">
                <div className="nav-logo">DPT Restaurant</div>

                <ul className="nav-links">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" className='active' onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
                <div className="dropdown-about">
                    <button className="about-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownabout-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="dpt-content">
                <h1>DPT Restaurant</h1>
                <p>
                    ร้าน <span className="highlight">DPT Restaurant</span> สุดหรูสไตล์ฝรั่งเศสที่พร้อมมอบประสบการณ์
                    การรับประทานอาหารสุดพิเศษให้กับคุณลูกค้าของเรา จากฝีมือการปรุงอาหารของเชฟมืออาชีพที่มีประสบการณ์เป็นเชฟมาอย่างยาวนาน
                    และมีชื่อเสียง พร้อมกับบรรยากาศร้านสุดพิเศษที่ท่านจะประทับใจ และ ไม่มีวันลืม
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
