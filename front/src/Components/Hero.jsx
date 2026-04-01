import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import '../Styles/Hero.css';
import Logo from '../Images/Logo.png';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <header className={`header !px-4 md:!px-10 lg:!px-[100px] !w-full !flex !items-center !justify-between ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container z-50 relative">
          <img src={Logo} alt="logo" className="w-[50px] md:w-[60px]" />
        </div>

        {/* Hamburger Icon */}
        <button 
          className="md:hidden z-50 text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <nav className={`pages fixed md:static top-0 right-0 h-screen md:h-auto w-3/4 md:w-auto bg-[#1f2937] md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-start transition-transform duration-300 z-40 shadow-2xl md:shadow-none ${menuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-[30px] text-center mb-10 md:mb-0">
            <li><NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>Accueil</NavLink></li>
            <li><NavLink to="/Presentation" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>Présentation</NavLink></li>
            <li><NavLink to="/Services" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>Services</NavLink></li>
            <li><NavLink to="/Realisations" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>Réalisations</NavLink></li>
            <li><NavLink to="/Contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink></li>
          </ul>

          {/* Mobile CTA Button inside Menu */}
          <div className="header-cta md:hidden">
            <NavLink to="/Contact#contact-form" onClick={() => setMenuOpen(false)} className="btn btn-white !text-[#4CC9F0] !bg-white">Demander un devis</NavLink>
          </div>
        </nav>

        {/* Desktop CTA Button */}
        <div className="header-cta hidden md:block">
          <NavLink to="/Contact#contact-form" className="btn btn-white">Demander un devis</NavLink>
        </div>
      </header>
    </>
  );
};

export default Hero;
