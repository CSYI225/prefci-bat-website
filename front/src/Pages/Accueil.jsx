import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Accueil.css';
import { realisationsData } from '../Data/realisations.js';
import Aduti from '../Images/aduti.png';
import SantaMaria from '../Images/SantaMaria.png';
import Eleveur from '../Images/eleveur.png';
import Qalilab from '../Images/qalilab.png';


const Accueil = () => {
  // Data moved to ../Data/realisations.js

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;
  const maxIndex = realisationsData.length - itemsToShow;
  const realDirectionRef = useRef(1);
  const isRealHovered = useRef(false);

  useEffect(() => {
    if (maxIndex <= 0) return;
    const interval = setInterval(() => {
      if (isRealHovered.current) return;
      setCurrentIndex(prev => {
        let next = prev + realDirectionRef.current;
        if (next >= maxIndex) {
          next = maxIndex;
          realDirectionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          realDirectionRef.current = 1;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const nextSlide = () => {
    realDirectionRef.current = 1;
    if (currentIndex < maxIndex) setCurrentIndex(prev => prev + 1);
  };
  const prevSlide = () => {
    realDirectionRef.current = -1;
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;

  const avisData = [
    { id: 1, name: 'Amonles William', role: 'Client satisfait', text: "Intervention très rapide et efficace pour mon problème de plomberie. Le technicien a été très professionnel. Je recommande vivement leurs services.", avatar: 'AW', stars: '★★★★★' },
    { id: 2, name: 'Jean Dupont', role: 'Professionnel', text: "J'ai fait appel à PREFCI pour une installation de climatisation et tout a été fait avec soin. Le résultat répond parfaitement à mes attentes.", avatar: 'JD', stars: '★★★★★' },
    { id: 3, name: 'Marie Curie', role: 'Particulier', text: "Une équipe dynamique et à l'écoute. Ils ont su trouver l'origine de ma fuite d'eau en un temps record et l'ont réparée avec beaucoup d'efficacité.", avatar: 'MC', stars: '★★★★★' },
    { id: 4, name: 'Koffi Laurent', role: 'Client régulier', text: "Service exceptionnel à chaque fois. Je travaille avec eux depuis 2 ans pour l'entretien de mes installations.", avatar: 'KL', stars: '★★★★★' },
    { id: 5, name: 'Paul Allen', role: 'Gérant', text: "Le meilleur rapport qualité/prix de la région. L'intervention était claire, devis respecté, et chantier laissé propre.", avatar: 'PA', stars: '★★★★☆' },
  ];

  const [avisIndex, setAvisIndex] = useState(0);
  const avisToShow = 3;
  const maxAvisIndex = avisData.length - avisToShow;
  const avisDirectionRef = useRef(1);
  const isAvisHovered = useRef(false);

  useEffect(() => {
    if (maxAvisIndex <= 0) return;
    const interval = setInterval(() => {
      if (isAvisHovered.current) return;
      setAvisIndex(prev => {
        let next = prev + avisDirectionRef.current;
        if (next >= maxAvisIndex) {
          next = maxAvisIndex;
          avisDirectionRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          avisDirectionRef.current = 1;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [maxAvisIndex]);

  const nextAvis = () => {
    avisDirectionRef.current = 1;
    if (avisIndex < maxAvisIndex) setAvisIndex(prev => prev + 1);
  };
  const prevAvis = () => {
    avisDirectionRef.current = -1;
    if (avisIndex > 0) setAvisIndex(prev => prev - 1);
  };

  const progressAvisPercent = maxAvisIndex > 0 ? (avisIndex / maxAvisIndex) * 100 : 0;

  return (
    <div className="accueil-page">

      {/* Hero Content */}
      <div className="banniere reveal reveal-up">
        <div className="banniere-text-box reveal reveal-up delay-200">
          <h2><span className="highlight-bg">FUITE OU ÉTANCHÉITÉ ?</span></h2>
          <h2>ON PROPOSE DES SOLUTIONS</h2>
          <h2><span className="highlight-bg">RAPIDES ET DURABLES</span></h2>
        </div>
      </div>

      {/* 1. About Section */}
      <section className="aboutus-section">
        <div className="aboutus">
          <div className="aboutus-image reveal reveal-left">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" alt="Technicien avec mallette" />
            <div className="cadre-bleu"></div>
          </div>
          <div className="aboutus-text reveal reveal-right">
            <h4 className="section-subtitle-left">QUI SOMMES-NOUS</h4>
            <h2 className="section-title-left">DES PROFESSIONNELS ENGAGÉS À <span>RÉSOUDRE VOS PROBLÈMES</span></h2>
            <p>
              <strong>PREFCI-BAT SARL</strong> est une entreprise leader dans le domaine de la plomberie et de la climatisation. Nous mettons notre savoir-faire au service de particuliers et de professionnels pour des interventions rapides, des installations fiables et un suivi rigoureux.
            </p>
            <p>
              De l'étude à l'exécution de vos projets, nous vous accompagnons grâce à une expertise technique éprouvée et un matériel de pointe. Notre priorité est de vous garantir des résultats irréprochables et de vous assurer confort et tranquillité d'esprit, quelles que soient les exigences de votre bâtiment.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="services-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">NOS EXPERTISES</h4>
          <h2 className="section-title2">DES SOLUTIONS <br /><span>ADAPTÉES À CHAQUE SITUATION</span></h2>
          <p className="services-desc">
            Nous proposons une large gamme de services pour répondre à tous vos besoins d'installation, de réparation et d'entretien.
          </p>
        </div>
        <div className="services">
          {[
            { title: "Plomberie", desc: "Installation, réparation, fuite" },
            { title: "Etanchéité", desc: "Installation, réparation, fuite" },
            { title: "Froid & Climatisation", desc: "Installation, réparation, fuite" }
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

      {/* 3. Realisations Section */}
      <section className="realisations-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">NOS RÉALISATIONS</h4>
          <h2 className="section-title">DES RÉSULTATS QUI PARLENT <span>POUR NOUS</span></h2>
          <p className="realisations-desc">
            Découvrez en images quelques-uns de nos projets récents. Une série de réalisations et d'interventions réussies qui témoignent de notre savoir-faire.
          </p>
        </div>
        <div className="gallery-carousel"
          onMouseEnter={() => isRealHovered.current = true}
          onMouseLeave={() => isRealHovered.current = false}
        >
          <div className="gallery-track" style={{ transform: `translateX(-${currentIndex * (220 + 20)}px)` }}>
            {realisationsData.map((item, index) => (
              <Link 
                to={`/Realisations#project-${item.id}`}
                className={`gallery-item ${index % 2 !== 0 ? 'odd-item-offset' : ''}`} 
                key={item.id}
              >
                <img src={item.imgBefore} alt={item.title} />
                <div className="gallery-overlay"></div>
                <div className="gallery-info">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="gallery-icon-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="center-controls">
            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn" 
                onClick={prevSlide}
                disabled={currentIndex === 0}
                style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
              >&lt;</button>
              <div className="carousel-progress">
                <div className="progress-bar" style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease' }}></div>
              </div>
              <button
                className="carousel-btn next-btn"
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                style={{ opacity: currentIndex === maxIndex ? 0.5 : 1 }}
              >&gt;</button>
            </div>
          </div>
        </div>
      </section>

      <section className="partenaires-section reveal reveal-up">
        <div className="section-tittle-box">
          <h4 className="section-subtitle">NOS PARTENAIRES</h4>
          <h2 className="section-title">ILS NOUS ONT FAIT <span>CONFIANCE</span></h2>
          <p className="partenaires-desc">
            Nous collaborons avec des fournisseurs et des entreprises de confiance pour vous garantir des prestations et des équipements de haute qualité.
          </p>
        </div>
        <div className="partenaires-grid">
          <img src={Aduti} alt="" />
          <img src={SantaMaria} alt="" />
          <img src={Eleveur} alt="" />
          <img src={Qalilab} alt="" />
          <img src={Aduti} alt="" />
          <img src={SantaMaria} alt="" />
          <img src={Eleveur} alt="" />
          <img src={Qalilab} alt="" />
          <img src={Aduti} alt="" />
          <img src={SantaMaria} alt="" />
          <img src={Eleveur} alt="" />
          <img src={Qalilab} alt="" />
        </div>
      </section>

      <section className="avis-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">AVIS DE NOS CLIENTS</h4>
          <h2 className="section-title2">CE QUE PENSENT <span>NOS CLIENTS</span></h2>
          <p className="avis-desc">Ces témoignages reflètent notre engagement envers un service de qualité et irréprochable.</p>
        </div>

        <div className="avis-carousel"
          onMouseEnter={() => isAvisHovered.current = true}
          onMouseLeave={() => isAvisHovered.current = false}
        >
          <div
            className="avis-track"
            style={{ transform: `translateX(-${avisIndex * (350 + 30)}px)` }}
          >
            {avisData.map(avis => (
              <div 
                className="avis-card" 
                key={avis.id}
              >
                <div className="avis-header">
                  <div className="avis-avatar">{avis.avatar}</div>
                  <div className="avis-info-text">
                    <h5>{avis.name}</h5>
                    <span className="avis-role">{avis.role}</span>
                  </div>
                </div>
                <div className="avis-body">
                  "{avis.text}"
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="center-controls">
          <div className="carousel-controls">
            <button
              className="carousel-btn prev-btn"
              onClick={prevAvis}
              disabled={avisIndex === 0}
              style={{ opacity: avisIndex === 0 ? 0.5 : 1 }}
            >&lt;</button>
            <div className="carousel-progress">
              <div className="progress-bar" style={{ width: `${progressAvisPercent}%`, transition: 'width 0.3s ease' }}></div>
            </div>
            <button
              className="carousel-btn next-btn"
              onClick={nextAvis}
              disabled={avisIndex === maxAvisIndex}
              style={{ opacity: avisIndex === maxAvisIndex ? 0.5 : 1 }}
            >&gt;</button>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section */}
      <section className="devis-section">
        <div className="devis">
          <div className="devis-text reveal reveal-left">
            <h4 className="section-subtitle-left">DEMANDER UN DEVIS GRATUIT</h4>
            <h2 className="section-title-left">RÉPONSE RAPIDE SOUS 24H <br /><span>SANS ENGAGEMENT</span></h2>
            <p>
              Remplissez ce formulaire et notre équipe se fera un plaisir de vous recontacter dans les plus brefs délais avec une estimation personnalisée.
            </p>
          </div>
          <div className="devis-form-container reveal reveal-right">
            <form className="devis-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row grid-2-col">
                <input type="text" placeholder="Nom" required />
                <input type="text" placeholder="Prénom(s)" required />
              </div>
              <div className="form-row grid-2-col">
                <input type="email" placeholder="Email" required />
                <input type="tel" placeholder="Téléphone" required />
              </div>
              <div className="form-row">
                <select required>
                  <option value="" disabled selected>Type de service</option>
                  <option value="plomberie">Plomberie</option>
                  <option value="sanitaire">Sanitaire</option>
                  <option value="froid">Froid & Climatisation</option>
                </select>
              </div>
              <div className="form-row">
                <textarea placeholder="Description de votre besoin" rows="4" required></textarea>
              </div>
              <div className="form-row checkbox-row">
                <input type="checkbox" id="rgpd" required />
                <label htmlFor="rgpd">J'accepte que mes données soient utilisées pour me recontacter</label>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Envoyer ma demande</button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>BESOIN D'UNE INTERVENTION <span>RAPIDE ?</span></h2>
          <p>Contactez-nous aujourd'hui pour être mis en relation avec nos experts.</p>
          <button className="btn btn-white cta-btn">CONTACTEZ-NOUS</button>
        </div>
      </section>

    </div>
  );
};

export default Accueil;
