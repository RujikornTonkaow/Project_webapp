import React, { useEffect, useState } from "react";
import './Style/adminmenupage.css';
import { useNavigate } from 'react-router-dom';

function AdminMenupage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
  const handleNavClick = (path) => {
    navigate(path); // Navigate to the given path
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำทางไปที่หน้า login
      // navigate('/login');
    }
  }, [navigate]);
  const [showDropdown, setShowDropdown] = useState(false);
  // ฟังก์ชันจัดการการคลิกเพื่อแสดงปุ่ม Logout
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
    navigate('/adminaccount');
  };
  const goToBookingHistory = () => {
    navigate('/admindetail');
  };

  // ฟังก์ชันจัดการ Logout
  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('user');
    // นำทางกลับไปหน้า login
    navigate('/first');
  };
  return (
    <div className="adminmenu-container">
      {/* <header className="menu-header"> */}

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
      {/* </header> */}

      <section className="adminmenu-items">
        <div className="adminmenu-item">
          <img src="5.jpg" alt="Spaghetti Carbonara" />
          <p>สปาเก็ตตี้คาโบนาร่า</p>
          <span>250 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="8.jpeg" alt="Lasagna" />
          <p>ผักโขมอบชีส</p>
          <span>300 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="6.jpg" alt="Truffle Pizza" />
          <p>ทรัฟเฟิลพิซซ่า</p>
          <span>450 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="0.jpeg" alt="Lasagna Pork" />
          <p>ลาซานญ่าหมู</p>
          <span>300 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="11.jpeg" alt="Beef Stew" />
          <p>สตูเนื้อ</p>
          <span>350 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="7.jpg" alt="Escargot" />
          <p>หอยเชลล์อบเนย</p>
          <span>300 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="3.jpg" alt="Mushroom Soup" />
          <p>ซุปเห็ด</p>
          <span>150 THB</span>
        </div>
        <div className="adminmenu-item">
          <img src="2.jpg" alt="Pumpkin Soup" />
          <p>ซุปฟักทอง</p>
          <span>150 THB</span>
        </div>
      </section>
    </div>
  );
}

export default AdminMenupage;