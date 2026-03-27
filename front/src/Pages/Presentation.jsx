import ServicesImg from '../Images/services.jpg';
import '../Styles/Presentation.css';

const Presentation = () => {
    return (
        <div className="presentation-page">
            {/* 1. Hero Content */}
            <div className="presentation-banniere reveal reveal-up">
                <div className="banniere-text-box reveal reveal-up delay-200">
                    <h2>NOS EQUIPES AUX SERVICES</h2>
                    <h2>DE VOS<span className="highlight-bg">INSTALLATIONS</span></h2>
                </div>
            </div>

            {/* 2. Expertise Block */}
            <section className="aboutus2-section">
                <div className="section-tittle-box reveal reveal-up">
                    <p className="section-subtitle">QUI SOMMES-NOUS</p>
                    <h2 className="section-title">UNE EXPERTISE TECHNIQUE AU SERVICE <br /><span>DE VOS PROJETS</span></h2>
                </div>
                <div className="about-us-2-content">
                    <div className="aboutus2-images reveal reveal-left">
                        <div className="aboutus2-img-col"></div>
                        <div className="aboutus2-img-col"></div>
                        <div className="aboutus2-img-col"></div>
                    </div>
                    <div className="aboutus2-text reveal reveal-right">
                        <p>
                            <strong>PREFCI-BAT SARL</strong> est une entreprise leader dans le domaine de la plomberie et de la climatisation. Nous mettons notre savoir-faire au service de particuliers et de professionnels pour des interventions rapides, des installations fiables et un suivi rigoureux.
                        </p>
                        <p>
                            De l'étude à l'exécution de vos projets, nous vous accompagnons grâce à une expertise technique éprouvée et un matériel de pointe. Notre priorité est de vous garantir des résultats irréprochables et de vous assurer confort et tranquillité d'esprit, quelles que soient les exigences de votre bâtiment.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Stats Section */}
            <section className="stats-section">
                {[
                    { label: "Années\nd'expérience", value: "10+" },
                    { label: "Délais\nd'intervention", value: "24H" },
                    { label: "Projets\nréalisés", value: "100+" },
                    { label: "Garantie\nde satisfaction", value: "100%" }
                ].map((stat, i) => (
                    <div className={`stat-item reveal reveal-up delay-${(i + 1) * 100}`} key={i}>
                        <h3>{stat.value}</h3>
                        <p>{stat.label.split('\n').map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
                    </div>
                ))}
            </section>

            {/* 4. Mission & Engagements */}
            <section className="mission-section">
                <div className="aboutus">
                    <div className="aboutus-image reveal reveal-left">
                        <div className="cadre-bleu"></div>
                        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" alt="Technicien avec mallette" />
                    </div>
                    <div className="aboutus-text reveal reveal-right">
                        <h4 className="section-subtitle-left">NOTRE MISSION</h4>
                        <h2 className="section-title-left">APPORTER DES SOLUTIONS DURABLES <br /><span>À CHAQUE PROJET</span></h2>
                        <p>
                            La mission de PREFCI-BAT SARL est de proposer des solutions techniques optimales, respectueuses des normes de sécurité et de l'environnement. Nos équipes sont formées pour répondre aux défis techniques avec réactivité et professionnalisme.                        </p>
                        <p>
                            Nous mettons un point d'honneur à satisfaire nos clients à chaque étape du projet.
                        </p>
                    </div>
                </div>
            </section>


            <section className="mission-section">
                <div className="aboutus">
                    <div className="aboutus-text reveal reveal-left">
                        <h4 className="section-subtitle-left">NOS VALEURS</h4>
                        <h2 className="section-title-left">DES ENGAGEMENTS QUI GUIDENT <br /><span>CHACUNE DE NOS INTERVENTIONS</span></h2>
                        <p>Chez PREFCI-BAT SARL, nous nous engageons sur différents piliers fondamentaux :</p>
                        <ul>
                            <li><strong>L'Excellence :</strong> la recherche constante de la perfection dans nos réalisations et finitions.</li>
                            <li><strong>La Réactivité :</strong> une équipe prête à intervenir rapidement face aux urgences.</li>
                            <li><strong>La Sécurité :</strong> le respect strict des normes pour des installations pérennes et sécurisées.</li>
                            <li><strong>L'Écoute :</strong> un accompagnement sur mesure pour comprendre et anticiper vos besoins.</li>
                        </ul>
                    </div>
                    <div className="aboutus-image reveal reveal-right">
                        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" alt="Technicien avec mallette" />
                        <div className="cadre-bleu2"></div>
                    </div>
                </div>
            </section>

            {/* 5. Services Section (Reusing classes from Accueil) */}
            <section className="services-section">
                <div className="section-tittle-box reveal reveal-up">
                    <h4 className="section-subtitle">NOS EXPERTISES</h4>
                    <h2 className="section-title">DES SOLUTIONS <br /><span>ADAPTÉES À CHAQUE SITUATION</span></h2>
                    <p className="services-desc2">
                        Nous proposons une large gamme de services pour répondre à tous vos besoins d'installation, de réparation et d'entretien.
                    </p>
                </div>
                <div className="services">
                    {[
                        { title: 'Plomberie', desc: 'Installation, réparation, fuite' },
                        { title: 'Etanchéité', desc: 'Installation, réparation, fuite' },
                        { title: 'Froid & Climatisation', desc: 'Installation, réparation, fuite' }
                    ].map((service, i) => (
                        <div 
                            className={`service-card reveal reveal-up delay-${(i + 1) * 100}`} 
                            key={i} 
                        >
                            <div className="service-img">
                                <div className="service-info">
                                    <h3 className='service-titre'>{service.title}</h3>
                                    <p className='service-description'>{service.desc}</p>
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
                    <h2 className="section-title">POURQUOI TRAVAILLER <br /><span>AVEC NOUS ?</span></h2>
                    <p className="services-desc2">
                        Nous mettons à votre service une équipe expérimentée et des équipements modernes pour des résultats impeccables.
                    </p>
                </div>

                <div className="raisons-grid">
                    {[
                        { icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "RAISON 01", text: "Une expertise reconnue dans le domaine, garantissant une intervention efficace et rapide quel que soit votre problème." },
                        { icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "RAISON 02", text: "Des délais de réalisation respectés afin de vous permettre de retrouver rapidement votre confort optimal." },
                        { icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "RAISON 03", text: "Un matériel professionnel et des matériaux de haute qualité pour toutes nos installations et réparations." },
                        { icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>, title: "RAISON 04", text: "Une tarification transparente et sans surprise : nous vous fournissons un devis détaillé avant chaque intervention." }
                    ].map((raison, i) => (
                        <div className={`raison-card reveal reveal-up delay-${(i + 1) * 100}`} key={i}>
                            <div className="raison-icon">{raison.icon}</div>
                            <div className="raison-text">
                                <h4>{raison.title.split(' ')[0]} <span>{raison.title.split(' ')[1]}</span></h4>
                                <p>{raison.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="directeur-section">
                <div className="aboutus">
                    <div className="aboutus-image reveal reveal-left">
                        <img className="directeur-img" src={ServicesImg} alt="Technicien avec mallette" />
                        <div className="cadre-bleu3"></div>
                    </div>
                    <div className="aboutus-text reveal reveal-right">
                        <span className="section-subtitle-left">MOT DU DIRECTEUR</span>
                        <h2 className="section-title-left2">WILLIAMS KOFFI</h2>
                        <span>
                            " Chez PREFCI-BAT SARL, nous avons fait le choix de placer l'humain et la qualité de service au cœur de notre métier. Depuis nos débuts, l'exigence des interventions et des chantiers bien conçus montre l'importance de faire un travail d'une qualité infaillible."
                        </span>
                        <span>
                            "Chaque projet que nous réalisons est le reflet de notre engagement. Le dynamisme et l'expertise de notre équipe nous permettent de proposer des résultats à la hauteur des attentes de nos clients. Nous restons disponibles et attentifs, garantissant la confiance mutuelle."
                        </span>
                        <span>
                            "Nous vous remercions pour travailler avec nous ; notre équipe est toujours prêt à s'engager avec sérieux pour répondre à toutes vos exigences."
                        </span>
                    </div>
                </div>
            </section>

            {/* 7. Team Section */}
            <section className="team-section">
                <div className="section-tittle-box reveal reveal-up">
                    <h4 className="section-subtitle">NOTRE ÉQUIPE</h4>
                    <h2 className="section-title">DES PROFESSIONNELS ENGAGÉS À <br /><span>VOS CÔTÉS</span></h2>
                    <p className="services-desc">
                        Découvrez les membres de notre équipe qui œuvrent chaque jour pour la réussite de vos projets.
                    </p>
                </div>

                <div className="team-grid">
                    {[1, 2, 3, 4].map((member, index) => (
                        <div 
                            className={`team-card reveal reveal-up delay-${(index + 1) * 100}`} 
                            key={member}
                        >
                            <div className="team-header">
                                <h4 className="team-name">Sophia Bennett</h4>
                                <p className="team-role">Ingénieur plombier</p>
                            </div>
                            <div className="team-img">
                                <img src={ServicesImg} alt="Team Member" />
                            </div>
                            <div className="team-social">
                                {['LinkedIn', 'Instagram', 'Facebook', 'X', 'YouTube'].map((social, i) => (
                                    <a href="#" aria-label={social} key={i}>
                                        {/* Simplified SVG mapping for brevity in placeholder */}
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                            {social === 'LinkedIn' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>}
                                            {social !== 'LinkedIn' && <circle cx="12" cy="12" r="10" />}
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
