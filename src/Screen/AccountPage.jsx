import './Style/accountpage.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AccountPage() {
    const navigate = useNavigate(); // Initialize the navigate hook
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
        } else {
            // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำทางไปที่หน้า login
            navigate('/first');
        }
    }, [navigate]);

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
 
    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };
    return (
        <div className='account-container'>
            <nav className='navbaraccount'>
                <div className="logo-account">DPT Restaurant</div>

                <ul className="navLink-account">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
                {/* <button className="home-tag">{userData.user}</button> */}
                {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
                <div className="dropdown-account">
                    <button className="account-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownaccount-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div className='box-show'>
                <h2>Account</h2>
                <div className='form-box'>
                    <label>Name</label>
                    <label>{userData.user}</label>
                </div>
                <div className='form-box'>
                    <label>Phone Number</label>
                    <label>{userData.tel}</label>
                </div>
                <button className='button-history'>Booking History</button>

            </div>
        </div >
    )
};
export default AccountPage;