import React, { useState, useEffect } from 'react';
import './Style/detailbooking.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2'
function DetailBooking() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ user: '', tel: '', role: '' });

    const [bookings, setBookings] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserData(storedUser);
            if (storedUser.user) { // ตรวจสอบว่ามี user หลังจากกำหนดค่า storedUser
                Axios.get(`http://localhost:5000/api/bookings/${storedUser.user}`)
                    .then(response => {
                        setBookings(response.data);
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            setBookings([]);
                        } else {
                            console.log("Error fetching booking data:", error);
                        }
                    });
            }
        } else {
            navigate('/first');
        }
        // Axios.get(`http://localhost:5000/api/bookings/${userData.user}`)
        //     .then(response => {
        //         setBookings(response.data);//เก็บค่าข้อมูลในdbตาม name
        //     })
        //     .catch(error => {
        //         if (error.response && error.response.status === 404) {
        //             setBookings([]); // ถ้าbookings เป็น empty ไม่มีข้อมูลการจอง เพื่อแสดงข้อความ "ไม่มีข้อมูลการจอง"
        //         } else {
        //             console.log("Error fetching booking data:", error);
        //         }
        //     });
    }, [navigate, userData.user]);

    const handleNavClick = (path) => {
        navigate(path);
    };

    const handleCancelBooking = (id, table_no) => {
        Swal.fire({
            title: `คุณต้องการที่จะลบการจองโต๊ะใช่ไหม ?
            Table : ${table_no} `,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`http://localhost:5000/api/delbookings/${id}`)
                    .then(response => {
                        if (response.data.status === "ok") {
                            // อัปเดต state โดยการกรอง booking ที่ไม่ตรงกับ id ที่ถูกลบ
                            setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
                            Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
                        }
                    })
                    .catch(error => {
                        console.log("Error deleting booking:", error);
                    });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
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



    return (
        <div className="detail-container">
            <nav className="detail-nav">
                <div className="logo-detail">DPT Restaurant</div>
                <ul className="navlink-detail">
                    <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" className="active" onClick={() => handleNavClick('/settime')}>Table booking</a></li>
                </ul>
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
            {bookings.length > 0 ? (
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
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.table_no}</td>
                                <td>{booking.user}</td>
                                <td>{booking.day}</td>
                                <td>{booking.time_in}</td>
                                <td>{booking.tel}</td>
                                <td>
                                    <button
                                        className="cancel-button"
                                        onClick={() => handleCancelBooking(booking.id, booking.table_no)}
                                    >Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">ไม่มีข้อมูลการจอง</p>
            )}
            <button className="home-button" onClick={() => handleNavClick('/home')}>Home</button>


        </div>
    );
}

export default DetailBooking;