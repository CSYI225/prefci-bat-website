import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { realisationsData } from '../Data/realisations.js';
import '../Styles/Realisations.css';
import '../Styles/Accueil.css'; // For common CTA banner

const Realisations = () => {
    // Data moved to ../Data/realisations.js

    const [activeFilter, setActiveFilter] = useState('TOUTES');
    const [visibleCount, setVisibleCount] = useState(3);
    const [globalShowAfter, setGlobalShowAfter] = useState(false);
    const [manualStates, setManualStates] = useState({}); // { id: boolean }

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
        if (hash) {
            const projectId = hash.replace('#', '');
            const targetId = projectId.split('-')[1];
            
            // Find project to verify it exists and set matching filter if needed
            const project = realisationsData.find(p => p.id === parseInt(targetId));
            if (project) {
                setActiveFilter('TOUTES'); // Reset filter to make sure it's visible
                setVisibleCount(realisationsData.length); // Show all to be sure
            }

            setTimeout(() => {
                const element = document.getElementById(projectId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }, [hash]);

    // Re-reveal elements when filter or count changes
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [activeFilter, visibleCount]);

    const filteredData = activeFilter === 'TOUTES' 
        ? realisationsData 
        : realisationsData.filter(item => item.category === activeFilter);

    const displayedData = filteredData.slice(0, visibleCount);

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
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>DES INTERVENTIONS <span className="white-bg">CONCRETES,</span></h2>
                    <h2>DES<span className="highlight-bg">RESULTATS</span>VISIBLES</h2>
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
            <div className="filter-bar reveal reveal-up">
                {['TOUTES', 'PLOMBERIE', 'ÉTANCHÉITÉ', 'FROID ET CLIMATISATION'].map((filter, i) => (
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
                                        src={item.imgAfter} 
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
                                <h3>CLIENT : {item.client}</h3>
                                <p>
                                    À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement. À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement.
                                </p>
                                <h3>PROJET : {item.projet}</h3>
                                <p>
                                    À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement. À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement.
                                </p>
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
