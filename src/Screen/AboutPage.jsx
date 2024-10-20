import React, { useEffect, useState } from 'react';
import './Style/aboutpage.css';
import { useNavigate } from 'react-router-dom';

const DPTRestaurant = () => {
    const navigate = useNavigate(); // Initialize the navigate hook
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showLogout, setShowLogout] = useState(false);

    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };
    // State สำหรับควบคุมการแสดงปุ่ม Logout
    

    // ฟังก์ชันจัดการการคลิกเพื่อแสดงปุ่ม Logout
    const toggleLogout = () => {
        setShowLogout(!showLogout);
    };

    // ฟังก์ชันจัดการ Logout
    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        // นำทางกลับไปหน้า login
        navigate('/login');
    };
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำทางไปที่หน้า login
            // navigate('/login');
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
                {/* <div className="chef-tag">
                    <span>Ruijkorn Imtrakun</span>
                </div> */}
                {/* <button className="home-tag">{userData.user}</button> */}
                     {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                     <button className="home-tag" onClick={toggleLogout}>
                        {userData.user|| "LOGIN"}
                    </button>
                    {showLogout && (
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
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

export default DPTRestaurant;
