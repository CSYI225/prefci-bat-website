import '../Styles/Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            {/* 1. Hero Content */}
            <div className="contact-banniere reveal reveal-up">
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>BESOIN D'UNE <span className="light">INTERVENTION ?</span></h2>
                    <h2><span>CONTACTEZ-NOUS</span> DÈS MAINTENANT</h2>
                </div>
            </div>

            {/* 2. Contact Main Content */}
            <div className="contact-content">
                <div className="contact-info reveal reveal-left">
                    <div className="contact-info-block">
                        <h3>Adresse</h3>
                        <p>10 BP 2486 Abidjan 10, Koumassi</p>
                        <p>Sicogi 1 à 100m de l'hôpital général</p>
                        <p>et 200m de Camp commando</p>
                    </div>
                    <div className="contact-info-block">
                        <h3>Contact</h3>
                        <p>Email: prefcibat@gmail.com</p>
                        <p>Tél: +225 07 58 31 40 19 / 05 46 56 85 24</p>
                        <p>Whatsapp: +225 07 58 31 40 19</p>
                    </div>
                    <div className="contact-info-block">
                        <h3>Horaire</h3>
                        <p>Lundi-Samedi: 08h-18h</p>
                    </div>
                    <div className="contact-info-block">
                        <h3>Suivez-nous</h3>
                        <div className="contact-social">
                            {['LinkedIn', 'Facebook', 'Twitter', 'Instagram'].map((social, i) => (
                                <a 
                                    href="#" 
                                    aria-label={social} 
                                    key={i} 
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue-pref)', color: 'white', textDecoration: 'none' }}
                                >
                                    {social[0].toLowerCase()}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="contact-form-container reveal reveal-right">
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <input type="text" placeholder="Nom" required />
                            <input type="text" placeholder="Prénoms" required />
                        </div>
                        <div className="form-row">
                            <input type="email" placeholder="Email" required />
                            <input type="tel" placeholder="Téléphone" required />
                        </div>
                        <div className="form-row">
                            <select required defaultValue="">
                                <option value="" disabled>Type de service</option>
                                <option value="plomberie">Plomberie</option>
                                <option value="etancheite">Étanchéité</option>
                                <option value="froid">Froid & Climatisation</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <textarea placeholder="Description du problème" required></textarea>
                        </div>
                        <div className="checkbox-row">
                            <input type="checkbox" id="confirm-info" required />
                            <label htmlFor="confirm-info">Je confirme que les informations fournies sont exactes.</label>
                        </div>
                        <button type="submit" className="submit-btn">Envoyer ma demande</button>
                    </form>
                </div>
            </div>

            {/* 3. Maps Section */}
            <div className="contact-maps reveal reveal-up">
                <div className="map-container">
                    {/* Placeholder iframe for Abidjan Koumassi map */}
                    <iframe
                        title="Map 1"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.639595537574!2d-3.957688224164366!3d5.318854036015509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb485121b8b1%3A0xe74e7cde2eb54291!2sKoumassi%20Sicogi%2C%20Abidjan%2C%20C%C3%B4te%20d&#39;Ivoire!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
