import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { realisationsData as fallbackReals } from '../Data/realisations.js';
import '../Styles/Realisations.css';
import '../Styles/Accueil.css'; // For common CTA banner

const Realisations = () => {
    const [realisationsData, setRealisationsData] = useState([]);
    const [categories, setCategories] = useState(['TOUTES']);
    const [activeFilter, setActiveFilter] = useState('TOUTES');
    const [visibleCount, setVisibleCount] = useState(3);
    const [globalShowAfter, setGlobalShowAfter] = useState(false);
    const [manualStates, setManualStates] = useState({}); // { id: boolean }
    const [banner, setBanner] = useState({ titreNoir: "NOS RÉALISATIONS", titreBleu: "RÉSULTATS VISIBLES", image: "" });

    // Fetch initial API data
    useEffect(() => {
        // Fetch Realisations
        fetch('http://localhost:3000/admin/realisations')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const mapped = data.map(r => ({
                        id: r.idRealisation,
                        titreClient: r.nomClient || 'Client Anonyme',
                        titreProjet: r.titre,
                        desc: r.descriptionProjet || '',
                        clientDesc: r.descriptionClient || '',
                        imgBefore: r.imageAvant || '',
                        imgAfter: r.imageApres || '',
                        category: r.categorie?.nom || 'NON CLASSÉ'
                    }));
                    setRealisationsData(mapped);

                    // Extract unique categories
                    const uniqueCats = ['TOUTES', ...new Set(mapped.map(m => (m.category || 'AUTRE').trim().toUpperCase()))];
                    setCategories(uniqueCats);
                } else {
                    // Inject Fallback structure matching mapped backend
                    const fb = fallbackReals.map(f => ({
                        id: f.id,
                        titreClient: "Anonyme",
                        titreProjet: f.title,
                        desc: f.desc,
                        clientDesc: fallbackReals[0].desc,
                        imgBefore: f.imgBefore,
                        imgAfter: f.imgBefore,
                        category: f.category || "INCONNU"
                    }));
                    setRealisationsData(fb);
                    setCategories(['TOUTES', 'PLOMBERIE', 'ÉTANCHÉITÉ', 'FROID ET CLIMATISATION']);
                }
            })
            .catch(err => {
                console.warn("Using default Realisations content", err);
                const fb = fallbackReals.map(f => ({
                    id: f.id,
                    titreClient: "Anonyme",
                    titreProjet: f.title,
                    desc: f.desc,
                    clientDesc: "Description client...",
                    imgBefore: f.imgBefore,
                    imgAfter: f.imgBefore,
                    category: f.category || "INCONNU"
                }));
                setRealisationsData(fb);
                setCategories(['TOUTES', 'PLOMBERIE', 'ÉTANCHÉITÉ', 'FROID ET CLIMATISATION']);
            });

        // Fetch Banner
        fetch('http://localhost:3000/admin/pages/realisations/content')
            .then(res => res.json())
            .then(pageData => {
                if (pageData && pageData.banniere) setBanner(pageData.banniere);
            })
            .catch(err => console.warn("Using default banner for Realisations", err));
    }, []);

    // Auto-toggle interval
    useEffect(() => {
        const interval = setInterval(() => {
            setGlobalShowAfter(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { hash } = useLocation();

    // Scroll to project if hash is present
    useEffect(() => {
        if (hash && realisationsData.length > 0) {
            const projectId = hash.replace('#', '');
            const targetId = projectId.split('-')[1];
            
            const project = realisationsData.find(p => p.id === parseInt(targetId));
            if (project) {
                setActiveFilter('TOUTES');
                setVisibleCount(realisationsData.length);
            }

            setTimeout(() => {
                const element = document.getElementById(projectId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }, [hash, realisationsData]);

    const filteredData = activeFilter === 'TOUTES' 
        ? realisationsData 
        : realisationsData.filter(item => (item.category || '').trim().toUpperCase() === activeFilter);

    const displayedData = filteredData.slice(0, Math.max(visibleCount, 3));

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setVisibleCount(3);
    };

    const handleManualToggle = (id, state) => {
        setManualStates(prev => ({ ...prev, [id]: state }));
    };

    return (
        <div className="realisations-page">
            {/* 1. Banner */}
            <div className="realisations-banniere reveal reveal-up">
                {banner.image && (
                    <img src={banner.image} alt="Banniere" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1}} />
                )}
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>{banner.titreNoir}</h2>
                    <h2><span className="highlight-bg">{banner.titreBleu}</span></h2>
                </div>
            </div>

            {/* 2. Header Box */}
            <div className="realisations-header reveal reveal-up">
                <p className="realisations-subtitle">NOS RÉALISATIONS</p>
                <h2 className="realisations-title">DES RÉSULTATS QUI PARLENT <span>POUR NOUS</span></h2>
                <p className="realisations-desc">
                    À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement.
                </p>
            </div>

            {/* 3. Filter Bar */}
            <div className="filter-bar reveal reveal-up" style={{ flexWrap: 'wrap' }}>
                {categories.map((filter) => (
                    <button 
                        key={filter}
                        className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => handleFilterChange(filter)}
                    >
                        {filter === 'TOUTES' ? 'TOUTES NOS RÉALISATIONS' : filter}
                    </button>
                ))}
            </div>

            {/* 4. Realisations List */}
            <div className="realisations-list" key={activeFilter}>
                {displayedData.length === 0 && (
                    <div className="no-results reveal reveal-up" style={{ textAlign: 'center', padding: '40px', gridColumn: '1/-1' }}>
                        <p>Aucune réalisation trouvée pour cette catégorie.</p>
                    </div>
                )}
                {displayedData.map((item, index) => {
                    const isAfter = manualStates[item.id] !== undefined 
                        ? manualStates[item.id] 
                        : globalShowAfter;
                    
                    return (
                        <div 
                            className={`realisation-card reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`} 
                            key={item.id}
                            id={`project-${item.id}`}
                        >
                            <div className="realisation-img-container">
                                <div className="image-wrapper">
                                    <img 
                                        src={item.imgBefore} 
                                        alt="Avant" 
                                        className={`before-img ${isAfter ? 'hidden' : 'visible'}`} 
                                    />
                                    <img 
                                        src={item.imgAfter || item.imgBefore} 
                                        alt="Après" 
                                        className={`after-img ${isAfter ? 'visible' : 'hidden'}`} 
                                    />
                                </div>
                                <div className="avant-apres-badge">
                                    <span 
                                        className={`avant ${!isAfter ? 'active' : ''}`}
                                        onClick={() => handleManualToggle(item.id, false)}
                                        style={{ cursor: 'pointer' }}
                                    >AVANT</span> 
                                    | 
                                    <span 
                                        className={`apres ${isAfter ? 'active' : ''}`}
                                        onClick={() => handleManualToggle(item.id, true)}
                                        style={{ cursor: 'pointer' }}
                                    >APRÈS</span>
                                </div>
                            </div>
                            <div className="realisation-text">
                                <h3>CLIENT : {item.titreClient}</h3>
                                <p>{item.clientDesc || item.desc}</p>
                                <h3>PROJET : {item.titreProjet}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    );
                })}
                
                {visibleCount < filteredData.length && (
                    <div className="voir-plus-container reveal reveal-up">
                        <button className="btn voir-plus-btn" onClick={() => setVisibleCount(prev => prev + 3)}>
                            VOIR PLUS
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* 5. CTA Section */}
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

export default Realisations;
