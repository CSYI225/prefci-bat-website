import { NavLink } from 'react-router-dom';
import '../Styles/Footer.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-content reveal reveal-up">
                {/* A propos */}
                <div className="footer-column">
                    <h3>À PROPOS</h3>
                    <p>
                        PREFCI-BAT SARL est votre partenaire de confiance en Côte d'Ivoire pour tous vos travaux de plomberie, étanchéité et climatisation. Notre expertise et notre réactivité font la différence sur vos chantiers.
                    </p>
                    <div className="footer-socials">
                        {['LinkedIn', 'Facebook', 'Twitter', 'Instagram'].map((social, i) => (
                            <a 
                                href="#" 
                                aria-label={social} 
                                key={i}
                            >
                                {social === 'LinkedIn' ? 'in' : social[0].toLowerCase()}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Liens Rapides */}
                <div className="footer-column">
                    <h3>LIENS RAPIDES</h3>
                    <ul className="footer-links">
                        <li><NavLink to="/">Accueil</NavLink></li>
                        <li><NavLink to="/Presentation">Présentation</NavLink></li>
                        <li><NavLink to="/Services">Services</NavLink></li>
                        <li><NavLink to="/Realisations">Réalisations</NavLink></li>
                        <li><NavLink to="/Contact">Contact</NavLink></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-column">
                    <h3>CONTACT</h3>
                    <div className="footer-contact-item">
                        <p> <FaLocationDot /> 10 BP 2486 Abidjan 10, Koumassi Sicogi 1</p>
                    </div>
                    <div className="footer-contact-item">
                        <p> <FaPhoneAlt /> +225 07 58 31 40 19</p>
                    </div>
                    <div className="footer-contact-item">
                        <p> <MdEmail /> prefcibat@gmail.com</p>
                    </div>
                    <div className="footer-contact-item">
                        <p> <FaClock /> Lun - Sam: 08h - 18h</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} PREFCI-BAT SARL. Réalisé avec excellence.</p>
            </div>
        </footer>
    );
};

export default Footer;
