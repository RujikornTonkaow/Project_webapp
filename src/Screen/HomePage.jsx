import React, { useState, useEffect } from 'react';
import './Style/homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ user: '', tel: '', role: '',point:'' });

    console.log(userData);

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
        localStorage.removeItem('user');
        navigate('/first');
    };

    return (
        <div className="home-header">
            <nav className="navbar-home">
                <div className="logo-home">DPT Restaurant</div>
                <ul className="navlink-home">
                    <li className="navItem"><a href="#home" className='active' onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
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
            <section
                className="heroSection-home"
            >

                <div className="heroContent-home">
                    <h2 className="welcomeText-home">Welcome to</h2>
                    <p className="restaurantName">DPT Restaurant</p>
                    <button className="booking-button" onClick={() => handleNavClick('/settime')}>
                        Booking
                    </button>

                </div>
                <div className="overlay"></div>

            </section>
        </div>
    );
};

export default HomePage;
