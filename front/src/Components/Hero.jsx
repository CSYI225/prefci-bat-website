import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Hero.css';
import Logo from '../Images/Logo.png';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar inside Hero */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <img src={Logo} alt="logo" />
        </div>

        <nav className="pages">
          <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Accueil</NavLink></li>
            <li><NavLink to="/Presentation" className={({ isActive }) => isActive ? "active-link" : ""}>Présentation</NavLink></li>
            <li><NavLink to="/Services" className={({ isActive }) => isActive ? "active-link" : ""}>Services</NavLink></li>
            <li><NavLink to="/Realisations" className={({ isActive }) => isActive ? "active-link" : ""}>Réalisations</NavLink></li>
            <li><NavLink to="/Contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="header-cta">
          <NavLink to="/Contact" className="btn btn-white">Demander un devis</NavLink>
        </div>
      </header>
    </>
  );
};

export default Hero;
