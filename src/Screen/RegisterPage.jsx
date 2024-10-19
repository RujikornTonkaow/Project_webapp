import React, { useState,useEffect } from "react";
import './Style/registerpage.css';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";





const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [user, setNames] = useState([]);
    const [phones, setPhones] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    useEffect(() => {
        const fetchNames = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/names');
                // ดึงข้อมูลชื่อจาก results และสร้าง array ของชื่อ
                const userNames = response.data.map(item => item.user); 
                setNames(userNames);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching names:", error);
                setError("Error fetching names.");
                setLoading(false);
            }
        };
        const fetchPhones = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/phone');
                const phoneNumbers = response.data.map(item => item.tel);
                setPhones(phoneNumbers);
                // console.log("Phone numbers in database:", phoneNumbers); 
                setLoading(false);  // แสดงหมายเลขโทรศัพท์ใน console
            } catch (error) {
                console.error("Error fetching phone numbers:", error);
                setError("Error fetching phone numbers.");
                setLoading(false);
            }
        };

        fetchNames();
        fetchPhones();
    }, []);  

    // // แสดงข้อความขณะโหลด
    if (loading) return <p>Loading...</p>;
    // แสดงข้อความหากมีข้อผิดพลาด
    if (error) return <p>{error}</p>;
    // console.log(user);
    // console.log(phones);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        console.log(phones);
        
        // if (user.includes(name) && phones.includes(phoneNumber)) {
        //     alert("ได้ลงทะเบียนไปแล้วด้วยชื่อและเบอร์นี้");
        //     // เคลียร์ฟิลด์การกรอกข้อมูล
        //     setName("");
        //     setPhoneNumber("");
        //     setPassword("");
        //     setConfirmPassword("");
        //     return;
        // }
        const phoneRegex = /^\d+$/;
        if (!name || !password || !confirmPassword || !phoneNumber || password !== confirmPassword) {
            if (!name || !password || !confirmPassword || !phoneNumber) {
                alert("Please fill out all fields.");
            } else if (password !== confirmPassword) {
                alert("Passwords do not match.");
            } else if (!phoneRegex.test(phoneNumber)) {
                alert("Phone number should contain only numbers.");
            }
        } else if (user.includes(name)) { // เช็คว่าชื่อผู้ใช้ซ้ำหรือไม่
            alert("ได้ลงทะเบียนไปแล้วด้วยชื่อนี้");
        } else if (phones.includes(phoneNumber)) { // เช็คว่าหมายเลขโทรศัพท์ซ้ำหรือไม่
            alert("ได้ลงทะเบียนไปแล้วด้วยเบอร์นี้");
        } else { 

            Axios.post('http://localhost:5000/register', {
                user: name,
                password: password,
                tel: phoneNumber,
                role: "customer",  
            }).then((response) => {
                
                alert(`Welcome, ${name}!`);
                
                // Navigate ไปหน้า Login พร้อมกับส่งข้อมูลชื่อผู้ใช้ไปด้วย
                navigate('/login', { state: { name, password, phoneNumber } });
            }).catch((error) => {
                console.error("Error registering user:", error);
                alert("Error registering user.");
            });
        }
    };

    const handleNavClick = (path) => {
        navigate(path); // Navigate to the given path
    };

    return (
        <header className="regi-header">
            {/* Navigation Bar */}
            <nav className="navbar-regi">
                <div className="logo-regi">DPT Restaurant</div>
                <ul className="navlink-regi">
                    <li className="navItem"><a href="#first" className='active' onClick={() => handleNavClick('/first')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
            </nav>

            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        pattern="[0-9]{10}"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    <button type="submit" >Register</button>
                </form>
            </div>
        </header>
    );
};

export default Register;
