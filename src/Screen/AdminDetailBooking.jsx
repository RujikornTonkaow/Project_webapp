import React, { useState, useEffect } from 'react';
import './Style/admindetailbooking.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AdminDetailBooking() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });

    const [bookings, setBookings] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
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
        Axios.get(`http://localhost:5000/time`)
            .then(response => {
                setBookings(response.data);//เก็บค่าข้อมูลในdbตาม 
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    setBookings([]); // ถ้าbookings เป็น empty เพื่อแสดงข้อความ "ไม่มีข้อมูลการจอง"
                } else {
                    console.log("Error fetching booking data:", error);
                }
            });
    }, [navigate, userData.user]);
    const handleCancelBooking = (id) => {
        Axios.delete(`http://localhost:5000/api/delbookings/${id}`)
            .then(response => {
                if (response.data.status === "ok") alert("Delete Booking sucessfully!");
                setBookings(response.data.bookings);
                window.location.reload();
            })
            .catch(error => {
                console.log("error");
            });
    }
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
        <div className="admindetail-container">
            <nav className="admindetail-nav">
                <div className="logo-admindetail">DPT Restaurant</div>
                <ul className="navlink-admindetail">
                    <li className="navItem"><a href="#adminhome" onClick={() => handleNavClick('/adminhome')}>Home</a></li>
                    <li className="navItem"><a href="#adminabout" onClick={() => handleNavClick('/adminabout')}>About</a></li>
                    <li className="navItem"><a href="#adminmenu" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#adminchef" onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
                    <li className="navItem"><a href="#admindetail" className="active" onClick={() => handleNavClick('/admindetail')}>Table booking</a></li>
                </ul>
                <div className="dropdown-admindetail">
                    <button className="admindetail-tag" onClick={toggleDropdown}>
                        {userData.user || "LOGIN"}
                    </button>

                    {showDropdown && (
                        <div className="dropdownadmindetail-menu">
                            <ul>
                                <li onClick={goToAccount}>Account</li>
                                <li onClick={goToBookingHistory}>Booking History</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>

            <h2 className="admindetail-title">Detail Booking</h2>
            {bookings.length > 0 ? (

                <table className="admindetail-table">
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
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.table_no}</td>
                                <td>{booking.user}</td>
                                <td>{booking.day}</td>
                                <td>{booking.time_in}</td>
                                <td>{booking.tel}</td>
                                <td>
                                    <button
                                        className="admincancel-button"
                                        onClick={() => handleCancelBooking(booking.id)}
                                    >Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            ) : (
                <p className="adminno-data">ไม่มีข้อมูลการจอง</p>
            )}
            <button className="adminhome-button" onClick={() => handleNavClick('/home')}>Home</button>


        </div>
    );
}

export default AdminDetailBooking;