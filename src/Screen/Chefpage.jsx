import React, { useEffect, useState } from 'react';
import './Style/chefpage.css'; // Import the combined CSS
import { useNavigate } from 'react-router-dom';

// Chef data

const chefData = [
  {
    image: "donut.jpg",
    description: "นางสาววิภาวี เล้าคิมสวัสดิ์ เชฟชื่อดังชาวอังกฤษ เจ้าของ 7 มิชลินสตาร์ โดยเฉพาะร้าน วิภาวี เล้าคิมสวัสดิ์ ในย่านเชลซี กรุงลอนดอน"
  },
  {
    image: "kaow.jpg",
    description: "นายรุจิกร ลิ่มตระกูล เจ้าของฉายา \"เจ้าพ่อแห่งครัวฮาวายสมัยใหม่\" เขาเป็น 1 ใน 12 เชฟ ที่ร่วมกันก่อตั้งกลุ่มเชฟท้องถิ่นฮาวายขึ้นมา"
  },
  {
    image: "Pruk.jpg",
    description: "นายชนิตฒ์พล แสงรักษา เชฟดังชาวญี่ปุ่น-เปรู เจ้าของร้านอาหารชื่อเดียวกับตัวเองมากกว่า 30 แห่งทั่วโลก"
  }
];
// ChefCard Component
function ChefCard({ image, description }) {
  return (
    <article className="chefCard-chef">
      <img src={image} alt="Chef portrait-chef" className="chefImage-chef" />
      <p className="chefDescription-chef">{description}</p>
    </article>
  );
}

// Header Component with highlighted name
function Header() {
  const navigate = useNavigate(); // Initialize the navigate hook
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });

  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำทางไปที่หน้า login
      // navigate('/login');
    }
  }, [navigate]);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const goToAccount = () => {
    navigate('/account');
  };
  const goToBookingHistory = () => {
    navigate('/detailbooking');
  };
  // ฟังก์ชันจัดการ Logout
  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('user');
    // นำทางกลับไปหน้า login
    navigate('/first');
  };
  const handleNavClick = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <header className="header-chef">
      <nav className="navbar-chef">
        <div className="logo-chef">DPT Restaurant</div>
        {/* <h1 className="logo-chef">DPT Restaurant</h1> */}
        <ul className="navLinks-chef">

          <li className="navItem"><a href="#first" onClick={() => handleNavClick('/first')}>Home</a></li>
          <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
          <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
          <li className="navItem"><a href="#chef" className='active' onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
          <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
        </ul>
        {/* <button className="home-tag">{userData.user}</button> */}
        {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
        <div className="dropdown-chef">
          <button className="chef-tag" onClick={toggleDropdown}>
            {userData.user || "LOGIN"}
          </button>

          {showDropdown && (
            <div className="dropdownchef-menu">
              <ul>
                <li onClick={goToAccount}>Account</li>
                <li onClick={goToBookingHistory}>Booking History</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
 
// Main ChefPage Component
function Chefpage() {

  return (
    <main className="chefPage-chef">
      <Header />
      <section className="chefGrid-chef">
        {chefData.map((chef, index) => (
          <ChefCard key={index} image={chef.image} description={chef.description} />
        ))}
      </section>
    </main>
  );
}

export default Chefpage;
