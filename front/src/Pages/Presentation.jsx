import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ServicesImg from '../Images/services.jpg';
import '../Styles/Presentation.css';
import { NavLink } from 'react-router-dom';

const CountUpItem = ({ targetValue, duration = 700, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    // Extract number and static part (e.g., "15" and "+")
    const match = targetValue.toString().match(/(\d+)(.*)/);
    const targetNumber = match ? parseInt(match[1]) : 0;
    const itemSuffix = match ? match[2] : suffix;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsStarted(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isStarted) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * targetNumber));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isStarted, targetNumber, duration]);

    return (
        <h3 ref={elementRef}>{count}{itemSuffix}</h3>
    );
};

const Presentation = () => {
    const [data, setData] = useState({
        banniere: {
            titreNoir: "NOS EQUIPES AUX SERVICES",
            titreBleu: "INSTALLATIONS",
            image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80"
        },
        quiSommesNous: {
            titreNoir: "UNE EXPERTISE TECHNIQUE AU SERVICE",
            titreBleu: "DE VOS PROJETS",
            description: "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation...",
            image1: "https://images.unsplash.com/photo-1504148455328-497c596d2290?auto=format&fit=crop&w=800&q=80",
            image2: "https://images.unsplash.com/photo-1581092921461-7d15cb8905ed?auto=format&fit=crop&w=800&q=80",
            image3: "https://images.unsplash.com/photo-1581094281212-d1987ad05660?auto=format&fit=crop&w=800&q=80"
        },
        stats: [],
        mission: {
            titreNoir: "NOTRE",
            titreBleu: "MISSION",
            description: "Répondre à vos besoins avec rigueur.",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
        },
        valeurs: {
            titreNoir: "NOS",
            titreBleu: "VALEURS",
            description: "Excellence, Rigueur et Passion guidant chacun de nos projets.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        },
        nosServices: {
            titreNoir: "DES SOLUTIONS",
            titreBleu: "ADAPTÉES À CHAQUE SITUATION",
            description: "Nous proposons une large gamme de services pour répondre à tous vos besoins d'installation, de réparation et d'entretien."
        },
        pourquoiTravailler: {
            titreNoir: "POURQUOI TRAVAILLER",
            titreBleu: "AVEC NOUS ?",
            description: "Les avantages de collaborer avec nous.",
            raisons: []
        },
        motDirecteur: {
            nom: "Jean-Baptiste Koffi",
            message1: "Votre satisfaction est notre moteur au quotidien.",
            message2: "Nous engageons notre responsabilité sur chaque chantier.",
            message3: "",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
        },
        equipe: {
            titreNoir: "NOTRE",
            titreBleu: "ÉQUIPE",
            description: "Rencontrez les experts qui font notre force.",
            membres: []
        }
    });

    const [globalServices, setGlobalServices] = useState([]);
    const [realisationsData, setRealisationsData] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [teamIndex, setTeamIndex] = useState(0);
    const maxTeamIndex = Math.max(0, (data.equipe.membres?.length || 0) - 1);
    const nextTeamSlide = () => { if (teamIndex < maxTeamIndex) setTeamIndex(p => p + 1); };
    const prevTeamSlide = () => { if (teamIndex > 0) setTeamIndex(p => p - 1); };
    const teamProgressPercent = maxTeamIndex > 0 ? (teamIndex / maxTeamIndex) * 100 : 0;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const fixImagePath = (img) => {
        if (!img || typeof img !== 'string') return "";
        if (img.startsWith('data:') || img.startsWith('http') || img.startsWith('/')) return img;
        return `${API_URL}/uploads/${img}`;
    };

    useEffect(() => {
        // Fetch Page Content
        fetch(`${API_URL}/pages/presentation`)
            .then(res => res.json())
            .then(resData => {
                setData(prev => {
                    const merged = { ...prev };

                    if (resData.banniere) {
                        merged.banniere = {
                            ...resData.banniere,
                            image: fixImagePath(resData.banniere.image) || prev.banniere.image
                        };
                    }
                    if (resData.quiSommesNous) {
                        merged.quiSommesNous = {
                            ...resData.quiSommesNous,
                            image1: fixImagePath(resData.quiSommesNous.image1) || prev.quiSommesNous.image1 || "https://images.unsplash.com/photo-1504148455328-497c596d2290?auto=format&fit=crop&w=800&q=80",
                            image2: fixImagePath(resData.quiSommesNous.image2) || prev.quiSommesNous.image2 || "https://images.unsplash.com/photo-1581092921461-7d15cb8905ed?auto=format&fit=crop&w=800&q=80",
                            image3: fixImagePath(resData.quiSommesNous.image3) || prev.quiSommesNous.image3 || "https://images.unsplash.com/photo-1581094281212-d1987ad05660?auto=format&fit=crop&w=800&q=80"
                        };
                    }
                    if (resData.mission) {
                        merged.mission = {
                            ...resData.mission,
                            image: fixImagePath(resData.mission.image) || prev.mission.image
                        };
                    }
                    if (resData.valeurs) {
                        merged.valeurs = {
                            ...resData.valeurs,
                            image: fixImagePath(resData.valeurs.image) || prev.valeurs.image
                        };
                    }
                    if (resData.motDirecteur) {
                        merged.motDirecteur = {
                            ...resData.motDirecteur,
                            image: fixImagePath(resData.motDirecteur.image) || prev.motDirecteur.image
                        };
                    }
                    if (resData.equipe) {
                        merged.equipe = {
                            ...resData.equipe,
                            membres: (resData.equipe.membres || []).map(m => ({
                                ...m,
                                image: fixImagePath(m.image) || ServicesImg
                            }))
                        };
                    }
                    if (resData.pourquoiTravailler) {
                        merged.pourquoiTravailler = {
                            ...resData.pourquoiTravailler,
                            raisons: (resData.pourquoiTravailler.raisons || []).map(r => ({
                                ...r,
                                image: fixImagePath(r.image)
                            }))
                        };
                    }
                    if (resData.stats) merged.stats = resData.stats;
                    if (resData.expertise) merged.expertise = resData.expertise;

                    return merged;
                });
            })
            .catch(err => console.warn("Using default Presentation content", err));

        // Fetch Accueil page content to get the same services as the Home page
        fetch(`${API_URL}/pages/accueil`)
            .then(res => res.json())
            .then(accueilData => {
                const nosServicesContent = accueilData?.nosServices?.services;
                if (nosServicesContent) {
                    setGlobalServices(nosServicesContent.map(s => ({
                        ...s,
                        image: fixImagePath(s.image),
                        titre: s.nom || s.titre // normalise le nom du champ
                    })));
                }

                // Sync Presentation services section with Accueil data
                if (accueilData.nosServices) {
                    setData(prev => ({
                        ...prev,
                        nosServices: {
                            ...prev.nosServices,
                            titreNoir: accueilData.nosServices.titreNoir || prev.nosServices.titreNoir,
                            titreBleu: accueilData.nosServices.titreBleu || prev.nosServices.titreBleu,
                            description: accueilData.nosServices.description || prev.nosServices.description
                        }
                    }));
                }

                if (nosServicesContent && nosServicesContent.length > 0) {
                    // already set above
                } else {
                    // Fallback : services du module Services (ServicesAdmin)
                    fetch(`${API_URL}/services`)
                        .then(res => res.json())
                        .then(sData => {
                            if (sData && sData.length > 0) {
                                setGlobalServices(sData.map(s => ({
                                    ...s,
                                    image: fixImagePath(s.image)
                                })));
                            }
                        })
                        .catch(err => console.warn('Using fallback services', err));
                }
            })
            .catch(() => {
                // Fallback si /pages/accueil est inaccessible
                fetch(`${API_URL}/services`)
                    .then(res => res.json())
                    .then(sData => {
                        if (sData && sData.length > 0) {
                            setGlobalServices(sData.map(s => ({
                                ...s,
                                image: fixImagePath(s.image)
                            })));
                        }
                    })
                    .catch(err => console.warn('Using fallback services', err));
            });

        // Fetch Realisations for fallback images on service cards
        fetch(`${API_URL}/realisations`)
            .then(res => res.json())
            .then(rData => { if (rData && rData.length > 0) setRealisationsData(rData); })
            .catch(() => { });
    }, []);

    const formatParagraphs = (text) => (text || '').split('\n').map((str, idx) => <p key={idx}>{str}</p>);

    return (
        <div className="presentation-page">
            {/* 1. Hero Content */}
            <div className="presentation-banniere reveal reveal-up !h-[60vh] md:!h-[70vh]">
                {data.banniere.image && (
                    <>
                        <img src={data.banniere.image} alt="Banniere" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: -1 }}></div>
                    </>
                )}
                <div className="banniere-text-box reveal reveal-up delay-200 !px-4 md:!px-8" style={{ padding: '2rem', borderRadius: '10px' }}>
                    <h2 className="!text-[2.2rem] md:!text-[3.5rem] text-center">{data.banniere.titreNoir || 'NOS EQUIPES AUX SERVICES'}</h2>
                    <h2 className="!text-[2.2rem] md:!text-[3.5rem] text-center mt-2 md:mt-0">DE VOS<span className="highlight-bg">{data.banniere.titreBleu || 'INSTALLATIONS'}</span></h2>
                </div>
            </div>

            {/* 2. Expertise Block */}
            <section className="aboutus2-section">
                <div className="section-tittle-box reveal reveal-up">
                    <p className="section-subtitle">QUI SOMMES-NOUS</p>
                    <h2 className="section-title text-center">{data.quiSommesNous.titreNoir} <br className="md:hidden" /><span>{data.quiSommesNous.titreBleu}</span></h2>
                </div>
                <div className="about-us-2-content !min-h-[400px] lg:!h-[50vh]">
                    <div className="aboutus2-images reveal reveal-left !h-full !min-h-[300px] flex gap-4">
                        <div className="aboutus2-img-col !h-[300px] lg:!h-[80%] flex-1" style={{ backgroundImage: `url(${data.quiSommesNous.image1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                        <div className="aboutus2-img-col !h-[350px] lg:!h-[100%] flex-1" style={{ backgroundImage: `url(${data.quiSommesNous.image2})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                        <div className="aboutus2-img-col !h-[300px] lg:!h-[80%] flex-1" style={{ backgroundImage: `url(${data.quiSommesNous.image3})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#ddd' }}></div>
                    </div>
                    <div className="aboutus2-text reveal reveal-right">
                        {formatParagraphs(data.quiSommesNous.description)}
                    </div>
                </div>
            </section>

            {/* 3. Stats Section */}
            <section className="stats-section !h-auto md:!h-[250px] !py-10 md:!py-0 !flex-col md:!flex-row gap-10 md:gap-0">
                {(data.stats || []).map((stat, i) => (
                    <div className={`stat-item reveal reveal-up delay-${(i + 1) * 100} !w-full md:!w-[25%]`} key={stat.id || i}>
                        <CountUpItem targetValue={stat.value} />
                        <p style={{ whiteSpace: 'pre-line' }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* 4. Mission & Valeurs */}
            <section className="mission-section !h-auto lg:!h-[80vh] !py-20 lg:!py-0">
                <div className="aboutus !w-[90vw] lg:!w-[80vw] !h-auto lg:!h-[80vh] !flex-col lg:!flex-row gap-16 lg:gap-0">
                    <div className="aboutus-image reveal reveal-left !w-full lg:!w-[40%] flex justify-center lg:block">
                        <div className="cadre-bleu3 hidden lg:block"></div>
                        <img src={data.mission.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"} alt="Mission" className="!w-[300px] lg:!w-[400px] !h-[300px] lg:!h-[400px] z-10 relative object-cover" />
                    </div>
                    <div className="aboutus-text reveal reveal-right !w-full lg:!w-[57%] !text-center lg:!text-left">
                        <h4 className="section-subtitle-left">NOTRE MISSION</h4>
                        <h2 className="section-title-left">{data.mission.titreNoir} <br className="lg:hidden" /><span>{data.mission.titreBleu}</span></h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{data.mission.description}</p>
                    </div>
                </div>
            </section>

            <section className="mission-section !h-auto lg:!h-[80vh] !py-20 lg:!py-0">
                <div className="aboutus !w-[90vw] lg:!w-[80vw] !h-auto lg:!h-[80vh] !flex-col-reverse lg:!flex-row gap-16 lg:gap-0">
                    <div className="aboutus-text2 reveal reveal-left !w-full lg:!w-[57%] !text-center lg:!text-right">
                        <h4 className="section-subtitle-right">NOS VALEURS</h4>
                        <h2 className="section-title-right">{data.valeurs.titreNoir} <br className="lg:hidden" /><span>{data.valeurs.titreBleu}</span></h2>
                        <p style={{ whiteSpace: 'pre-line' }}>{data.valeurs.description}</p>
                    </div>
                    <div className="aboutus-image reveal reveal-right !w-full lg:!w-[40%] flex justify-center lg:block">
                        <img src={data.valeurs.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"} alt="Valeurs" className="!w-[300px] lg:!w-[400px] !h-[300px] lg:!h-[400px] z-10 relative object-cover" />
                        <div className="cadre-bleu2 hidden lg:block"></div>
                    </div>
                </div>
            </section>

            {/* 5. Services Section (Global) */}
            <section className="services-section !h-auto lg:!h-[100vh] !py-20 lg:!py-0">
                <div className="section-tittle-box reveal reveal-up !w-[90vw] lg:!w-[70vw] !h-auto lg:!h-[30vh] mb-10 lg:mb-0">
                    <h4 className="section-subtitle">NOS EXPERTISES</h4>
                    <h2 className="section-title">{data.nosServices.titreNoir} <br /><span>{data.nosServices.titreBleu}</span></h2>
                    <p className="services-desc2 !w-full lg:!w-[65vw]" style={{ whiteSpace: 'pre-line' }}>{data.nosServices.description}</p>
                </div>
                <div className="services !w-[90vw] lg:!w-[75vw] !h-auto lg:!h-[55vh] !flex-col lg:!flex-row gap-8 lg:gap-0">
                    {(globalServices.length > 0 ? globalServices : [
                        { titre: 'Plomberie', description: 'Installation, réparation, fuite' },
                        { titre: 'Etanchéité', description: 'Installation, réparation, fuite' },
                        { titre: 'Froid & Climatisation', description: 'Installation, réparation, fuite' }
                    ]).map((service, i) => {
                        const fallbackImg = realisationsData && realisationsData.length > 0
                            ? (realisationsData[i % realisationsData.length]?.imageAvant || realisationsData[i % realisationsData.length]?.imgBefore)
                            : "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80";

                        const finalImage = (service.image && typeof service.image === 'string')
                            ? (service.image.startsWith('data:') || service.image.startsWith('http') || service.image.startsWith('/')
                                ? service.image
                                : `${API_URL}/uploads/${service.image}`)
                            : (fallbackImg && typeof fallbackImg === 'string' && (fallbackImg.startsWith('data:') || fallbackImg.startsWith('http') || fallbackImg.startsWith('/'))
                                ? fallbackImg
                                : (fallbackImg && typeof fallbackImg === 'string'
                                    ? `${API_URL}/uploads/${fallbackImg}`
                                    : ServicesImg));

                        return (
                            <Link
                                to={`/Services#service-${service.id_service || service.idService || service.id || (i + 1)}`}
                                className={`service-card reveal reveal-up delay-${(i + 1) * 100} !w-full lg:!w-[30%] !h-[300px] lg:!h-full`}
                                key={service.id_service || service.idService || service.id || i}
                            >
                                <div className="service-img" style={{ backgroundImage: `url(${finalImage})` }}>
                                    <div className="service-info">
                                        <h3 className='service-titre'>{service.titre || service.nom}</h3>
                                        <p className='service-description'>{service.description}</p>
                                    </div>
                                    <div className="service-overlay"></div>
                                    <div className="service-icon-btn">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* 6. Pourquoi Travailler Avec Nous */}
            <section className="pourquoi-section !h-auto lg:!min-h-[100vh] !py-20 lg:!py-32">
                <div className="section-tittle-box reveal reveal-up !w-[90vw] lg:!w-[70vw] !h-auto mb-10 lg:mb-20">
                    <h4 className="section-subtitle">VOTRE SATISFACTION, NOTRE PRIORITÉ</h4>
                    <h2 className="section-title text-center">{data.pourquoiTravailler.titreNoir} <br className="md:hidden" /><span>{data.pourquoiTravailler.titreBleu}</span></h2>
                    <p className="services-desc2 !w-[90vw] lg:!w-[65vw]">{data.pourquoiTravailler.description}</p>
                </div>

                <div className="raisons-grid !h-auto !grid-cols-1 md:!grid-cols-2 gap-12 px-4 lg:px-0">
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

            <section className="directeur-section !h-auto !py-20 lg:!py-32">
                <div className="aboutus !w-[90vw] lg:!w-[80vw] !h-auto lg:!h-[60vh] !flex-col lg:!flex-row gap-16 lg:gap-0">
                    <div className="aboutus-image reveal reveal-left !w-full lg:!w-[40%] flex justify-center lg:block lg:!mb-[130px]">
                        <img className="directeur-img !w-[300px] lg:!w-[400px] !h-[300px] lg:!h-[400px] z-10 relative object-cover" src={data.motDirecteur.image || ServicesImg} alt="Directeur" />
                        <div className="cadre-bleu4 hidden lg:block"></div>
                    </div>
                    <div className="aboutus-text reveal reveal-right !w-full lg:!w-[57%] !text-center lg:!text-left">
                        <span className="section-subtitle-left">MOT DU DIRECTEUR</span>
                        <h2 className="section-title-left2">{data.motDirecteur.nom}</h2>
                        <span style={{ whiteSpace: 'pre-line', display: 'block', marginBottom: '10px' }} className="mx-auto lg:mx-0">{data.motDirecteur.message1}</span>
                        <span style={{ whiteSpace: 'pre-line', display: 'block', marginBottom: '10px' }} className="mx-auto lg:mx-0">{data.motDirecteur.message2}</span>
                    </div>
                </div>
            </section>

            {/* 7. Team Section */}
            {/* <section className="team-section !h-auto lg:!min-h-[100vh] !py-20 lg:!py-32">
                <div className="section-tittle-box reveal reveal-up !w-[90vw] lg:!w-[70vw] !h-auto mb-10 lg:mb-20">
                    <h4 className="section-subtitle">NOTRE ÉQUIPE</h4>
                    <h2 className="section-title text-center">{data.equipe.titreNoir} <br /><span>{data.equipe.titreBleu}</span></h2>
                    <p className="services-desc2 !w-full lg:!w-[65vw]" style={{ marginTop: '10px' }}>{data.equipe.description}</p>
                </div>

                {isMobile ? (
                    <div className="team-carousel-container">
                        <div className="team-carousel-track" style={{ transform: `translateX(-${teamIndex * 100}%)` }}>
                            {(data.equipe.membres || []).map((member, index) => (
                                <div className="team-carousel-slide" key={member.id || index}>
                                    <div className="team-card">
                                        <div className="team-header">
                                            <h4 className="team-name">{member.nom}</h4>
                                        </div>
                                        <div className="team-img">
                                            <img src={member.image || ServicesImg} alt={member.nom} />
                                        </div>
                                        <p className="team-role">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {data.equipe.membres?.length > 1 && (
                            <div className="center-controls" style={{ marginTop: '30px' }}>
                                <div className="carousel-controls" style={{ width: '80%', maxWidth: '300px' }}>
                                    <button
                                        className="carousel-btn prev-btn"
                                        onClick={prevTeamSlide}
                                        disabled={teamIndex === 0}
                                        style={{ opacity: teamIndex === 0 ? 0.5 : 1 }}
                                    >
                                        &lt;
                                    </button>
                                    <div className="carousel-progress">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${teamProgressPercent}%`, transition: 'width 0.3s ease' }}
                                        ></div>
                                    </div>
                                    <button
                                        className="carousel-btn next-btn"
                                        onClick={nextTeamSlide}
                                        disabled={teamIndex === maxTeamIndex}
                                        style={{ opacity: teamIndex === maxTeamIndex ? 0.5 : 1 }}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="team-grid !h-auto lg:!h-[60vh] !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 px-4 lg:px-0 gap-8">
                        {(data.equipe.membres || []).map((member, index) => (
                            <div className={`team-card reveal reveal-up delay-${(index + 1) * 100}`} key={member.id || index}>
                                <div className="team-header">
                                    <h4 className="team-name">{member.nom}</h4>
                                </div>
                                <div className="team-img">
                                    <img src={member.image || ServicesImg} alt={member.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <p className="team-role">{member.role}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section> */}

            <section className="cta-banner !h-auto md:!h-[50vh] !py-20 md:!py-0 !mb-10 md:!mb-[100px]">
                <div className="cta-content !w-[90vw] md:!w-[70vw] !h-auto md:!h-full !py-12 md:!py-0 md:rounded-none">
                    <h2 className="!text-[1.8rem] md:!text-[2.5rem] px-4">PRÊT À TRAVAILLER <br className="md:hidden" /><span>AVEC NOUS ?</span></h2>
                    <p className="!text-[1rem] md:!text-[1.2rem] px-4">Un projet, une urgence ? Nous sommes à votre écoute.</p>
                    <NavLink to="/Contact" className="btn btn-white cta-btn">CONTACTEZ-NOUS</NavLink>
                </div>
            </section>

        </div>
    );
};

export default Presentation;
