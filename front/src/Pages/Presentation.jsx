import { useState, useEffect } from 'react';
import ServicesImg from '../Images/services.jpg';
import '../Styles/Presentation.css';

const Presentation = () => {
    const [data, setData] = useState({
        banniere: { titreNoir: "NOS EQUIPES AUX SERVICES", titreBleu: "INSTALLATIONS", image: "" },
        quiSommesNous: {
            titreNoir: "UNE EXPERTISE TECHNIQUE AU SERVICE",
            titreBleu: "DE VOS PROJETS",
            description: "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation...",
            image1: "", image2: "", image3: ""
        },
        stats: [],
        mission: { titreNoir: "", titreBleu: "", description: "", image: "" },
        valeurs: { titreNoir: "", titreBleu: "", description: "", image: "" },
        expertise: { titreNoir: "DES SOLUTIONS", titreBleu: "ADAPTÉES À CHAQUE SITUATION", description: "Nous proposons une large gamme de services..." },
        pourquoiTravailler: { titreNoir: "POURQUOI TRAVAILLER", titreBleu: "AVEC NOUS ?", description: "", raisons: [] },
        motDirecteur: { nom: "", message1: "", message2: "", message3: "", image: "" },
        equipe: { titreNoir: "", titreBleu: "", description: "", membres: [] }
    });

    const [globalServices, setGlobalServices] = useState([]);
    const [realisationsData, setRealisationsData] = useState([]);

    useEffect(() => {
        // Fetch Page Content
        fetch('http://localhost:3000/pages/presentation')
            .then(res => res.json())
            .then(resData => {
                setData(prev => {
                    const merged = { ...prev };
                    Object.keys(resData).forEach(sectionKey => {
                        if (merged[sectionKey]) {
                            const serverSection = resData[sectionKey];
                            merged[sectionKey] = { ...merged[sectionKey], ...serverSection };
                        }
                    });
                    if (resData.stats) merged.stats = resData.stats;
                    if (resData.valeurs) merged.valeurs = resData.valeurs;
                    return merged;
                });
            })
            .catch(err => console.warn("Using default Presentation content", err));

        // Fetch Accueil page content to get the same services as the Home page
        fetch('http://localhost:3000/pages/accueil')
            .then(res => res.json())
            .then(accueilData => {
                const nosServicesContent = accueilData?.nosServices?.services;
                if (nosServicesContent && nosServicesContent.length > 0) {
                    setGlobalServices(nosServicesContent.map(s => ({
                        ...s,
                        titre: s.nom || s.titre // normalise le nom du champ
                    })));
                } else {
                    // Fallback : services du module Services (ServicesAdmin)
                    fetch('http://localhost:3000/services')
                        .then(res => res.json())
                        .then(sData => { if (sData && sData.length > 0) setGlobalServices(sData); })
                        .catch(err => console.warn('Using fallback services', err));
                }
            })
            .catch(() => {
                // Fallback si /pages/accueil est inaccessible
                fetch('http://localhost:3000/services')
                    .then(res => res.json())
                    .then(sData => { if (sData && sData.length > 0) setGlobalServices(sData); })
                    .catch(err => console.warn('Using fallback services', err));
            });

        // Fetch Realisations for fallback images on service cards
        fetch('http://localhost:3000/realisations')
            .then(res => res.json())
            .then(rData => { if (rData && rData.length > 0) setRealisationsData(rData); })
            .catch(() => { });
    }, []);

    const formatParagraphs = (text) => (text || '').split('\n').map((str, idx) => <p key={idx}>{str}</p>);

    return (
        <div className="presentation-page">
            {/* 1. Hero Content */}
            <div className="presentation-banniere reveal reveal-up">
                {data.banniere.image && (
                    <img src={data.banniere.image} alt="Banniere" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
                )}
                <div className="banniere-text-box reveal reveal-up delay-200" style={{ padding: '2rem', borderRadius: '10px' }}>
                    <h2>{data.banniere.titreNoir || 'NOS EQUIPES AUX SERVICES'}</h2>
                    <h2>DE VOS<span className="highlight-bg">{data.banniere.titreBleu || 'INSTALLATIONS'}</span></h2>
                </div>
            </div>

            {/* 2. Expertise Block */}
            <section className="aboutus2-section">
                <div className="section-tittle-box reveal reveal-up">
                    <p className="section-subtitle">QUI SOMMES-NOUS</p>
                    <h2 className="section-title">{data.quiSommesNous.titreNoir} <br /><span>{data.quiSommesNous.titreBleu}</span></h2>
                </div>
                <div className="about-us-2-content">
                    <div className="aboutus2-images reveal reveal-left">
                        <div className="aboutus2-img-col" style={{ backgroundImage: `url(${data.quiSommesNous.image1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                        <div className="aboutus2-img-col" style={{ backgroundImage: `url(${data.quiSommesNous.image2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                        <div className="aboutus2-img-col" style={{ backgroundImage: `url(${data.quiSommesNous.image3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                    </div>
                    <div className="aboutus2-text reveal reveal-right">
                        {formatParagraphs(data.quiSommesNous.description)}
                    </div>
                </div>
            </section>

            {/* 3. Stats Section */}
            <section className="stats-section">
                {(data.stats || []).map((stat, i) => (
                    <div className={`stat-item reveal reveal-up delay-${(i + 1) * 100}`} key={stat.id || i}>
                        <h3>{stat.value}</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* 4. Mission & Valeurs */}
            <section className="mission-section">
                <div className="aboutus">
                    <div className="aboutus-image reveal reveal-left">
                        <div className="cadre-bleu"></div>
                        <img src={data.mission.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"} alt="Mission" />
                    </div>
                    <div className="aboutus-text reveal reveal-right">
                        <h4 className="section-subtitle-left">NOTRE MISSION</h4>
                        <h2 className="section-title-left">{data.mission.titreNoir} <br /><span>{data.mission.titreBleu}</span></h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{data.mission.description}</p>
                    </div>
                </div>
            </section>

            <section className="mission-section">
                <div className="aboutus">
                    <div className="aboutus-text reveal reveal-left">
                        <h4 className="section-subtitle-left">NOS VALEURS</h4>
                        <h2 className="section-title-left">{data.valeurs.titreNoir} <br /><span>{data.valeurs.titreBleu}</span></h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{data.valeurs.description}</p>
                    </div>
                    <div className="aboutus-image reveal reveal-right">
                        <img src={data.valeurs.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"} alt="Valeurs" />
                        <div className="cadre-bleu2"></div>
                    </div>
                </div>
            </section>

            {/* 5. Services Section (Global) */}
            <section className="services-section">
                <div className="section-tittle-box reveal reveal-up">
                    <h4 className="section-subtitle">NOS EXPERTISES</h4>
                    <h2 className="section-title">{data.expertise.titreNoir} <br /><span>{data.expertise.titreBleu}</span></h2>
                    <p className="services-desc2">{data.expertise.description}</p>
                </div>
                <div className="services">
                    {(globalServices.length > 0 ? globalServices : [
                        { titre: 'Plomberie', description: 'Installation, réparation, fuite' },
                        { titre: 'Etanchéité', description: 'Installation, réparation, fuite' },
                        { titre: 'Froid & Climatisation', description: 'Installation, réparation, fuite' }
                    ]).map((service, i) => (
                        <div className={`service-card reveal reveal-up delay-${(i + 1) * 100}`} key={i}>
                            <div className="service-img" style={{ backgroundImage: service.image ? `url(${service.image})` : 'none' }}>
                                <div className="service-info">
                                    <h3 className='service-titre'>{service.titre || service.nom}</h3>
                                    <p className='service-description'>{service.description}</p>
                                </div>
                                <div className="service-overlay"></div>
                                <div className="service-icon-btn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Pourquoi Travailler Avec Nous */}
            <section className="pourquoi-section">
                <div className="section-tittle-box reveal reveal-up">
                    <h4 className="section-subtitle">VOTRE SATISFACTION, NOTRE PRIORITÉ</h4>
                    <h2 className="section-title">{data.pourquoiTravailler.titreNoir} <br /><span>{data.pourquoiTravailler.titreBleu}</span></h2>
                    <p className="services-desc2">{data.pourquoiTravailler.description}</p>
                </div>

                <div className="raisons-grid">
                    {(data.pourquoiTravailler.raisons || []).map((raison, i) => (
                        <div className={`raison-card reveal reveal-up delay-${(i + 1) * 100}`} key={raison.id || i}>
                            <div className="raison-icon">
                                {raison.image ? (
                                    <img src={raison.image} alt={raison.titre} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <div className="raison-text">
                                <h4>{raison.titre?.split(' ')[0]} <span>{raison.titre?.split(' ').slice(1).join(' ')}</span></h4>
                                <p>{raison.texte}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="directeur-section">
                <div className="aboutus">
                    <div className="aboutus-image reveal reveal-left">
                        <img className="directeur-img" src={data.motDirecteur.image || ServicesImg} alt="Directeur" />
                        <div className="cadre-bleu3"></div>
                    </div>
                    <div className="aboutus-text reveal reveal-right">
                        <span className="section-subtitle-left">MOT DU DIRECTEUR</span>
                        <h2 className="section-title-left2">{data.motDirecteur.nom}</h2>
                        <span style={{ whiteSpace: 'pre-line', display: 'block', marginBottom: '10px' }}>{data.motDirecteur.message1}</span>
                        <span style={{ whiteSpace: 'pre-line', display: 'block', marginBottom: '10px' }}>{data.motDirecteur.message2}</span>
                    </div>
                </div>
            </section>

            {/* 7. Team Section */}
            <section className="team-section">
                <div className="section-tittle-box reveal reveal-up">
                    <h4 className="section-subtitle">NOTRE ÉQUIPE</h4>
                    <h2 className="section-title">{data.equipe.titreNoir} <br /><span>{data.equipe.titreBleu}</span></h2>
                    <p className="services-desc2" style={{ marginTop: '10px' }}>{data.equipe.description}</p>
                </div>
                <div className="team-grid">
                    {(data.equipe.membres || []).map((member, index) => (
                        <div className={`team-card reveal reveal-up delay-${(index + 1) * 100}`} key={member.id || index}>
                            <div className="team-header">
                                <h4 className="team-name">{member.nom}</h4>
                                <p className="team-role">{member.role}</p>
                            </div>
                            <div className="team-img">
                                <img src={member.image || ServicesImg} alt={member.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="team-social">
                                {['LinkedIn', 'Facebook', 'X'].map((social, i) => (
                                    <a href="#" aria-label={social} key={i}>
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-banner">
                <div className="cta-content">
                    <h2>PRÊT À TRAVAILLER <span>AVEC NOUS ?</span></h2>
                    <p>Un projet, une urgence ? Nous sommes à votre écoute.</p>
                    <button className="btn btn-white cta-btn">CONTACTEZ-NOUS</button>
                </div>
            </section>

        </div>
    );
};

export default Presentation;
