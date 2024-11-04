import './Style/accountpage.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AccountPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user: '', tel: '', role: '',point:'' });
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleNavClick = (path) => {
        navigate(path);
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
                    <h3>Name  :  {userData.user} </h3>
                </div>
                <div className='form-box'>
                    <h3>Phone Number  :  {userData.tel} </h3>
                </div>
                <div className='form-box'>
                    <h3>Point  :  {userData.point} </h3>
                </div>
                <button className='button-history' onClick={goToBookingHistory}>Booking History</button>

            </div>
        </div >
    )
};
export default AccountPage;