import React, { useEffect, useState } from 'react';
import './Style/adminchefpage.css'; // Import the combined CSS
import { useNavigate } from 'react-router-dom';

// Chef data

const chefData = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/eb997ed42105761aa0ba0cf7c0ca78ef204234498e04ceb3a828e8bc281ee113?placeholderIfAbsent=true&apiKey=481b691d389644fcbe1d378101c13fd3",
    description: "กอร์ดอน แรมเซย์ เชฟชื่อดังชาวอังกฤษ เจ้าของ 7 มิชลินสตาร์ โดยเฉพาะร้าน กอร์ดอน แรมเซย์ ในย่านเชลซี กรุงลอนดอน"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/259293f5a5354e71d1ed73c9d07895b9f461f25894834a86854477cfcec7c189?placeholderIfAbsent=true&apiKey=481b691d389644fcbe1d378101c13fd3",
    description: "เชฟอลัน หว่อง เจ้าของฉายา \"เจ้าพ่อแห่งครัวฮาวายสมัยใหม่\" เขาเป็น 1 ใน 12 เชฟ ที่ร่วมกันก่อตั้งกลุ่มเชฟท้องถิ่นฮาวายขึ้นมา"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad361e6f296e9fb898987212820285dce30d82fca26a8f5c9b931316ff44572e?placeholderIfAbsent=true&apiKey=481b691d389644fcbe1d378101c13fd3",
    description: "โนบุ มัตสึฮิซะ เชฟดังชาวญี่ปุ่น-เปรู เจ้าของร้านอาหารชื่อเดียวกับตัวเองมากกว่า 30 แห่งทั่วโลก"
  }
];
// ChefCard Component
function ChefCard({ image, description }) {
  return (
    <article className="chefCard-adminchef">
      <img src={image} alt="Chef portrait-chef" className="chefImage-adminchef" />
      <p className="chefDescription-adminchef">{description}</p>
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
  const handleNavClick = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <header className="header-adminchef">
      <nav className="navbar-adminchef">
        <div className="logo-adminchef">DPT Restaurant</div>
        {/* <h1 className="logo-chef">DPT Restaurant</h1> */}
        <ul className="navLinks-adminchef">

          <li className="navItem"><a href="#adminhome" onClick={() => handleNavClick('/adminhome')}>Home</a></li>
          <li className="navItem"><a href="#adminabout" onClick={() => handleNavClick('/adminabout')}>About</a></li>
          <li className="navItem"><a href="#adminmenu" onClick={() => handleNavClick('/adminmenu')}>Recommended Menu</a></li>
          <li className="navItem"><a href="#adminchef" className='active' onClick={() => handleNavClick('/adminchef')}>Chef</a></li>
          <li className="navItem"><a href="#admindetail" onClick={() => handleNavClick('/admindetail')}>Table Booking</a></li>
        </ul>
        {/* <button className="home-tag">{userData.user}</button> */}
        {/* แสดงชื่อผู้ใช้และปุ่ม Logout */}
        <div className="dropdown-adminchef">
          <button className="adminchef-tag" onClick={toggleDropdown}>
            {userData.user || "LOGIN"}
          </button>

          {showDropdown && (
            <div className="dropdown-adminchef-menu">
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
function AdminChefpage() {

  return (
    <main className="chefPage-adminchef">
      <Header />
      <section className="chefGrid-adminchef">
        {chefData.map((chef, index) => (
          <ChefCard key={index} image={chef.image} description={chef.description} />
        ))}
      </section>
    </main>
  );
}

export default AdminChefpage;
