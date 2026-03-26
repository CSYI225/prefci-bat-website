import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Hero.css';

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
          <svg width="30" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.5C16.1421 21.5 19.5 18.1421 19.5 14C19.5 9.85786 12 2 12 2C12 2 4.5 9.85786 4.5 14C4.5 18.1421 7.85786 21.5 12 21.5Z" fill="#4CC9F0" />
            <path d="M12 21.5C14.0711 21.5 15.75 18.1421 15.75 14C15.75 11.5 12 5.5 12 5.5C12 5.5 8.25 11.5 8.25 14C8.25 18.1421 9.92893 21.5 12 21.5Z" fill="#FFFFFF" fillOpacity="0.3" />
          </svg>
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
