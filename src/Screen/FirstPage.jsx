import React from 'react';
import './Style/firstpage.css';
import { useNavigate } from 'react-router-dom';


function FirstPage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleNavClick = (path) => {
        navigate(path);
    };
    return (
        <div className="header-first">
            <nav className="navColumn-first">
                <div className="first-logo">DPT Restaurant</div>
                <ul className="nav-first">
                    <li className="navItem">
                        <a href="#first" className='active' onClick={() => handleNavClick('/first')}>Home</a>
                    </li>
                    <li className="navItem">
                        <a href="#about" onClick={() => handleNavClick('/about')}>About</a>
                    </li>
                    <li className="navItem">
                        <a href="#menu" onClick={() => handleNavClick('/menupage')}>Recommended Menu</a>
                    </li>
                    <li className="navItem">
                        <a href="#chef" onClick={() => handleNavClick('/chefpage')}>Chef</a>
                    </li>
                    <li className="navItem">
                        <a href="#settime" onClick={() => handleNavClick('/settime')}>Table booking</a>
                    </li>
                </ul>
            </nav>
            <section
                className="heroSection-first"
            >
                <div className="overlay"></div>
                <div className="heroContent-first">
                    <h2 className="welcomeTex-first">Welcome to</h2>
                    <p className="restaurantName">DPT Restaurant</p>
                    <button className="loginButton" onClick={handleLoginClick}>
                        LOGIN
                        <span className="srOnly">Access your account</span>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default FirstPage;
