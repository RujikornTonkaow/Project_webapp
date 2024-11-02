import React, { useEffect, useState } from 'react';
import './Style/chefpage.css';
import { useNavigate } from 'react-router-dom';

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

function ChefCard({ image, description }) {
  return (
    <article className="chefCard-chef">
      <img src={image} alt="Chef portrait-chef" className="chefImage-chef" />
      <p className="chefDescription-chef">{description}</p>
    </article>
  );
}

function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });

  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
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
  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('user');
    navigate('/first');
  };
  const handleNavClick = (path) => {
    navigate(path); 
  };

  return (
    <header className="header-chef">
      <nav className="navbar-chef">
        <div className="logo-chef">DPT Restaurant</div>
        <ul className="navLinks-chef">

          <li className="navItem"><a href="#first" onClick={() => handleNavClick('/first')}>Home</a></li>
          <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
          <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
          <li className="navItem"><a href="#chef" className='active' onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
          <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
        </ul>
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
