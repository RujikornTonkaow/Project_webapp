import React, { useEffect, useState } from 'react';
import './Style/adminaboutpage.css';
import { useNavigate } from 'react-router-dom';

const AdminAboutPage = () => {
    const navigate = useNavigate(); // Initialize the navigate hook
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showDropdown, setShowDropdown] = useState(false);
    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };
    // State สำหรับควบคุมการแสดงปุ่ม Logout


    // ฟังก์ชันจัดการการคลิกเพื่อแสดงปุ่ม Logout
    const toggleDropdown = () => {
        if (userData.user) {
            // ถ้ามีข้อมูลผู้ใช้ให้แสดง dropdown
            setShowDropdown(!showDropdown);
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ให้ไปหน้า login
            // navigate('/first');
        }
    };
    const goToAccount = () => {
        navigate('/adminaccount');
    };
    const goToBookingHistory = () => {
        navigate('/admindetail');
    };

    // ฟังก์ชันจัดการ Logout
    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        // นำทางกลับไปหน้า login
        navigate('/first');
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
        <div className="adminabout-container">

            <nav className="navbar_adminabout">
                <div className="nav-logo_adminabout">DPT Restaurant</div>

                <ul className="nav-links_adminabout">
                    <li className="navItem"><a href="#adminhome" onClick={() => handleNavClick('/adminhome')}>Home</a></li>
                    <li className="navItem"><a href="#adminabout" className='active' onClick={() => handleNavClick('/adminabout')}>About</a></li>
                    <li className="navItem"><a href="#adminmenu" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#adminchef" onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
                    <li className="navItem"><a href="#admindetail" onClick={() => handleNavClick('/admindetail')}>Table Booking</a></li>
                </ul>
                {/* <div className="chef-tag">
                    <span>Ruijkorn Imtrakun</span>
                </div> */}
                {/* <button className="home-tag">{userData.user}</button> */}
                {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                <div className="dropdown-adminabout">
                    <button className="adminabout-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdown-adminabout-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="dpt-adminabout-content">
                <h1>DPT Restaurant</h1>
                <p>
                    ร้าน <span className="highlight-adminabout">DPT Restaurant</span> สุดหรูสไตล์ฝรั่งเศสที่พร้อมมอบประสบการณ์
                    การรับประทานอาหารสุดพิเศษให้กับคุณลูกค้าของเรา จากฝีมือการปรุงอาหารของเชฟมืออาชีพที่มีประสบการณ์เป็นเชฟมาอย่างยาวนาน
                    และมีชื่อเสียง พร้อมกับบรรยากาศร้านสุดพิเศษที่ท่านจะประทับใจ และ ไม่มีวันลืม
                </p>
            </div>
        </div>
    );
};

export default AdminAboutPage;
