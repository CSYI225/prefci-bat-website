import '../Styles/Services.css';
import '../Styles/Accueil.css'; // For common CTA banner
import ServicesImg from '../Images/services.jpg';
import BanniereImg from '../Images/BanniereAccueil.png';
import ContactImg from '../Images/contact.png';

const Services = () => {
    return (
        <div className="services-page">
            {/* 1. Banner */}
            <div className="services-banniere reveal reveal-up">
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>NOS <span className="highlight-bg">SERVICES</span></h2>
                    <h2>NOS<span className="highlight-bg">RESULTATS</span>VISIBLES</h2>
                </div>
            </div>

            {/* 2. Detailed Services Zigzag */}
            <section className="services-details-section">

                {/* Plomberie Row */}
                <div className="service-detail-row">
                    <div className="service-detail-img reveal reveal-left">
                        <img src={ServicesImg} alt="Plomberie" />
                    </div>
                    <div className="service-detail-text reveal reveal-right">
                        <h2 style={{ textAlign: 'left' }}>PLOM<span>BERIE</span></h2>
                        <p style={{ textAlign: 'left' }}>
                            La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées avec rigueur, dans le respect des délais et des exigences du terrain.
                        </p>
                        <button className="service-btn">CONTACTEZ NOUS</button>
                    </div>
                </div>

                {/* Etancheite Row */}
                <div className="service-detail-row reverse">
                    <div className="service-detail-img reveal reveal-right">
                        <img src={BanniereImg} alt="Étanchéité" style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '4px' }} />
                    </div>
                    <div className="service-detail-text reveal reveal-left">
                        <h2 style={{ textAlign: 'right' }}>ÉTAN<span>CHÉITÉ</span></h2>
                        <p style={{ textAlign: 'right' }}>
                            La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées avec rigueur, dans le respect des délais et des exigences du terrain.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="service-btn">CONTACTEZ NOUS</button>
                        </div>
                    </div>
                </div>

                {/* Froid et Climatisation Row */}
                <div className="service-detail-row">
                    <div className="service-detail-img reveal reveal-left">
                        <img src={ContactImg} alt="Froid et Climatisation" style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '4px' }} />
                    </div>
                    <div className="service-detail-text reveal reveal-right">
                        <h2>FROID ET <span>CLIMATISATION</span></h2>
                        <p>
                            La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées with rigueur, dans le respect des délais et des exigences du terrain.
                        </p>
                        <button className="service-btn">CONTACTEZ NOUS</button>
                    </div>
                </div>

            </section>

            {/* 3. CTA Section */}
            <section className="cta-banner">
                <div className="cta-content reveal reveal-up">
                    <h2>BESOIN D'UNE INTERVENTION <span>RAPIDE ?</span></h2>
                    <p>Contactez-nous aujourd'hui pour être mis en relation with nos experts.</p>
                    <button className="btn btn-white cta-btn">CONTACTEZ-NOUS</button>
                </div>
            </section>
        </div>
    );
};

export default Services;
