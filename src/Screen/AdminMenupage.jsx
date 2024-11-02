import React, { useEffect, useState } from "react";
import './Style/adminmenupage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminMenupage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ user: '', tel: '', role: '' });
  const [menu, setMenu] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserData(storedUser);
    } else {
    }
    axios.get('http://localhost:5000/configmenu')
      .then(response => {

        const updatedMenu = response.data.map(item => ({
          ...item
        }));
        setMenu(updatedMenu);
        console.log(updatedMenu);

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

    setMenu(prevMenu => {
      const newMenu = prevMenu.map((item, i) =>
        i === index ? { ...item, status: item.status === 'Available' ? 'Sold_out' : 'Available' } : item
      );
      const updatedItem = newMenu[index];

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
  const handleedit = (index) => {
    const item = menu[index];
    Swal.fire({
      title: "แก้ไขราคาของ " + item.name,
      input: 'number',
      inputLabel: item.name + " " + item.price,
      inputValue: item.price,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: (newPrice) => {
        if (newPrice <= 0) {
          Swal.showValidationMessage('Price must be greater than zero');
        }
        return newPrice;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newPrice = `${result.value} THB`;
        axios.put(`http://localhost:5000/updateMenuPrice/${item.id}`, { price: newPrice })
          .then(response => {
            setMenu(prevMenu =>
              prevMenu.map((menuItem, i) =>
                i === index ? { ...menuItem, price: newPrice } : menuItem
              )
            );
            Swal.fire('Saved!', 'Price has been updated.', 'success');
          })
          .catch(error => {
            console.error('Error updating price:', error);
            Swal.fire('Error', 'Failed to update price', 'error');
          });
      }
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
          >
            <img src={`${item.img}`} alt={item.name} />
            <div>{item.name}</div>
            <span>{item.price}</span>
            <p>{item.status}</p>
            <div className="btt-Container">
              <button className="editbtt" onClick={() => handleedit(index)}>edit</button>
              <button className="statusbtt" onClick={() => handonclick(index)}>{item.status}</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminMenupage;