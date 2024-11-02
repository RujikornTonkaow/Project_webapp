import React, { useState } from 'react';
import './Style/loginpage.css';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import Swal from 'sweetalert2'

function LoginPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!name || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        Axios.post('http://localhost:5000/login', {
            user: name,
            password: password
        }).then((response) => {
            console.log("user : ", name, "password : ", password);
            const { user, role, tel } = response.data;
            localStorage.setItem('user', JSON.stringify({ user, tel, role }));
            const doubleCheckIcon =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32"><path d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z" fill="currentColor" /></svg>'

            Swal.fire({
                title: 'Login Success,Hello ' + user,
                icon: 'success',
                iconHtml: doubleCheckIcon,
                customClass: {
                    icon: 'rotate-y',
                }
            });
            if (role === 'customer') {

                navigate('/home');
            } else if (role === 'admin') {

                navigate('/adminhome');
            }
        }).catch((error) => {
            console.error('Error during login:', error);
            setErrorMessage('Invalid username or password.');
        });
    };

    const handleRegister = () => {
        console.log('Registering', name, password);
        navigate('/register');
    };
    const handleNavClick = (path) => {
        navigate(path);
    };
    return (
        <div className="login-header">

            <nav className="navbar-login">
                <div className="nav-logo">DPT Restaurant</div>
                <ul className="navlink-login">
                    <li className="navItem"><a href="#first" className='active' onClick={() => handleNavClick('/first')}>Home</a></li>
                    <li className="navItem"><a href="#about" onClick={() => handleNavClick('/about')}>About</a></li>
                    <li className="navItem"><a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a></li>
                    <li className="navItem"><a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a></li>
                    <li className="navItem"><a href="#settime" onClick={() => handleNavClick('/settime')}>Table Booking</a></li>
                </ul>
            </nav>
            <section
                className="loginSection">
                <div className="loginBox">
                    <h2 className="loginTitle">LOGIN-PAGE</h2>
                    <input
                        type="text"
                        className="inputField"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        className="inputField"
                        placeholder="Enter Pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                    <div className="buttonContainer">
                        <button className="loginButton" onClick={handleLogin}>
                            Login
                        </button>
                        <button className="registerButton" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;
