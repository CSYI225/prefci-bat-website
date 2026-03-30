import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Accueil.css';
import { realisationsData as fallbackReals } from '../Data/realisations.js';
import Aduti from '../Images/aduti.png';
import SantaMaria from '../Images/SantaMaria.png';
import Eleveur from '../Images/eleveur.png';
import Qalilab from '../Images/qalilab.png';
import Copharmed from '../Images/copharmed.png';
import Carena from '../Images/carena.webp';

const Accueil = () => {

  const [data, setData] = useState({
    banniere: {
      titreNoir: "FUITE OU ÉTANCHÉITÉ ?",
      titreBleu: "RAPIDES ET DURABLES",
    },
    quiSommesNous: {
      titreNoir: "DES PROFESSIONNELS ENGAGÉS À",
      titreBleu: "RÉSOUDRE VOS PROBLÈMES",
      description: "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation. Nous mettons notre savoir-faire au service de particuliers et de professionnels pour des interventions rapides, des installations fiables et un suivi rigoureux.",
      description2: "De l'étude à l'exécution de vos projets, nous vous accompagnons grâce à une expertise technique éprouvée et un matériel de pointe. Notre priorité est de vous garantir des résultats irréprochables et de vous assurer confort et tranquillité d'esprit, quelles que soient les exigences de votre bâtiment.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    },
    nosServices: {
      titreNoir: "DES SOLUTIONS",
      titreBleu: "ADAPTÉES À CHAQUE SITUATION",
      description: "Nous proposons une large gamme de services pour répondre à tous vos besoins d'installation, de réparation et d'entretien.",
      services: [
        { id: 1, nom: "Plomberie", description: "Installation, réparation, fuite", image: null },
        { id: 2, nom: "Etanchéité", description: "Installation, réparation, fuite", image: null },
        { id: 3, nom: "Froid & Climatisation", description: "Installation, réparation, fuite", image: null }
      ]
    },
    nosRealisations: {
      titreNoir: "DES RÉSULTATS QUI PARLENT",
      titreBleu: "POUR NOUS",
      description: "Découvrez en images quelques-uns de nos projets récents. Une série de réalisations et d'interventions réussies qui témoignent de notre savoir-faire.",
    },
    nosPartenaires: {
      titreNoir: "ILS NOUS ONT FAIT",
      titreBleu: "CONFIANCE",
      description: "Nous collaborons avec des fournisseurs et des entreprises de confiance pour vous garantir des prestations et des équipements de haute qualité.",
      partenaires: [
        { id: 1, image: Carena },
        { id: 2, image: Copharmed },
        { id: 3, image: Eleveur },
        { id: 4, image: Qalilab },
        { id: 5, image: Aduti },
        { id: 6, image: SantaMaria }
      ]
    },
    avisClients: {
      titreNoir: "CE QUE PENSENT",
      titreBleu: "NOS CLIENTS",
      description: "Ces témoignages reflètent notre engagement envers un service de qualité et irréprochable.",
      avis: [
        { id: 1, nom: 'Amonles William', role: 'Client satisfait', texte: "Intervention très rapide et efficace pour mon problème de plomberie. Le technicien a été très professionnel. Je recommande vivement leurs services.", avatar: 'AW', etoiles: 5 },
        { id: 2, nom: 'Jean Dupont', role: 'Professionnel', texte: "J'ai fait appel à PREFCI pour une installation de climatisation et tout a été fait avec soin. Le résultat répond parfaitement à mes attentes.", avatar: 'JD', etoiles: 5 },
        { id: 3, nom: 'Marie Curie', role: 'Particulier', texte: "Une équipe dynamique et à l'écoute. Ils ont su trouver l'origine de ma fuite d'eau en un temps record et l'ont réparée avec beaucoup d'efficacité.", avatar: 'MC', etoiles: 5 }
      ]
    },
    banniereContact: {
      titreNoir: "BESOIN D'UNE INTERVENTION",
      titreBleu: "RAPIDE ?",
      description: "Contactez-nous aujourd'hui pour être mis en relation avec nos experts."
    }
  });

  const [realisationsData, setRealisationsData] = useState(fallbackReals);

  const [devisForm, setDevisForm] = useState({ nom: '', prenom: '', email: '', telephone: '', service: '', message: '', rgpd: false });
  const [devisStatus, setDevisStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  useEffect(() => {
    // 1. Fetch Page Content
    fetch('http://localhost:3000/pages/accueil')
      .then(res => res.json())
      .then(resData => {
        setData(prev => {
          const merged = { ...prev };
          Object.keys(resData).forEach(sectionKey => {
            if (merged[sectionKey]) {
              // Deep merge logic specially for arrays if present
              const serverSection = resData[sectionKey];
              merged[sectionKey] = { ...merged[sectionKey], ...serverSection };
              
              // Ensure explicit array fallbacks if backend array is completely empty
              if (sectionKey === "nosServices" && (!serverSection.services || serverSection.services.length === 0)) {
                merged.nosServices.services = prev.nosServices.services;
              }
              if (sectionKey === "nosPartenaires" && (!serverSection.partenaires || serverSection.partenaires.length === 0)) {
                merged.nosPartenaires.partenaires = prev.nosPartenaires.partenaires;
              }
              if (sectionKey === "avisClients" && (!serverSection.avis || serverSection.avis.length === 0)) {
                merged.avisClients.avis = prev.avisClients.avis;
              }
            }
          });
          return merged;
        });
      })
      .catch(err => console.warn("Using default Accueil content", err));

    // 2. Fetch Realisations
    fetch('http://localhost:3000/realisations')
      .then(res => res.json())
      .then(resData => {
        if(resData && resData.length > 0) {
          const mapped = resData.map(r => ({
            id: r.idRealisation,
            title: r.titre,
            desc: r.descriptionProjet || '',
            imgBefore: r.imageAvant
              ? (r.imageAvant.startsWith('data:') || r.imageAvant.startsWith('http') || r.imageAvant.startsWith('/')
                  ? r.imageAvant
                  : `http://localhost:3000/uploads/${r.imageAvant}`)
              : '',
          }));
          setRealisationsData(mapped);
        }
      })
      .catch(err => console.warn("Using default Realisations content", err));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;
  const maxIndex = Math.max(0, realisationsData.length - itemsToShow);
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
  }, [maxIndex, realisationsData.length]);

  const nextSlide = () => { realDirectionRef.current = 1; if (currentIndex < maxIndex) setCurrentIndex(p => p + 1); };
  const prevSlide = () => { realDirectionRef.current = -1; if (currentIndex > 0) setCurrentIndex(p => p - 1); };
  const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;

  const [avisIndex, setAvisIndex] = useState(0);
  const avisToShow = 3;
  const maxAvisIndex = Math.max(0, data.avisClients.avis.length - avisToShow);
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
  }, [maxAvisIndex, data.avisClients.avis.length]);

  const nextAvis = () => { avisDirectionRef.current = 1; if (avisIndex < maxAvisIndex) setAvisIndex(p => p + 1); };
  const prevAvis = () => { avisDirectionRef.current = -1; if (avisIndex > 0) setAvisIndex(p => p - 1); };
  const progressAvisPercent = maxAvisIndex > 0 ? (avisIndex / maxAvisIndex) * 100 : 0;

  return (
    <div className="accueil-page">

      {/* Hero Content */}
      <div className="banniere reveal reveal-up">
        {data.banniere.image && (
           <img src={data.banniere.image} alt="Banniere" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1}} />
        )}
        <div className="banniere-text-box reveal reveal-up delay-200" style={{padding: '2rem', borderRadius: '10px'}}>
          <h2><span className="highlight-bg">{data.banniere.titreNoir || 'FUITE OU ÉTANCHÉITÉ ?'}</span></h2>
          <h2>{data.banniere.titreBleu || 'RAPIDES ET DURABLES'}</h2>
        </div>
      </div>

      {/* 1. About Section */}
      <section className="aboutus-section">
        <div className="aboutus">
          <div className="aboutus-image reveal reveal-left">
            <img src={data.quiSommesNous.image || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"} alt="Technicien avec mallette" />
            <div className="cadre-bleu"></div>
          </div>
          <div className="aboutus-text reveal reveal-right">
            <h4 className="section-subtitle-left">QUI SOMMES-NOUS</h4>
            <h2 className="section-title-left">{data.quiSommesNous.titreNoir} <span>{data.quiSommesNous.titreBleu}</span></h2>
            <p style={{whiteSpace: 'pre-line'}}>{data.quiSommesNous.description}</p>
            {data.quiSommesNous.description === "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation. Nous mettons notre savoir-faire au service de particuliers et de professionnels pour des interventions rapides, des installations fiables et un suivi rigoureux." && (
              <p style={{whiteSpace: 'pre-line'}}>{data.quiSommesNous.description2}</p>
            )}
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section className="services-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">NOS EXPERTISES</h4>
          <h2 className="section-title2">{data.nosServices.titreNoir} <br /><span>{data.nosServices.titreBleu}</span></h2>
          <p className="services-desc" style={{whiteSpace: 'pre-line'}}>{data.nosServices.description}</p>
        </div>
        <div className="services">
          {(data.nosServices.services || []).map((service, i) => {
            const fallbackImg = realisationsData && realisationsData.length > 0 
              ? realisationsData[i % realisationsData.length]?.imgBefore 
              : "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80"; // Default plumbing image

            return (
              <div className={`service-card reveal reveal-up delay-${(i + 1) * 100}`} key={service.id || i}>
                <div className="service-img" style={{ backgroundImage: `url(${service.image || fallbackImg})` }}>
                  <div className="service-info">
                    <h3 className='service-titre'>{service.nom}</h3>
                    <p className='service-description' style={{whiteSpace: 'pre-line'}}>{service.description}</p>
                  </div>
                  <div className="service-overlay"></div>
                  <div className="service-icon-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Realisations Section */}
      <section className="realisations-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">NOS RÉALISATIONS</h4>
          <h2 className="section-title">{data.nosRealisations.titreNoir} <span>{data.nosRealisations.titreBleu}</span></h2>
          <p className="realisations-desc" style={{whiteSpace: 'pre-line'}}>{data.nosRealisations.description}</p>
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
                  <p style={{whiteSpace: 'pre-line'}}>{item.desc}</p>
                </div>
                <div className="gallery-icon-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="center-controls">
            <div className="carousel-controls">
              <button className="carousel-btn prev-btn" onClick={prevSlide} disabled={currentIndex === 0} style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}>&lt;</button>
              <div className="carousel-progress"><div className="progress-bar" style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease' }}></div></div>
              <button className="carousel-btn next-btn" onClick={nextSlide} disabled={currentIndex === maxIndex} style={{ opacity: currentIndex === maxIndex ? 0.5 : 1 }}>&gt;</button>
            </div>
          </div>
        </div>
      </section>

      <section className="partenaires-section reveal reveal-up">
        <div className="section-tittle-box">
          <h4 className="section-subtitle">NOS PARTENAIRES</h4>
          <h2 className="section-title">{data.nosPartenaires.titreNoir} <span>{data.nosPartenaires.titreBleu}</span></h2>
          <p className="partenaires-desc" style={{whiteSpace: 'pre-line'}}>{data.nosPartenaires.description}</p>
        </div>
        <div className="partenaires-grid" style={{ gap: '2rem' }}>
          {data.nosPartenaires.partenaires.map((partenaire, i) => (
             <img key={i} src={partenaire.image || fallbackReals[0]?.imgBefore} alt={partenaire.nom || `Partenaire ${i}`} style={{width: '100%', height: 100, objectFit: 'contain'}} />
          ))}
        </div>
      </section>

      <section className="avis-section">
        <div className="section-tittle-box reveal reveal-up">
          <h4 className="section-subtitle">AVIS DE NOS CLIENTS</h4>
          <h2 className="section-title2">{data.avisClients.titreNoir} <span>{data.avisClients.titreBleu}</span></h2>
          <p className="avis-desc" style={{whiteSpace: 'pre-line'}}>{data.avisClients.description}</p>
        </div>

        <div className="avis-carousel" onMouseEnter={() => isAvisHovered.current = true} onMouseLeave={() => isAvisHovered.current = false}>
          <div className="avis-track" style={{ transform: `translateX(-${avisIndex * (350 + 30)}px)` }}>
            {data.avisClients.avis.map((avis, i) => (
              <div className="avis-card" key={avis.id || i}>
                <div className="avis-header">
                  <div className="avis-avatar">{avis.avatar || avis.nom?.substring(0,2).toUpperCase()}</div>
                  <div className="avis-info-text">
                    <h5>{avis.nom}</h5>
                    <span className="avis-role">{avis.role}</span>
                  </div>
                </div>
                <div className="avis-body" style={{whiteSpace: 'pre-line'}}>
                  "{avis.texte}"
                </div>
                <div style={{color: '#f39c12', marginTop: 10}}>{"★".repeat(parseInt(avis.etoiles || 5))}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="center-controls">
          <div className="carousel-controls">
            <button className="carousel-btn prev-btn" onClick={prevAvis} disabled={avisIndex === 0} style={{ opacity: avisIndex === 0 ? 0.5 : 1 }}>&lt;</button>
            <div className="carousel-progress"><div className="progress-bar" style={{ width: `${progressAvisPercent}%` }}></div></div>
            <button className="carousel-btn next-btn" onClick={nextAvis} disabled={avisIndex === maxAvisIndex} style={{ opacity: avisIndex === maxAvisIndex ? 0.5 : 1 }}>&gt;</button>
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
            {devisStatus === 'success' ? (
              <div style={{padding: '40px', textAlign: 'center'}}>
                <div style={{fontSize: '3rem', color: '#4cc9f0', marginBottom: '15px'}}>✓</div>
                <h3 style={{color: '#222', marginBottom: '10px'}}>Demande envoyée !</h3>
                <p style={{color: '#666'}}>Notre équipe vous contactera sous 24h.</p>
                <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={() => { setDevisStatus(null); setDevisForm({ nom: '', prenom: '', email: '', telephone: '', service: '', message: '', rgpd: false }); }}>Nouvelle demande</button>
              </div>
            ) : (
              <form className="devis-form" onSubmit={async (e) => {
                e.preventDefault();
                setDevisStatus('sending');
                try {
                  const res = await fetch('http://localhost:3000/devis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(devisForm)
                  });
                  if (!res.ok) throw new Error('Erreur serveur');
                  setDevisStatus('success');
                } catch (err) {
                  setDevisStatus('error');
                }
              }}>
                <div className="form-row grid-2-col">
                  <input type="text" placeholder="Nom" required value={devisForm.nom} onChange={e => setDevisForm(p => ({...p, nom: e.target.value}))} />
                  <input type="text" placeholder="Prénom(s)" required value={devisForm.prenom} onChange={e => setDevisForm(p => ({...p, prenom: e.target.value}))} />
                </div>
                <div className="form-row grid-2-col">
                  <input type="email" placeholder="Email" required value={devisForm.email} onChange={e => setDevisForm(p => ({...p, email: e.target.value}))} />
                  <input type="tel" placeholder="Téléphone" required value={devisForm.telephone} onChange={e => setDevisForm(p => ({...p, telephone: e.target.value}))} />
                </div>
                <div className="form-row">
                  <select required value={devisForm.service} onChange={e => setDevisForm(p => ({...p, service: e.target.value}))}>
                    <option value="" disabled>Type de service</option>
                    <option value="plomberie">Plomberie</option>
                    <option value="sanitaire">Sanitaire</option>
                    <option value="froid">Froid & Climatisation</option>
                  </select>
                </div>
                <div className="form-row">
                  <textarea placeholder="Description de votre besoin" rows="4" required value={devisForm.message} onChange={e => setDevisForm(p => ({...p, message: e.target.value}))}></textarea>
                </div>
                <div className="form-row checkbox-row">
                  <input type="checkbox" id="rgpd" required checked={devisForm.rgpd} onChange={e => setDevisForm(p => ({...p, rgpd: e.target.checked}))} />
                  <label htmlFor="rgpd">J'accepte que mes données soient utilisées pour me recontacter</label>
                </div>
                {devisStatus === 'error' && <p style={{color: 'red', marginBottom: '10px'}}>Une erreur est survenue. Veuillez réessayer.</p>}
                <button type="submit" className="btn btn-primary btn-full" disabled={devisStatus === 'sending'}>
                  {devisStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. CTA Banner Section */}
      <section className="cta-banner">
        <div className="cta-content">
          <h2>{data.banniereContact.titreNoir} <span>{data.banniereContact.titreBleu}</span></h2>
          <p>{data.banniereContact.description}</p>
          <button className="btn btn-white cta-btn">CONTACTEZ-NOUS</button>
        </div>
      </section>

    </div>
  );
};

export default Accueil;
