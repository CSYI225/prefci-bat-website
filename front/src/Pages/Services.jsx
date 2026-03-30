import { useState, useEffect } from 'react';
import '../Styles/Services.css';
import '../Styles/Accueil.css'; // For common CTA banner
import ServicesImg from '../Images/services.jpg';
import BanniereImg from '../Images/BanniereAccueil.png';
import ContactImg from '../Images/contact.png';

const Services = () => {
    const defaultServices = [
        {
            id_service: 1,
            titre: "PLOMBERIE",
            details: "La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées avec rigueur, dans le respect des délais et des exigences du terrain.",
            image: ServicesImg
        },
        {
            id_service: 2,
            titre: "ÉTANCHÉITÉ",
            details: "La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées avec rigueur, dans le respect des délais et des exigences du terrain.",
            image: BanniereImg
        },
        {
            id_service: 3,
            titre: "FROID ET CLIMATISATION",
            details: "La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées with rigueur, dans le respect des délais et des exigences du terrain.",
            image: ContactImg
        }
    ];

    const [services, setServices] = useState(defaultServices);
    const [banner, setBanner] = useState({ titreNoir: "NOS SERVICES", titreBleu: "RÉSULTATS VISIBLES", image: "" });

    useEffect(() => {
        // Fetch Services
        fetch('http://localhost:3000/admin/services')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) setServices(data);
            })
            .catch(err => console.warn("Using default Services content", err));

        // Fetch Banner
        fetch('http://localhost:3000/pages/services')
            .then(res => res.json())
            .then(pageData => {
                if (pageData && pageData.banniere) setBanner(pageData.banniere);
            })
            .catch(err => console.warn("Using default banner for Services", err));
    }, []);

    // Helper to extract first and remaining words for title styling
    const formatTitle = (fullTitle) => {
        if (!fullTitle) return { start: '', end: '' };
        const upper = fullTitle.toUpperCase();
        // Just hardcoded splits for visual design mapping since it's an aesthetic choice
        if (upper.includes("PLOMBERIE")) return { start: "PLOM", end: "BERIE" };
        if (upper.includes("ÉTANCHÉITÉ") || upper.includes("ETANCHEITE")) return { start: "ÉTAN", end: "CHÉITÉ" };
        if (upper.includes("FROID ET CLIMATISATION")) return { start: "FROID ET ", end: "CLIMATISATION" };
        
        // Generalized split
        const parts = upper.split(' ');
        if (parts.length === 1) {
            const mid = Math.floor(upper.length / 2);
            return { start: upper.slice(0, mid), end: upper.slice(mid) };
        }
        return { start: parts[0] + " ", end: parts.slice(1).join(" ") };
    };

    return (
        <div className="services-page">
            {/* 1. Banner */}
            <div className="services-banniere reveal reveal-up">
                {banner.image && (
                    <img src={banner.image} alt="Banniere" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1}} />
                )}
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>{banner.titreNoir}</h2>
                    <h2><span className="highlight-bg">{banner.titreBleu}</span></h2>
                </div>
            </div>

            {/* 2. Detailed Services Zigzag */}
            <section className="services-details-section">
                {services.map((service, index) => {
                    const isReverse = index % 2 !== 0;
                    const titleParts = formatTitle(service.titre);
                    return (
                        <div className={`service-detail-row ${isReverse ? 'reverse' : ''}`} key={service.idService}>
                            <div className={`service-detail-img reveal ${isReverse ? 'reveal-right' : 'reveal-left'}`}>
                                <img src={service.image || ServicesImg} alt={service.titre} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '4px' }} />
                            </div>
                            <div className={`service-detail-text reveal ${isReverse ? 'reveal-left' : 'reveal-right'}`}>
                                <h2 style={{ textAlign: isReverse ? 'right' : 'left' }}>
                                    {titleParts.start}<span>{titleParts.end}</span>
                                </h2>
                                <p style={{ textAlign: isReverse ? 'right' : 'left' }}>
                                    {service.details}
                                </p>
                                <div style={{ display: 'flex', justifyContent: isReverse ? 'flex-end' : 'flex-start' }}>
                                    <button className="service-btn">CONTACTEZ NOUS</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* 3. CTA Section */}
            <section className="cta-banner">
                <div className="cta-content reveal reveal-up">
                    <h2>BESOIN D'UNE INTERVENTION <span>RAPIDE ?</span></h2>
                    <p>Contactez-nous aujourd'hui pour être mis en relation avec nos experts.</p>
                    <button className="btn btn-white cta-btn">CONTACTEZ-NOUS</button>
                </div>
            </section>
        </div>
    );
};

export default Services;
