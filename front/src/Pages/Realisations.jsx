import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { realisationsData as fallbackReals } from '../Data/realisations.js';
import '../Styles/Realisations.css';
import '../Styles/Accueil.css'; // For common CTA banner
import { NavLink } from 'react-router-dom';

const Realisations = () => {
    const [realisationsData, setRealisationsData] = useState([]);
    const [categories, setCategories] = useState(['TOUTES']);
    const [activeFilter, setActiveFilter] = useState('TOUTES');
    const [visibleCount, setVisibleCount] = useState(3);
    const [banner, setBanner] = useState({ titreNoir: "NOS RÉALISATIONS", titreBleu: "RÉSULTATS VISIBLES", image: "" });
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const fixImagePath = (img) => {
        if (!img) return "";
        if (img.startsWith('data:') || img.startsWith('http') || img.startsWith('/')) return img;
        return `${API_URL}/uploads/${img}`;
    };

    // Fetch initial API data
    useEffect(() => {
        // Fetch Realisations
        fetch(`${API_URL}/admin/realisations`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const mapped = data.map(r => ({
                        id: r.idRealisation,
                        titreClient: r.nomClient || 'Client Anonyme',
                        titreProjet: r.titre,
                        desc: r.descriptionProjet || '',
                        clientDesc: r.descriptionClient || '',
                        mainImage: fixImagePath(r.imageApres || r.imageAvant || ''),
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
                        mainImage: f.imgBefore || f.imgAfter,
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
                    mainImage: f.imgBefore || f.imgAfter,
                    category: f.category || "INCONNU"
                }));
                setRealisationsData(fb);
                setCategories(['TOUTES', 'PLOMBERIE', 'ÉTANCHÉITÉ', 'FROID ET CLIMATISATION']);
            });

        // Fetch Banner
        fetch(`${API_URL}/admin/pages/realisations/content`)
            .then(res => res.json())
            .then(pageData => {
                if (pageData && pageData.banniere) setBanner(pageData.banniere);
            })
            .catch(err => console.warn("Using default banner for Realisations", err));
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



    return (
        <div className="realisations-page">
            {/* 1. Banner */}
            <div className="realisations-banniere reveal reveal-up !h-[60vh] md:!h-[70vh]">
                {banner.image && (
                    <>
                        <img src={banner.image} alt="Banniere" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: -1 }}></div>
                    </>
                )}
                <div className="banniere-text-box reveal reveal-up delay-200 !px-4 md:!px-8 text-center mt-20 md:mt-0">
                    <h2 className="!text-[2rem] md:!text-[3.5rem]">{banner.titreNoir}</h2>
                    <h2 className="!text-[2rem] md:!text-[3.5rem] mt-2 md:mt-0"><span className="highlight-bg">{banner.titreBleu}</span></h2>
                </div>
            </div>

            {/* 2. Header Box */}
            <div className="realisations-header reveal reveal-up !px-4 md:!px-0 !text-center">
                <p className="realisations-subtitle">NOS RÉALISATIONS</p>
                <h2 className="realisations-title !text-[2rem] md:!text-[2.5rem]">DES RÉSULTATS QUI PARLENT <br className="md:hidden" /><span>POUR NOUS</span></h2>
                <p className="realisations-desc !w-full md:!w-[700px] !max-w-full">
                    À travers ces réalisations, découvrez comment nous avons aidé nos clients à résoudre leurs problèmes techniques efficacement.
                </p>
            </div>

            {/* 3. Filter Bar */}
            <div className="filter-bar reveal reveal-up !flex-col md:!flex-row !px-4 md:!px-0 !gap-4 md:!gap-2" style={{ flexWrap: 'wrap' }}>
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
                    return (
                        <div
                            className={`realisation-card reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} !flex-col lg:!flex-row !h-auto lg:!h-[450px] !w-[90vw] lg:!w-[75vw] mx-auto`}
                            key={item.id}
                            id={`project-${item.id}`}
                        >
                            <div className="realisation-img-container !w-full lg:!w-[45%] !h-[300px] lg:!h-full">
                                <img
                                    src={item.mainImage || 'https://via.placeholder.com/800x600?text=Realisation'}
                                    alt={item.titreProjet}
                                    className="main-realisation-img"
                                />
                            </div>
                            <div className="realisation-text !w-full lg:!w-[55%] !h-auto lg:!h-full !p-6 lg:!p-10">
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

export default Realisations;
