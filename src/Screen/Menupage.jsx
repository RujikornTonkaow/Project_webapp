import React, { useEffect, useState } from "react";
import './Style/menupage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menupage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
  const [menu, setMenu] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch menu data from API when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/configmenu')
      .then(response => {
        setMenu(response.data);
        console.log(response.data);
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

  return (
    <div className="menu-container">
      <nav className="menu-nav">
        <div className="logo-menu">DPT Restaurant</div>
        <ul className="navlink-menu">
          <li className="navItem"><a href="#home" onClick={() => handleNavClick('/home')}>Home</a></li>
          <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
          <li className="navItem"><a href="#menu" className="active" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
          <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
          <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
        </ul>
        
        <div className="dropdown-menu">
          <button className="menu-tag" onClick={toggleDropdown}>
            {userData.user || "LOGIN"}
          </button>

          {showDropdown && (
            <div className="dropdownmenu-menu">
              <ul>
                <li onClick={goToAccount}>Account</li>
                <li onClick={goToBookingHistory}>Booking History</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <section className="menu-items">
        {menu.slice(0, 8).map((item, index) => (
          <div key={index} className={`menu-item ${item.status === 'Sold_out' ? 'sold-out' : ''}`}>
            <img src={`${item.img}`} alt={item.name} />
            <div>{item.name}</div>
            <span>{item.price}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Menupage;