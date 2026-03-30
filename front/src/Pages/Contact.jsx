import { useState, useEffect } from 'react';
import '../Styles/Contact.css';

const Contact = () => {
    const [data, setData] = useState({
        banniere: { 
            titreNoir: "BESOIN D'UNE INTERVENTION ?", 
            titreBleu: "CONTACTEZ-NOUS DÈS MAINTENANT", 
            image: "" 
        },
        infos: [
            { id: 1, titre: "Adresse", contenu: "10 BP 2486 Abidjan 10, Koumassi\nSicogi 1 à 100m de l'hôpital général\net 200m de Camp commando" },
            { id: 2, titre: "Contact", contenu: "Email: prefcibat@gmail.com\nTél: +225 07 58 31 40 19 / 05 46 56 85 24\nWhatsapp: +225 07 58 31 40 19" },
            { id: 3, titre: "Horaire", contenu: "Lundi-Samedi: 08h-18h" },
            { id: 4, titre: "Suivez-nous", contenu: "LinkedIn | Facebook | Twitter | Instagram" }
        ],
        mapCoordinates: "5.318854,-3.957688"
    });

    const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', service: '', message: '', rgpd: false });
    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

    useEffect(() => {
        fetch('http://localhost:3000/pages/contact')
            .then(res => res.json())
            .then(resData => {
                setData(prev => {
                    const merged = { ...prev };
                    if (resData.banniere) merged.banniere = { ...merged.banniere, ...resData.banniere };
                    if (resData.infos && resData.infos.length > 0) merged.infos = resData.infos;
                    if (resData.map && resData.map.mapCoordinates) merged.mapCoordinates = resData.map.mapCoordinates;
                    return merged;
                });
            })
            .catch(err => console.warn("Using default Contact content", err));
    }, []);

    const formatInfos = (text) => text.split('\n').map((str, idx) => <p key={idx}>{str}</p>);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('http://localhost:3000/devis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Erreur serveur');
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    const resetForm = () => {
        setForm({ nom: '', prenom: '', email: '', telephone: '', service: '', message: '', rgpd: false });
        setStatus(null);
    };

    return (
        <div className="contact-page">
            {/* 1. Hero Content */}
            <div className="contact-banniere reveal reveal-up">
                {data.banniere.image && (
                    <img src={data.banniere.image} alt="Banniere" style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1}} />
                )}
                <div className="banniere-text-box reveal reveal-up delay-200" style={{padding: '2rem', borderRadius: '10px'}}>
                    <h2><span className="light" style={{color: data.banniere.image ? '#fff' : 'inherit'}}>{data.banniere.titreNoir}</span></h2>
                    <h2><span style={{color: 'var(--blue-pref)'}}>{data.banniere.titreBleu?.split(' ')[0]}</span> {data.banniere.titreBleu?.split(' ').slice(1).join(' ')}</h2>
                </div>
            </div>

            {/* 2. Contact Main Content */}
            <div className="contact-content">
                <div className="contact-info reveal reveal-left">
                    {data.infos.map((info, i) => (
                        <div className="contact-info-block" key={info.id || i}>
                            <h3>{info.titre}</h3>
                            {info.titre?.toLowerCase().includes('suivez') ? (
                                <div className="contact-social">
                                    {['LinkedIn', 'Facebook', 'Twitter', 'Instagram'].map((social, j) => (
                                        <a 
                                            href="#" 
                                            aria-label={social} 
                                            key={j} 
                                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue-pref)', color: 'white', textDecoration: 'none' }}
                                        >
                                            {social[0].toLowerCase()}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                formatInfos(info.contenu || '')
                            )}
                        </div>
                    ))}
                </div>

                <div className="contact-form-container reveal reveal-right">
                    {status === 'success' ? (
                        <div style={{padding: '40px', textAlign: 'center'}}>
                            <div style={{fontSize: '3rem', color: 'var(--blue-pref)', marginBottom: '15px'}}>✓</div>
                            <h3 style={{marginBottom: '10px'}}>Demande envoyée !</h3>
                            <p style={{color: '#666'}}>Notre équipe vous contactera dans les plus brefs délais.</p>
                            <button className="submit-btn" style={{marginTop: '20px'}} onClick={resetForm}>Nouvelle demande</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input type="text" placeholder="Nom" required value={form.nom} onChange={e => setForm(p => ({...p, nom: e.target.value}))} />
                                <input type="text" placeholder="Prénoms" required value={form.prenom} onChange={e => setForm(p => ({...p, prenom: e.target.value}))} />
                            </div>
                            <div className="form-row">
                                <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} />
                                <input type="tel" placeholder="Téléphone" required value={form.telephone} onChange={e => setForm(p => ({...p, telephone: e.target.value}))} />
                            </div>
                            <div className="form-row">
                                <select required value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))}>
                                    <option value="" disabled>Type de service</option>
                                    <option value="plomberie">Plomberie</option>
                                    <option value="etancheite">Étanchéité</option>
                                    <option value="froid">Froid &amp; Climatisation</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <textarea placeholder="Description du problème" required value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}></textarea>
                            </div>
                            <div className="checkbox-row">
                                <input type="checkbox" id="confirm-info" required checked={form.rgpd} onChange={e => setForm(p => ({...p, rgpd: e.target.checked}))} />
                                <label htmlFor="confirm-info">Je confirme que les informations fournies sont exactes.</label>
                            </div>
                            {status === 'error' && <p style={{color: 'red', marginBottom: '10px'}}>Une erreur est survenue. Veuillez réessayer.</p>}
                            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* 3. Maps Section */}
            <div className="contact-maps reveal reveal-up">
                <div className="map-container">
                    <iframe
                        title="Map PREFCI-BAT"
                        src={`https://maps.google.com/maps?q=${data.mapCoordinates}&hl=fr&z=15&output=embed`}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
