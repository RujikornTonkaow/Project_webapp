import React, { useEffect, useState } from 'react';
import './Style/adminaboutpage.css';
import { useNavigate } from 'react-router-dom';

const AdminAboutPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {

        }
    }, []);

    const toggleDropdown = () => {
        if (userData.user) {
            // ถ้ามีข้อมูลผู้ใช้ให้แสดง dropdown
            setShowDropdown(!showDropdown);
        } else {

        }
    };
    const goToAccount = () => {
        navigate('/adminaccount');
    };
    const goToBookingHistory = () => {
        navigate('/admindetail');
    };

    const handleLogout = () => {
        // ลบข้อมูลผู้ใช้จาก localStorage
        localStorage.removeItem('user');
        navigate('/first');
    };

    const handleNavClick = (path) => {
        navigate(path);
    };
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
