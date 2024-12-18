import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Style/tablebooking.css';
import Axios from 'axios';
import Swal from 'sweetalert2'


const TableBooking = () => {
    const location = useLocation();
    const { table, day, time, time_end} = location.state || {};

    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
    const [form, setForm] = useState({
        name: userData.user,
        day: day,
        time: time,
        table: table,
        time_end: time_end,
        phone: userData.tel
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };
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
    const handleSuccess = () => {

        Axios.post('http://localhost:5000/tablebooking', {
            table_no: form.table,
            user: userData.user,
            tel: userData.tel,
            day: form.day,
            time_in: form.time,
            time_out: form.time_end

        }).then((response) => {
            const doubleCheckIcon =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32"><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" fill="currentColor" /></svg>'

            Swal.fire({
                title: 'Success',
                icon: 'success',
                iconHtml: doubleCheckIcon,
                customClass: {
                    icon: 'rotate-y',
                }
            });
            navigate('/detailbooking', {
                state: {
                    table: form.table,
                    day: form.day,
                    time: form.time,
                    time_end: form.time_end,
                    name: userData.user,
                    phone: userData.tel
                }
            });

        }).catch((error) => {
            console.error("Error registering user:", error);
            alert("Error registering user.");
        });
    }

    return (
        <div className="table-booking-container">
            <nav className="navbarbooking">
                <div className="logo-booking">DPT Restaurant</div>
                <ul className="navLink-booking">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>

                <div className="dropdown-booking">
                    <button className="booking-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownbooking-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <div className="table-booking-form">
                <h2>Reserve a Table</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.user}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Table</label>
                        <input
                            type="text"
                            name="table"
                            value={form.table}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Day</label>
                        <input
                            type="date"
                            name="day"
                            value={form.day}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={userData.tel}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <button type="submit" className="submit-btn" onClick={handleSuccess}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TableBooking;
