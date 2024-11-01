import React, { useEffect, useState } from "react";
import './Style/adminmenupage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminMenupage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
  const [menu, setMenu] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch menu data from API when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/configmenu')
      .then(response => {
        // setMenu(response.data);
        const updatedMenu = response.data.map(item => ({
          ...item,
          status: 'Available'
        }));
        setMenu(updatedMenu);
        console.log(updatedMenu);
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
  };

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

  const handonclick = (index) => {
    // Toggle the status between 'Available' and 'Sold_out'
    setMenu(prevMenu => {
      const newMenu = prevMenu.map((item, i) =>
        i === index ? { ...item, status: item.status === 'Available' ? 'Sold_out' : 'Available' } : item
      );
      const updatedItem = newMenu[index];

      // Send the updated status to the server
      axios.put(`http://localhost:5000/updateMenuStatus/${updatedItem.id}`, { status: updatedItem.status })
        .then(response => {
          console.log('Status updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });

      return newMenu;
    });
  };
  return (
    <div className="adminmenu-container">
      <nav className="adminmenu-nav">
        <div className="logo-adminmenu">DPT Restaurant</div>
        <ul className="navlink-adminmenu">
          <li className="navItem"><a href="#adminhome" onClick={() => handleNavClick('/adminhome')}>Home</a></li>
          <li className="navItem"><a href="#adminabout" onClick={() => handleNavClick('/adminabout')}>About</a></li>
          <li className="navItem"><a href="#adminmenu" className="active" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
          <li className="navItem"><a href="#adminchef" onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
          <li className="navItem"><a href="#admindetail" onClick={() => handleNavClick('/admindetail')}>Table Booking</a></li>
        </ul>
        {/* <button className="home-tag">{userData.user}</button> */}
        {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
        <div className="dropdown-adminmenu">
          <button className="adminmenu-tag" onClick={toggleDropdown}>
            {userData.user || "LOGIN"}
          </button>

          {showDropdown && (
            <div className="dropdown-adminmenu-menu">
              <ul>
                <li onClick={goToAccount}>Account</li>
                <li onClick={goToBookingHistory}>Booking History</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <section className="adminmenu-items">
        {menu.slice(0, 8).map((item, index) => (
          <div key={index} className={`adminmenu-item ${item.status === 'Sold_out' ? 'sold-out' : ''}`}
            onClick={() => handonclick(index)}>
            <img src={`${item.img}`} alt={item.name} />
            <div>{item.name}</div>
            <span>{item.price}</span>
            <p>{item.status}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminMenupage;