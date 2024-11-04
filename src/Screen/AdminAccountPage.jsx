import './Style/adminaccountpage.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminAccountPage() {
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

    const handleNavClick = (path) => {
        navigate(path);
    };
    return (
        <div className='adminaccount-container'>
            <nav className='navbar-adminaccount'>
                <div className="logo-adminaccount">DPT Restaurant</div>

                <ul className="navLink-adminaccount">
                    <li className="navItem"><a href="#adminhome" onClick={() => handleNavClick('/adminhome')}>Home</a></li>
                    <li className="navItem"><a href="#adminabout" onClick={() => handleNavClick('/adminabout')}>About</a></li>
                    <li className="navItem"><a href="#adminmenu" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#adminchef" onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
                    <li className="navItem"><a href="#admindetail" onClick={() => handleNavClick('/admindetail')}>Table Booking</a></li>
                </ul>
                <div className="dropdown-adminaccount">
                    <button className="adminaccount-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdown-adminaccount-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            <div className='box-showadmin'>
                <h2>Account</h2>
                <div className='form-boxadmin'>
                    <h3>Name  :  {userData.user} </h3>
                </div>
                <div className='form-boxadmin'>
                    <h3>Phone Number  :  {userData.tel} </h3>
                </div>
                <button className='adminabout-button-history' onClick={goToBookingHistory}>Booking History</button>

            </div>
        </div >
    )
};
export default AdminAccountPage;