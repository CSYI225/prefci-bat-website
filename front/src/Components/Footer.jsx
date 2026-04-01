import { NavLink } from 'react-router-dom';
import '../Styles/Footer.css';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BsFacebook } from "react-icons/bs";
const Footer = () => {
    return (
        <footer className="footer-section !px-6 md:!px-10 lg:!px-[100px] !py-[60px] md:!py-[40px]">
            <div className="footer-content reveal reveal-up !grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                {/* A propos */}
                <div className="footer-column">
                    <h3>À PROPOS</h3>
                    <p>
                        PREFCI-BAT SARL est votre partenaire de confiance en Côte d'Ivoire pour tous vos travaux de plomberie, étanchéité et climatisation. Notre expertise et notre réactivité font la différence sur vos chantiers.
                    </p>
                    <div className="contact-socials">
                        <a
                            href="https://www.facebook.com/share/14YjGZycagh/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-white)', color: 'var(--primary-color)', textDecoration: 'none', fontSize: '18px' }}
                        >
                            <BsFacebook />
                        </a>
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
                <p>&copy; {new Date().getFullYear()} PREFCI-BAT SARL. Réalisé avec excellence par l'<Link to="https://agencemosesart.com/" target='_blank'><strong>Agence Moses Art</strong></Link>.</p>
            </div>
        </footer>
    );
};

export default Footer;
