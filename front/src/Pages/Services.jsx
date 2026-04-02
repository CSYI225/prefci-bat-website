import { useState, useEffect } from 'react';
import '../Styles/Services.css';
import '../Styles/Accueil.css'; // For common CTA banner
import ServicesImg from '../Images/services.jpg';
import BanniereImg from '../Images/BanniereAccueil.png';
import ContactImg from '../Images/contact.png';
import { NavLink } from 'react-router-dom';

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
            details: "La mission de PREFCI-BAT SARL est d'accompagner ses clients dans la réalisation de travaux techniques en fournissant des solutions fiables, adaptées et exécutées avec rigueur, dans le respect des délais et des exigences du terrain.",
            image: ContactImg
        }
    ];

    const [services, setServices] = useState(defaultServices);
    const [banner, setBanner] = useState({ titreNoir: "NOS SERVICES", titreBleu: "RÉSULTATS VISIBLES", image: "" });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    useEffect(() => {
        // Fetch Services
        fetch(`${API_URL}/admin/services`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Filter out database error placeholders
                    const cleaned = data.map((s, index) => {
                        // Use regex for more robust detection of the error string
                        const isError = s.details && /Erreur lors de la sauvegarde/.test(s.details);

                        // Flexible match: normailze & to ET for comparison
                        const normalize = (t) => t?.toUpperCase().replace(/&/g, 'ET').replace(/\s+/g, ' ').trim() || '';
                        const sTitreNorm = normalize(s.titre);

                        const fallback = defaultServices.find(ds => {
                            const dsTitreNorm = normalize(ds.titre);
                            return (dsTitreNorm && sTitreNorm && (dsTitreNorm.includes(sTitreNorm) || sTitreNorm.includes(dsTitreNorm))) ||
                                (ds.id_service === s.idService || ds.id_service === s.id_service || ds.id_service === s.id);
                        });

                        return {
                            ...s,
                            id: s.idService || s.id_service || s.id || `service-${index}`,
                            details: isError ? (fallback?.details || s.details) : s.details
                        };
                    });
                    setServices(cleaned);
                }
            })
            .catch(err => console.warn("Using default Services content", err));

        // Fetch Banner
        fetch(`${API_URL}/pages/services`)
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
            <div className="services-banniere reveal reveal-up !h-[60vh] md:!h-[70vh]">
                {banner.image && (
                    <>
                        <img src={banner.image} alt="Banniere" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: -1 }}></div>
                    </>
                )}
                <div className="banniere-text-box reveal reveal-up delay-200 !px-4 md:!px-8" style={{ padding: '2rem', borderRadius: '10px' }}>
                    <h2 className="!text-[2.2rem] md:!text-[3.5rem] text-center">{banner.titreNoir}</h2>
                    <h2 className="!text-[2.2rem] md:!text-[3.5rem] text-center mt-2 md:mt-0"><span className="highlight-bg">{banner.titreBleu}</span></h2>
                </div>
            </div>

            {/* 2. Detailed Services Zigzag */}
            <section className="services-details-section !px-[5vw] lg:!px-[10vw] !gap-[60px] lg:!gap-[100px] !py-[60px] lg:!py-[100px]">
                {services.map((service, index) => {
                    const isReverse = index % 1 !== 0;
                    const titleParts = formatTitle(service.titre);
                    return (
                        <div
                            className={`service-detail-row ${isReverse ? 'reverse' : ''} !flex-col lg:!flex-row !gap-[30px] lg:!gap-[60px]`}
                            key={service.id || index}
                        >
                            <div className={`service-detail-img reveal ${isReverse ? 'reveal-right lg:order-2' : 'reveal-left'} !w-full lg:!w-[45%] !h-[260px] lg:!h-[450px]`}>
                                <img src={service.image || ServicesImg} alt={service.titre} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: '4px' }} />
                            </div>
                            <div className={`service-detail-text reveal ${isReverse ? 'reveal-left lg:order-1' : 'reveal-right'} !w-full lg:!w-[55%] !items-center lg:!items-start`}>
                                <h2 className="!text-center lg:!text-left" style={{ textAlign: isReverse ? 'right' : 'left' }}>
                                    {titleParts.start}<span>{titleParts.end}</span>
                                </h2>
                                <p className="!text-center lg:!text-left">
                                    {service.details}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* 5. CTA Section */}
            <section className="cta-banner !h-auto md:!h-[50vh] !py-20 md:!py-0 !mb-10 md:!mb-[100px]">
                <div className="cta-content flex-col items-center justify-center reveal reveal-up !w-[90vw] md:!w-[70vw] !h-auto md:!h-full !py-12 md:!py-0 md:rounded-none">
                    <h2 className="!text-[1.8rem] md:!text-[2.5rem] px-4 text-center">BESOIN D'UNE INTERVENTION <br className="md:hidden" /><span>RAPIDE ?</span></h2>
                    <p className="!text-[1rem] md:!text-[1.2rem] px-4 text-center">Contactez-nous aujourd'hui pour être mis en relation avec nos experts.</p>
                    <NavLink to="/Contact" className="btn btn-white cta-btn">CONTACTEZ-NOUS</NavLink>
                </div>
            </section>
        </div>
    );
};

export default Services;
