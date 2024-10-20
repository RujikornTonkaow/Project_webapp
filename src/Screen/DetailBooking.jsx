import React, { useState, useEffect } from 'react';
import './Style/detailbooking.css';
import { useNavigate } from 'react-router-dom';

function DetailBooking() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showLogout, setShowLogout] = useState(false);
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
        <div className="detail-container">
            {/* <header className="menu-header"> */}

            <nav className="detail-nav">
                <div className="logo-detail">DPT Restaurant</div>
                <ul className="navlink-detail">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table booking</a></li>
                </ul>
                {/* <button className="home-tag">{userData.user}</button> */}
                {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                <div className="dropdown-detail">
                    <button className="detail-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdowndetail-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <h2 className="detail-title">Detail Booking</h2>
            <table className="detail-table">
                <thead>
                    <tr>
                        <th>Table</th>
                        <th>Name</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Phone</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A-01</td>
                        <td>Rujikorn Limtrakul</td>
                        <td>15/09/2023</td>
                        <td>21:45</td>
                        <td>093-232-2332</td>
                        <td>
                            <button className="cancel-button">Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="home-button" onClick={() => handleNavClick('/home')}>Home</button>

            {/* </header> */}
            {/* <section className='detail-table'>
                <h1>hihihihi</h1>
            </section> */}
            {/* <table className='detail-table'>
                <tr>
                    <th className='detail-item'>Table</th>
                    <th>Name</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Phone</th>
                    <th>Cancel</th>

                </tr>
                <tr>
                    <td>A-01</td>
                    <td>A-01</td>
                    <td>A-01</td>
                    <td>A-01</td>
                    <td>A-01</td>
                    <td>A-01</td>

                </tr>
            </table> */}
            {/* <section className="detail-items">
        <div className="detail-item">
          <img src="5.jpg" alt="Spaghetti Carbonara" />
          <p>สปาเก็ตตี้คาโบนาร่า</p>
          <span>250 THB</span>
        </div>
        
      </section> */}
        </div>
    );
}

export default DetailBooking;