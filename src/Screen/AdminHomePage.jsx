import React, { useState, useEffect } from 'react';
import './Style/adminhomepage.css';
import { useNavigate } from 'react-router-dom';

function AdminHomePage() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
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

    return (
        <div className="adminhome-header">
            <nav className="navbar-adminhome">
                <div className="logo-adminhome">DPT Restaurant</div>
                <ul className="navlink-adminhome">
                    <li className="navItem"><a href="#adminhome" className='active' onClick={() => handleNavClick('/adminhome')}>Home</a></li>
                    <li className="navItem"><a href="#adminabout" onClick={() => handleNavClick('/adminabout')}>About</a></li>
                    <li className="navItem"><a href="#adminmenu" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#adminchef" onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
                    <li className="navItem"><a href="#admindetail" onClick={() => handleNavClick('/admindetail')}>Table Booking</a></li>
                </ul>
                <div className="dropdown-adminhome">
                    <button className="home-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdown-adminhome-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <section
                className="heroSection-adminhome"
            >

                <div className="heroContent-adminhome">
                    <h2 className="welcomeText-adminhome">Welcome to</h2>
                    <p className="restaurantName-adminhome">DPT Restaurant</p>
                    <button className="adminhome-booking-button" onClick={() => handleNavClick('/admindetail')}>
                        Booking
                    </button>

                </div>
                <div className="overlay"></div>
            </section>
        </div>
    );
};

export default AdminHomePage;
