import axios from "axios";
import { useEffect, useState } from "react";

const menuItems = [
  "Accueil",
  "Presentation",
  "Services",
  "Realisations",
  "Contact",
  "Deconnexion",
];

const initialState = {
  accueil: {
    banniere: {
      titreNoir: "FUITE OU ETANCHEITE ?",
      titreBleu: "ON PROPOSE DES SOLUTIONS RAPIDES ET DURABLES",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    },
    quiSommesNous: {
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      titreNoir: "DES PROFESSIONNELS ENGAGES A",
      titreBleu: "RESOUDRE VOS PROBLEMES",
      description:
        "PREFCI-BAT SARL est une entreprise experte en plomberie et climatisation.",
    },
    nosServices: {
      titreNoir: "DES SOLUTIONS ADAPTEES",
      titreBleu: "A CHAQUE SITUATION",
      description: "Nous proposons une large gamme de services.",
      services: [
        {
          id: 1,
          nom: "Plomberie",
          description: "Installation, reparation et depannage.",
          image:
            "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
        },
        {
          id: 2,
          nom: "Sanitaire",
          description: "Mise en place et renovation des equipements.",
          image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
        },
      ],
    },
    nosRealisations: {
      titreNoir: "DES RESULTATS QUI PARLENT",
      titreBleu: "POUR NOUS",
      description: "Introduction de la section realisations.",
      realisations: [
        {
          id: 3,
          nom: "Realisation 1",
          description: "Description de la realisation 1.",
          image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        },
      ],
    },
    nosPartenaires: {
      titreNoir: "ILS NOUS ONT FAIT",
      titreBleu: "CONFIANCE",
      description: "Introduction de la section partenaires.",
      partenaires: [
        {
          id: 4,
          nom: "Partenaire 1",
          description: "Description du partenaire 1.",
          image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0",
        },
      ],
    },
    avisClients: {
      titreNoir: "CE QUE PENSENT",
      titreBleu: "NOS CLIENTS",
      description: "Texte de la section avis clients.",
      avis: [
        {
          id: 11,
          nom: "Amonles William",
          role: "Client satisfait",
          texte: "Intervention rapide et equipe professionnelle.",
          avatar: "AW",
        },
      ],
    },
    devisGratuit: {
      titreNoir: "REPONSE RAPIDE SOUS 24H",
      titreBleu: "SANS ENGAGEMENT",
      description: "Texte de la section devis gratuit.",
    },
  },
  servicesPage: {
    banniere: {
      titreNoir: "NOS SERVICES",
      titreBleu: "NOS RESULTATS VISIBLES",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
    },
    details: [
      {
        id: 5,
        nom: "Plomberie",
        description: "Texte descriptif inspire de la page Services.",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
      },
    ],
    cta: {
      titreNoir: "BESOIN D'UNE INTERVENTION",
      titreBleu: "RAPIDE ?",
      description: "Contactez-nous pour etre mis en relation avec nos experts.",
    },
  },
  presentationPage: {
    banniere: {
      titreNoir: "NOS EQUIPES AUX SERVICES",
      titreBleu: "DE VOS INSTALLATIONS",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    },
    expertise: {
      titreNoir: "UNE EXPERTISE TECHNIQUE AU SERVICE",
      titreBleu: "DE VOS PROJETS",
      description:
        "PREFCI-BAT SARL est une entreprise leader dans la plomberie et la climatisation.",
    },
    quiSommesNous: {
      titreNoir: "QUI SOMMES-NOUS",
      titreBleu: "UNE EXPERTISE TECHNIQUE AU SERVICE DE VOS PROJETS",
      description:
        "PREFCI-BAT SARL est une entreprise leader dans le domaine de la plomberie et de la climatisation.",
      image1: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
      image2: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      image3: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    },
    stats: [
      { id: 12, label: "Annees d'experience", value: "10+" },
      { id: 13, label: "Delais d'intervention", value: "24H" },
    ],
    mission: {
      titreNoir: "NOTRE MISSION",
      titreBleu: "APPORTER DES SOLUTIONS DURABLES A CHAQUE PROJET",
      description:
        "La mission de PREFCI-BAT SARL est de proposer des solutions techniques optimales.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
    },
    valeurs: [
      {
        id: 14,
        titre: "L'Excellence",
        texte: "La recherche constante de la perfection dans nos realisations.",
      },
    ],
    pourquoiTravailler: {
      titreNoir: "VOTRE SATISFACTION, NOTRE PRIORITE",
      titreBleu: "POURQUOI TRAVAILLER AVEC NOUS ?",
      description:
        "Nous mettons a votre service une equipe experimentee et des equipements modernes.",
      raisons: [
        {
          id: 16,
          titre: "RAISON 01",
          texte: "Une expertise reconnue pour une intervention efficace et rapide.",
        },
      ],
    },
    motDirecteur: {
      nom: "WILLIAMS KOFFI",
      titre: "MOT DU DIRECTEUR",
      message1:
        "Chez PREFCI-BAT SARL, nous placons l'humain et la qualite au coeur de notre metier.",
      message2:
        "Chaque projet realise est le reflet de notre engagement et de notre expertise.",
      message3:
        "Merci pour votre confiance, notre equipe reste disponible pour vos exigences.",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
    },
    equipe: [
      {
        id: 15,
        nom: "Sophia Bennett",
        role: "Ingenieur plombier",
        image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7",
      },
    ],
  },
  realisationsPage: {
    banniere: {
      titreNoir: "DES INTERVENTIONS CONCRETES",
      titreBleu: "DES RESULTATS VISIBLES",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    },
    intro: {
      titreNoir: "DES RESULTATS QUI PARLENT",
      titreBleu: "POUR NOUS",
      description: "Texte d'introduction des realisations.",
    },
    realisations: [
      {
        id: 6,
        client: "Client 1",
        projet: "Projet 1",
        category: "PLOMBERIE",
        imgBefore: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
        imgAfter: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      },
    ],
  },
  contactPage: {
    banniere: {
      titreNoir: "BESOIN D'UNE INTERVENTION ?",
      titreBleu: "CONTACTEZ-NOUS DES MAINTENANT",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    },
    infos: [
      { id: 7, titre: "Adresse", contenu: "10 BP 2486 Abidjan 10, Koumassi" },
      { id: 8, titre: "Contact", contenu: "prefcibat@gmail.com / +225 07 58 31 40 19" },
      { id: 17, titre: "Email", contenu: "prefcibat@gmail.com" },
      { id: 18, titre: "Whatsapp", contenu: "+225 07 58 31 40 19" },
    ],
    mapCoordinates: "5.318854,-3.957688",
  },
};

function buildLockedMap(value, prefix = "", acc = {}) {
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (item?.id !== undefined) {
        buildLockedMap(item, `${prefix}[${item.id}]`, acc);
      }
    });
    return acc;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, val]) => {
      if (key === "id") {
        return;
      }
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      buildLockedMap(val, nextPrefix, acc);
    });
    return acc;
  }
  acc[prefix] = true;
  return acc;
}

function EditableField({
  label,
  value,
  onChange,
  isEditing,
  onToggle,
  textarea = false,
  isImage = false,
}) {
  const handleImagePick = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange({ target: { value: reader.result } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="field-row">
      <label>{label}</label>
      <div className="field-input-wrap">
        <div>
          {isImage ? (
            <div className="image-field-extra">
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                disabled={!isEditing}
              />
              {value ? (
                <img className="image-preview" src={value} alt="Apercu image" />
              ) : (
                <p className="image-preview-empty">Aucune image selectionnee</p>
              )}
            </div>
          ) : textarea ? (
            <textarea
              rows={4}
              value={value}
              onChange={onChange}
              disabled={!isEditing}
            />
          ) : (
            <input type="text" value={value} onChange={onChange} disabled={!isEditing} />
          )}
        </div>
        <button type="button" className="secondary-btn" onClick={onToggle}>
          {isEditing ? "Verrouiller" : "Modifier"}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Accueil");
  const [data, setData] = useState(initialState);
  const [locked, setLocked] = useState(() => buildLockedMap(initialState));
  const [nextId, setNextId] = useState(100);
  const [accessToken, setAccessToken] = useState(() => {
    return (
      localStorage.getItem("access_token") ||
      localStorage.getItem("admin_token") ||
      ""
    );
  });
  const [adminSectionIds, setAdminSectionIds] = useState({});
  const [adminLoaded, setAdminLoaded] = useState(false);
  const [loginEmail, setLoginEmail] = useState("admin@prefci.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [adminBusy, setAdminBusy] = useState(false);

  const isEditing = (key) => !locked[key];
  const toggleField = (key) => setLocked((prev) => ({ ...prev, [key]: !prev[key] }));
  const unlockField = (key) => setLocked((prev) => ({ ...prev, [key]: false }));

  const saveMessage = async (label) => {
    const pageKeyByLabel = {
      "Banniere Accueil": "accueil",
      "Qui somme nous": "accueil",
      "Nos services": "accueil",
      "Nos realisations": "accueil",
      "Nos partenaires": "accueil",
      "Avis clients": "accueil",
      "Devis gratuit": "accueil",
      "Page Services": "services",
      "Page Realisations": "realisations",
      "Page Presentation": "presentation",
      "Page Contact": "contact",
    };

    const pageKey = pageKeyByLabel[label];
    if (!pageKey) {
      window.alert("Aucune page a enregistrer pour ce bouton.");
      return;
    }
    if (!accessToken) {
      window.alert("Veuillez vous connecter pour enregistrer.");
      return;
    }

    const payloadByPageKey = {
      accueil: data.accueil,
      services: data.servicesPage,
      realisations: data.realisationsPage,
      presentation: data.presentationPage,
      contact: data.contactPage,
    };

    setAdminBusy(true);
    try {
      await axios.patch(
        `http://localhost:3000/admin-content/${pageKey}`,
        { content: payloadByPageKey[pageKey] || {} },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      window.alert(`${label} enregistre avec succes.`);
    } catch (e) {
      window.alert(
        `Erreur lors de l'enregistrement: ${
          e?.response?.data?.message || e?.message || "inconnue"
        }`
      );
    } finally {
      setAdminBusy(false);
    }
  };

  const renderField = (key, label, value, onChange, textarea = false) => (
    (() => {
      const displayLabel = label
        .replace("Titre-noir", "Titre-blanc")
        .replace("Image (URL)", "Image");
      return (
        <EditableField
          label={displayLabel}
          value={value}
          isEditing={isEditing(key)}
          onToggle={() => toggleField(key)}
          onChange={onChange}
          textarea={textarea}
          isImage={displayLabel.toLowerCase().includes("image")}
        />
      );
    })()
  );

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_token");
    setAccessToken("");
    setAdminLoaded(false);
    setAdminSectionIds({});
    setActiveTab("Accueil");
  };

  // Chargement du payload admin depuis la base
  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;
      if (adminLoaded) return;
      setAdminBusy(true);
      try {
        const [accueilRes, presentationRes, servicesRes, realisationsRes, contactRes] =
          await Promise.all([
            axios.get("http://localhost:3000/admin-content/accueil", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get("http://localhost:3000/admin-content/presentation", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get("http://localhost:3000/admin-content/services", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get("http://localhost:3000/admin-content/realisations", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get("http://localhost:3000/admin-content/contact", {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
          ]);

        const merged = {
          ...initialState,
          accueil: accueilRes.data?.content || initialState.accueil,
          presentationPage: presentationRes.data?.content || initialState.presentationPage,
          servicesPage: servicesRes.data?.content || initialState.servicesPage,
          realisationsPage: realisationsRes.data?.content || initialState.realisationsPage,
          contactPage: contactRes.data?.content || initialState.contactPage,
        };
        setData(merged);
        setLocked(buildLockedMap(merged));
        setAdminSectionIds({});
        setAdminLoaded(true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        window.alert("Erreur lors du chargement admin depuis la base.");
      } finally {
        setAdminBusy(false);
      }
    };

    load();
  }, [accessToken, adminLoaded]);

  if (!accessToken) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Connexion Admin</h2>
          <div className="field-row">
            <label>Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="field-row">
            <label>Mot de passe</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          {loginError && <p className="login-error">{loginError}</p>}
          <button
            className="primary-btn"
            disabled={adminBusy}
            onClick={async () => {
              setAdminBusy(true);
              setLoginError("");
              try {
                const res = await axios.post(
                  "http://localhost:3000/auth/login",
                  { email: loginEmail, password: loginPassword }
                );
                const token = res.data?.access_token;
                if (!token) {
                  setLoginError("Reponse sans access_token.");
                  return;
                }
                localStorage.setItem("access_token", token);
                setAccessToken(token);
                setActiveTab("Accueil");
              } catch (e) {
                setLoginError(
                  e?.response?.data?.message || "Identifiants incorrects."
                );
              } finally {
                setAdminBusy(false);
              }
            }}
          >
            {adminBusy ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </div>
    );
  }

  const addAccueilListItem = (section, listKey, payload) => {
    const newId = nextId;
    setNextId((prev) => prev + 1);
    setData((prev) => ({
      ...prev,
      accueil: {
        ...prev.accueil,
        [section]: {
          ...prev.accueil[section],
          [listKey]: [...prev.accueil[section][listKey], { id: newId, ...payload }],
        },
      },
    }));
    Object.keys(payload).forEach((field) => {
      unlockField(`accueil.${section}.${listKey}[${newId}].${field}`);
    });
  };

  const removeAccueilListItem = (section, listKey, id) => {
    setData((prev) => ({
      ...prev,
      accueil: {
        ...prev.accueil,
        [section]: {
          ...prev.accueil[section],
          [listKey]: prev.accueil[section][listKey].filter((item) => item.id !== id),
        },
      },
    }));
  };

  if (activeTab === "Deconnexion") {
    return (
      <div className="admin-layout">
        <aside className="sidebar">
          <h2>PREFCI Admin</h2>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </button>
          ))}
        </aside>
        <main className="content">
          <div className="placeholder-card">
            <h2>Deconnexion</h2>
            <p>Vous etes deconnecte de l'espace administration.</p>
            <button
              className="secondary-btn"
              onClick={() => setActiveTab("Accueil")}
            >
              Retour a l'accueil admin
            </button>
            <button
              className="primary-btn"
              style={{ marginLeft: 10 }}
              onClick={() => logout()}
            >
              Se deconnecter
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>PREFCI Admin</h2>
        {menuItems.map((item) => (
          <button
            key={item}
            className={`menu-item ${activeTab === item ? "active" : ""}`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="content">
        {activeTab === "Accueil" && (
          <>
            <h1>Edition de la page Accueil</h1>
            <section className="form-card">
              <h3>Banniere</h3>
              {renderField(
                "accueil.banniere.titreNoir",
                "Titre-noir",
                data.accueil.banniere.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      banniere: { ...prev.accueil.banniere, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.banniere.titreBleu",
                "Titre-Bleu",
                data.accueil.banniere.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      banniere: { ...prev.accueil.banniere, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.banniere.image",
                "Image (URL)",
                data.accueil.banniere.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      banniere: { ...prev.accueil.banniere, image: e.target.value },
                    },
                  }))
              )}
              <button className="primary-btn" onClick={() => saveMessage("Banniere Accueil")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Qui somme nous</h3>
              {renderField(
                "accueil.quiSommesNous.image",
                "Image",
                data.accueil.quiSommesNous.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      quiSommesNous: {
                        ...prev.accueil.quiSommesNous,
                        image: e.target.value,
                      },
                    },
                  }))
              )}
              <EditableField
                label="Titre-blanc"
                value={data.accueil.quiSommesNous.titreNoir}
                isEditing={isEditing("accueil.quiSommesNous.titreNoir")}
                onToggle={() => toggleField("accueil.quiSommesNous.titreNoir")}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      quiSommesNous: { ...prev.accueil.quiSommesNous, titreNoir: e.target.value },
                    },
                  }))
                }
              />
              <EditableField
                label="Titre-Bleu"
                value={data.accueil.quiSommesNous.titreBleu}
                isEditing={isEditing("accueil.quiSommesNous.titreBleu")}
                onToggle={() => toggleField("accueil.quiSommesNous.titreBleu")}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      quiSommesNous: { ...prev.accueil.quiSommesNous, titreBleu: e.target.value },
                    },
                  }))
                }
              />
              <EditableField
                label="Description"
                value={data.accueil.quiSommesNous.description}
                isEditing={isEditing("accueil.quiSommesNous.description")}
                onToggle={() => toggleField("accueil.quiSommesNous.description")}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      quiSommesNous: {
                        ...prev.accueil.quiSommesNous,
                        description: e.target.value,
                      },
                    },
                  }))
                }
                textarea
              />
              <button className="primary-btn" onClick={() => saveMessage("Qui somme nous")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Nos services</h3>
              {renderField(
                "accueil.nosServices.titreNoir",
                "Titre-noir",
                data.accueil.nosServices.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosServices: { ...prev.accueil.nosServices, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosServices.titreBleu",
                "Titre-Bleu",
                data.accueil.nosServices.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosServices: { ...prev.accueil.nosServices, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosServices.description",
                "Description",
                data.accueil.nosServices.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosServices: { ...prev.accueil.nosServices, description: e.target.value },
                    },
                  })),
                true
              )}

              <div className="mini-form">
                <h4>Services</h4>
                {data.accueil.nosServices.services.map((service, index) => (
                  <div className="service-block" key={`service-${service.id}`}>
                    <h5>Service {index + 1}</h5>
                    {renderField(
                      `accueil.nosServices.services[${service.id}].nom`,
                      "Nom",
                      service.nom,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosServices: {
                              ...prev.accueil.nosServices,
                              services: prev.accueil.nosServices.services.map((item) =>
                                item.id === service.id ? { ...item, nom: e.target.value } : item
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `accueil.nosServices.services[${service.id}].description`,
                      "Description",
                      service.description,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosServices: {
                              ...prev.accueil.nosServices,
                              services: prev.accueil.nosServices.services.map((item) =>
                                item.id === service.id
                                  ? { ...item, description: e.target.value }
                                  : item
                              ),
                            },
                          },
                        })),
                      true
                    )}
                    {renderField(
                      `accueil.nosServices.services[${service.id}].image`,
                      "Image (URL)",
                      service.image,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosServices: {
                              ...prev.accueil.nosServices,
                              services: prev.accueil.nosServices.services.map((item) =>
                                item.id === service.id ? { ...item, image: e.target.value } : item
                              ),
                            },
                          },
                        }))
                    )}
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => removeAccueilListItem("nosServices", "services", service.id)}
                    >
                      Supprimer ce service
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    addAccueilListItem("nosServices", "services", {
                      nom: "",
                      description: "",
                      image: "",
                    })
                  }
                >
                  Ajouter un autre service
                </button>
              </div>

              <button className="primary-btn" onClick={() => saveMessage("Nos services")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Nos realisations</h3>
              {renderField(
                "accueil.nosRealisations.titreNoir",
                "Titre-noir",
                data.accueil.nosRealisations.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosRealisations: {
                        ...prev.accueil.nosRealisations,
                        titreNoir: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosRealisations.titreBleu",
                "Titre-Bleu",
                data.accueil.nosRealisations.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosRealisations: {
                        ...prev.accueil.nosRealisations,
                        titreBleu: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosRealisations.description",
                "Description",
                data.accueil.nosRealisations.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosRealisations: {
                        ...prev.accueil.nosRealisations,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
              <div className="mini-form">
                <h4>Realisations</h4>
                {data.accueil.nosRealisations.realisations.map((item, index) => (
                  <div className="service-block" key={item.id}>
                    <h5>Realisation {index + 1}</h5>
                    {renderField(
                      `accueil.nosRealisations.realisations[${item.id}].nom`,
                      "Nom",
                      item.nom,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosRealisations: {
                              ...prev.accueil.nosRealisations,
                              realisations: prev.accueil.nosRealisations.realisations.map((r) =>
                                r.id === item.id ? { ...r, nom: e.target.value } : r
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `accueil.nosRealisations.realisations[${item.id}].description`,
                      "Description",
                      item.description,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosRealisations: {
                              ...prev.accueil.nosRealisations,
                              realisations: prev.accueil.nosRealisations.realisations.map((r) =>
                                r.id === item.id ? { ...r, description: e.target.value } : r
                              ),
                            },
                          },
                        })),
                      true
                    )}
                    {renderField(
                      `accueil.nosRealisations.realisations[${item.id}].image`,
                      "Image (URL)",
                      item.image,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosRealisations: {
                              ...prev.accueil.nosRealisations,
                              realisations: prev.accueil.nosRealisations.realisations.map((r) =>
                                r.id === item.id ? { ...r, image: e.target.value } : r
                              ),
                            },
                          },
                        }))
                    )}
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() =>
                        removeAccueilListItem("nosRealisations", "realisations", item.id)
                      }
                    >
                      Supprimer cette realisation
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    addAccueilListItem("nosRealisations", "realisations", {
                      nom: "",
                      description: "",
                      image: "",
                    })
                  }
                >
                  Ajouter une autre realisation
                </button>
              </div>
              <button className="primary-btn" onClick={() => saveMessage("Nos realisations")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Nos partenaires</h3>
              {renderField(
                "accueil.nosPartenaires.titreNoir",
                "Titre-noir",
                data.accueil.nosPartenaires.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosPartenaires: {
                        ...prev.accueil.nosPartenaires,
                        titreNoir: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosPartenaires.titreBleu",
                "Titre-Bleu",
                data.accueil.nosPartenaires.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosPartenaires: {
                        ...prev.accueil.nosPartenaires,
                        titreBleu: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "accueil.nosPartenaires.description",
                "Description",
                data.accueil.nosPartenaires.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      nosPartenaires: {
                        ...prev.accueil.nosPartenaires,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
              <div className="mini-form">
                <h4>Partenaires</h4>
                {data.accueil.nosPartenaires.partenaires.map((item, index) => (
                  <div className="service-block" key={item.id}>
                    <h5>Partenaire {index + 1}</h5>
                    {renderField(
                      `accueil.nosPartenaires.partenaires[${item.id}].nom`,
                      "Nom",
                      item.nom,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosPartenaires: {
                              ...prev.accueil.nosPartenaires,
                              partenaires: prev.accueil.nosPartenaires.partenaires.map((p) =>
                                p.id === item.id ? { ...p, nom: e.target.value } : p
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `accueil.nosPartenaires.partenaires[${item.id}].description`,
                      "Description",
                      item.description,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosPartenaires: {
                              ...prev.accueil.nosPartenaires,
                              partenaires: prev.accueil.nosPartenaires.partenaires.map((p) =>
                                p.id === item.id ? { ...p, description: e.target.value } : p
                              ),
                            },
                          },
                        })),
                      true
                    )}
                    {renderField(
                      `accueil.nosPartenaires.partenaires[${item.id}].image`,
                      "Image (URL)",
                      item.image,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            nosPartenaires: {
                              ...prev.accueil.nosPartenaires,
                              partenaires: prev.accueil.nosPartenaires.partenaires.map((p) =>
                                p.id === item.id ? { ...p, image: e.target.value } : p
                              ),
                            },
                          },
                        }))
                    )}
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() => removeAccueilListItem("nosPartenaires", "partenaires", item.id)}
                    >
                      Supprimer ce partenaire
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    addAccueilListItem("nosPartenaires", "partenaires", {
                      nom: "",
                      description: "",
                      image: "",
                    })
                  }
                >
                  Ajouter un autre partenaire
                </button>
              </div>
              <button className="primary-btn" onClick={() => saveMessage("Nos partenaires")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Avis clients</h3>
              {renderField(
                "accueil.avisClients.titreNoir",
                "Titre-noir",
                data.accueil.avisClients.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      avisClients: { ...prev.accueil.avisClients, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.avisClients.titreBleu",
                "Titre-Bleu",
                data.accueil.avisClients.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      avisClients: { ...prev.accueil.avisClients, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.avisClients.description",
                "Description",
                data.accueil.avisClients.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      avisClients: { ...prev.accueil.avisClients, description: e.target.value },
                    },
                  })),
                true
              )}
              <div className="mini-form">
                <h4>Liste des avis</h4>
                {data.accueil.avisClients.avis.map((item, index) => (
                  <div className="service-block" key={item.id}>
                    <h5>Avis {index + 1}</h5>
                    {renderField(
                      `accueil.avisClients.avis[${item.id}].nom`,
                      "Nom",
                      item.nom,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            avisClients: {
                              ...prev.accueil.avisClients,
                              avis: prev.accueil.avisClients.avis.map((a) =>
                                a.id === item.id ? { ...a, nom: e.target.value } : a
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `accueil.avisClients.avis[${item.id}].role`,
                      "Role",
                      item.role,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            avisClients: {
                              ...prev.accueil.avisClients,
                              avis: prev.accueil.avisClients.avis.map((a) =>
                                a.id === item.id ? { ...a, role: e.target.value } : a
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `accueil.avisClients.avis[${item.id}].texte`,
                      "Texte",
                      item.texte,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            avisClients: {
                              ...prev.accueil.avisClients,
                              avis: prev.accueil.avisClients.avis.map((a) =>
                                a.id === item.id ? { ...a, texte: e.target.value } : a
                              ),
                            },
                          },
                        })),
                      true
                    )}
                    {renderField(
                      `accueil.avisClients.avis[${item.id}].avatar`,
                      "Avatar",
                      item.avatar,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            avisClients: {
                              ...prev.accueil.avisClients,
                              avis: prev.accueil.avisClients.avis.map((a) =>
                                a.id === item.id ? { ...a, avatar: e.target.value } : a
                              ),
                            },
                          },
                        }))
                    )}
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          accueil: {
                            ...prev.accueil,
                            avisClients: {
                              ...prev.accueil.avisClients,
                              avis: prev.accueil.avisClients.avis.filter((a) => a.id !== item.id),
                            },
                          },
                        }))
                      }
                    >
                      Supprimer cet avis
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    addAccueilListItem("avisClients", "avis", {
                      nom: "",
                      role: "",
                      texte: "",
                      avatar: "",
                    })
                  }
                >
                  Ajouter un autre avis
                </button>
              </div>
              <button className="primary-btn" onClick={() => saveMessage("Avis clients")}>
                Enregistrer
              </button>
            </section>

            <section className="form-card">
              <h3>Devis gratuit</h3>
              {renderField(
                "accueil.devisGratuit.titreNoir",
                "Titre-noir",
                data.accueil.devisGratuit.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      devisGratuit: { ...prev.accueil.devisGratuit, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.devisGratuit.titreBleu",
                "Titre-Bleu",
                data.accueil.devisGratuit.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      devisGratuit: { ...prev.accueil.devisGratuit, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "accueil.devisGratuit.description",
                "Description",
                data.accueil.devisGratuit.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    accueil: {
                      ...prev.accueil,
                      devisGratuit: {
                        ...prev.accueil.devisGratuit,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
              <button className="primary-btn" onClick={() => saveMessage("Devis gratuit")}>
                Enregistrer
              </button>
            </section>
          </>
        )}

        {activeTab === "Services" && (
          <>
            <h1>Edition de la page Services</h1>
            <section className="form-card">
              <h3>Banniere</h3>
              {renderField(
                "servicesPage.banniere.titreNoir",
                "Titre-noir",
                data.servicesPage.banniere.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    servicesPage: {
                      ...prev.servicesPage,
                      banniere: { ...prev.servicesPage.banniere, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "servicesPage.banniere.titreBleu",
                "Titre-Bleu",
                data.servicesPage.banniere.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    servicesPage: {
                      ...prev.servicesPage,
                      banniere: { ...prev.servicesPage.banniere, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "servicesPage.banniere.image",
                "Image",
                data.servicesPage.banniere.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    servicesPage: {
                      ...prev.servicesPage,
                      banniere: { ...prev.servicesPage.banniere, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Details des services</h3>
              {data.servicesPage.details.map((item, index) => (
                <div className="service-block" key={item.id}>
                  <h5>Service {index + 1}</h5>
                  {renderField(`servicesPage.details[${item.id}].nom`, "Nom", item.nom, (e) =>
                    setData((prev) => ({
                      ...prev,
                      servicesPage: {
                        ...prev.servicesPage,
                        details: prev.servicesPage.details.map((s) =>
                          s.id === item.id ? { ...s, nom: e.target.value } : s
                        ),
                      },
                    }))
                  )}
                  {renderField(
                    `servicesPage.details[${item.id}].description`,
                    "Description",
                    item.description,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        servicesPage: {
                          ...prev.servicesPage,
                          details: prev.servicesPage.details.map((s) =>
                            s.id === item.id ? { ...s, description: e.target.value } : s
                          ),
                        },
                      })),
                    true
                  )}
                  {renderField(
                    `servicesPage.details[${item.id}].image`,
                    "Image (URL)",
                    item.image,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        servicesPage: {
                          ...prev.servicesPage,
                          details: prev.servicesPage.details.map((s) =>
                            s.id === item.id ? { ...s, image: e.target.value } : s
                          ),
                        },
                      }))
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        servicesPage: {
                          ...prev.servicesPage,
                          details: prev.servicesPage.details.filter((s) => s.id !== item.id),
                        },
                      }))
                    }
                  >
                    Supprimer ce service
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    servicesPage: {
                      ...prev.servicesPage,
                      details: [
                        ...prev.servicesPage.details,
                        { id: newId, nom: "", description: "", image: "" },
                      ],
                    },
                  }));
                  unlockField(`servicesPage.details[${newId}].nom`);
                  unlockField(`servicesPage.details[${newId}].description`);
                  unlockField(`servicesPage.details[${newId}].image`);
                }}
              >
                Ajouter un autre service
              </button>
              <button className="primary-btn" onClick={() => saveMessage("Page Services")}>
                Enregistrer
              </button>
            </section>
          </>
        )}

        {activeTab === "Presentation" && (
          <>
            <h1>Edition de la page Presentation</h1>
            <section className="form-card">
              <h3>Banniere</h3>
              {renderField(
                "presentationPage.banniere.titreNoir",
                "Titre-noir",
                data.presentationPage.banniere.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      banniere: { ...prev.presentationPage.banniere, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.banniere.titreBleu",
                "Titre-Bleu",
                data.presentationPage.banniere.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      banniere: { ...prev.presentationPage.banniere, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.banniere.image",
                "Image",
                data.presentationPage.banniere.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      banniere: { ...prev.presentationPage.banniere, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Bloc expertise</h3>
              {renderField(
                "presentationPage.expertise.titreNoir",
                "Titre-noir",
                data.presentationPage.expertise.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      expertise: { ...prev.presentationPage.expertise, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.expertise.titreBleu",
                "Titre-Bleu",
                data.presentationPage.expertise.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      expertise: { ...prev.presentationPage.expertise, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.expertise.description",
                "Description",
                data.presentationPage.expertise.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      expertise: {
                        ...prev.presentationPage.expertise,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
            </section>
            <section className="form-card">
              <h3>Qui sommes-nous</h3>
              {renderField(
                "presentationPage.quiSommesNous.titreNoir",
                "Titre-noir",
                data.presentationPage.quiSommesNous.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        titreNoir: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.quiSommesNous.titreBleu",
                "Titre-Bleu",
                data.presentationPage.quiSommesNous.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        titreBleu: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.quiSommesNous.description",
                "Description",
                data.presentationPage.quiSommesNous.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
              {renderField(
                "presentationPage.quiSommesNous.image1",
                "Image 1",
                data.presentationPage.quiSommesNous.image1,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        image1: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.quiSommesNous.image2",
                "Image 2",
                data.presentationPage.quiSommesNous.image2,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        image2: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.quiSommesNous.image3",
                "Image 3",
                data.presentationPage.quiSommesNous.image3,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      quiSommesNous: {
                        ...prev.presentationPage.quiSommesNous,
                        image3: e.target.value,
                      },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Statistiques</h3>
              {data.presentationPage.stats.map((stat, index) => (
                <div className="service-block" key={stat.id}>
                  <h5>Stat {index + 1}</h5>
                  {renderField(`presentationPage.stats[${stat.id}].label`, "Label", stat.label, (e) =>
                    setData((prev) => ({
                      ...prev,
                      presentationPage: {
                        ...prev.presentationPage,
                        stats: prev.presentationPage.stats.map((s) =>
                          s.id === stat.id ? { ...s, label: e.target.value } : s
                        ),
                      },
                    }))
                  )}
                  {renderField(`presentationPage.stats[${stat.id}].value`, "Valeur", stat.value, (e) =>
                    setData((prev) => ({
                      ...prev,
                      presentationPage: {
                        ...prev.presentationPage,
                        stats: prev.presentationPage.stats.map((s) =>
                          s.id === stat.id ? { ...s, value: e.target.value } : s
                        ),
                      },
                    }))
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          stats: prev.presentationPage.stats.filter((s) => s.id !== stat.id),
                        },
                      }))
                    }
                  >
                    Supprimer cette statistique
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      stats: [...prev.presentationPage.stats, { id: newId, label: "", value: "" }],
                    },
                  }));
                  unlockField(`presentationPage.stats[${newId}].label`);
                  unlockField(`presentationPage.stats[${newId}].value`);
                }}
              >
                Ajouter une autre statistique
              </button>
              <button className="primary-btn" onClick={() => saveMessage("Page Presentation")}>
                Enregistrer
              </button>
            </section>
            <section className="form-card">
              <h3>Notre mission</h3>
              {renderField(
                "presentationPage.mission.titreNoir",
                "Titre-noir",
                data.presentationPage.mission.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      mission: { ...prev.presentationPage.mission, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.mission.titreBleu",
                "Titre-Bleu",
                data.presentationPage.mission.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      mission: { ...prev.presentationPage.mission, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.mission.description",
                "Description",
                data.presentationPage.mission.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      mission: { ...prev.presentationPage.mission, description: e.target.value },
                    },
                  })),
                true
              )}
              {renderField(
                "presentationPage.mission.image",
                "Image (URL)",
                data.presentationPage.mission.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      mission: { ...prev.presentationPage.mission, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Nos valeurs</h3>
              {data.presentationPage.valeurs.map((valeur, index) => (
                <div className="service-block" key={valeur.id}>
                  <h5>Valeur {index + 1}</h5>
                  {renderField(
                    `presentationPage.valeurs[${valeur.id}].titre`,
                    "Titre",
                    valeur.titre,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          valeurs: prev.presentationPage.valeurs.map((v) =>
                            v.id === valeur.id ? { ...v, titre: e.target.value } : v
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `presentationPage.valeurs[${valeur.id}].texte`,
                    "Texte",
                    valeur.texte,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          valeurs: prev.presentationPage.valeurs.map((v) =>
                            v.id === valeur.id ? { ...v, texte: e.target.value } : v
                          ),
                        },
                      })),
                    true
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          valeurs: prev.presentationPage.valeurs.filter((v) => v.id !== valeur.id),
                        },
                      }))
                    }
                  >
                    Supprimer cette valeur
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      valeurs: [...prev.presentationPage.valeurs, { id: newId, titre: "", texte: "" }],
                    },
                  }));
                  unlockField(`presentationPage.valeurs[${newId}].titre`);
                  unlockField(`presentationPage.valeurs[${newId}].texte`);
                }}
              >
                Ajouter une autre valeur
              </button>
            </section>
            <section className="form-card">
              <h3>Pourquoi travailler avec nous</h3>
              {renderField(
                "presentationPage.pourquoiTravailler.titreNoir",
                "Titre-noir",
                data.presentationPage.pourquoiTravailler.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      pourquoiTravailler: {
                        ...prev.presentationPage.pourquoiTravailler,
                        titreNoir: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.pourquoiTravailler.titreBleu",
                "Titre-Bleu",
                data.presentationPage.pourquoiTravailler.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      pourquoiTravailler: {
                        ...prev.presentationPage.pourquoiTravailler,
                        titreBleu: e.target.value,
                      },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.pourquoiTravailler.description",
                "Description",
                data.presentationPage.pourquoiTravailler.description,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      pourquoiTravailler: {
                        ...prev.presentationPage.pourquoiTravailler,
                        description: e.target.value,
                      },
                    },
                  })),
                true
              )}
              <div className="mini-form">
                <h4>Raisons</h4>
                {data.presentationPage.pourquoiTravailler.raisons.map((raison, index) => (
                  <div className="service-block" key={raison.id}>
                    <h5>Raison {index + 1}</h5>
                    {renderField(
                      `presentationPage.pourquoiTravailler.raisons[${raison.id}].titre`,
                      "Titre",
                      raison.titre,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          presentationPage: {
                            ...prev.presentationPage,
                            pourquoiTravailler: {
                              ...prev.presentationPage.pourquoiTravailler,
                              raisons: prev.presentationPage.pourquoiTravailler.raisons.map((r) =>
                                r.id === raison.id ? { ...r, titre: e.target.value } : r
                              ),
                            },
                          },
                        }))
                    )}
                    {renderField(
                      `presentationPage.pourquoiTravailler.raisons[${raison.id}].texte`,
                      "Texte",
                      raison.texte,
                      (e) =>
                        setData((prev) => ({
                          ...prev,
                          presentationPage: {
                            ...prev.presentationPage,
                            pourquoiTravailler: {
                              ...prev.presentationPage.pourquoiTravailler,
                              raisons: prev.presentationPage.pourquoiTravailler.raisons.map((r) =>
                                r.id === raison.id ? { ...r, texte: e.target.value } : r
                              ),
                            },
                          },
                        })),
                      true
                    )}
                    <button
                      type="button"
                      className="danger-btn"
                      onClick={() =>
                        setData((prev) => ({
                          ...prev,
                          presentationPage: {
                            ...prev.presentationPage,
                            pourquoiTravailler: {
                              ...prev.presentationPage.pourquoiTravailler,
                              raisons: prev.presentationPage.pourquoiTravailler.raisons.filter(
                                (r) => r.id !== raison.id
                              ),
                            },
                          },
                        }))
                      }
                    >
                      Supprimer cette raison
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    const newId = nextId;
                    setNextId((prev) => prev + 1);
                    setData((prev) => ({
                      ...prev,
                      presentationPage: {
                        ...prev.presentationPage,
                        pourquoiTravailler: {
                          ...prev.presentationPage.pourquoiTravailler,
                          raisons: [
                            ...prev.presentationPage.pourquoiTravailler.raisons,
                            { id: newId, titre: "", texte: "" },
                          ],
                        },
                      },
                    }));
                    unlockField(`presentationPage.pourquoiTravailler.raisons[${newId}].titre`);
                    unlockField(`presentationPage.pourquoiTravailler.raisons[${newId}].texte`);
                  }}
                >
                  Ajouter une autre raison
                </button>
              </div>
            </section>
            <section className="form-card">
              <h3>Mot du directeur</h3>
              {renderField(
                "presentationPage.motDirecteur.titre",
                "Titre",
                data.presentationPage.motDirecteur.titre,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: { ...prev.presentationPage.motDirecteur, titre: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.motDirecteur.nom",
                "Nom du directeur",
                data.presentationPage.motDirecteur.nom,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: { ...prev.presentationPage.motDirecteur, nom: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "presentationPage.motDirecteur.message1",
                "Message 1",
                data.presentationPage.motDirecteur.message1,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: {
                        ...prev.presentationPage.motDirecteur,
                        message1: e.target.value,
                      },
                    },
                  })),
                true
              )}
              {renderField(
                "presentationPage.motDirecteur.message2",
                "Message 2",
                data.presentationPage.motDirecteur.message2,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: {
                        ...prev.presentationPage.motDirecteur,
                        message2: e.target.value,
                      },
                    },
                  })),
                true
              )}
              {renderField(
                "presentationPage.motDirecteur.message3",
                "Message 3",
                data.presentationPage.motDirecteur.message3,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: {
                        ...prev.presentationPage.motDirecteur,
                        message3: e.target.value,
                      },
                    },
                  })),
                true
              )}
              {renderField(
                "presentationPage.motDirecteur.image",
                "Image (URL)",
                data.presentationPage.motDirecteur.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      motDirecteur: { ...prev.presentationPage.motDirecteur, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Notre equipe</h3>
              {data.presentationPage.equipe.map((membre, index) => (
                <div className="service-block" key={membre.id}>
                  <h5>Membre {index + 1}</h5>
                  {renderField(
                    `presentationPage.equipe[${membre.id}].nom`,
                    "Nom",
                    membre.nom,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          equipe: prev.presentationPage.equipe.map((m) =>
                            m.id === membre.id ? { ...m, nom: e.target.value } : m
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `presentationPage.equipe[${membre.id}].role`,
                    "Role",
                    membre.role,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          equipe: prev.presentationPage.equipe.map((m) =>
                            m.id === membre.id ? { ...m, role: e.target.value } : m
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `presentationPage.equipe[${membre.id}].image`,
                    "Image (URL)",
                    membre.image,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          equipe: prev.presentationPage.equipe.map((m) =>
                            m.id === membre.id ? { ...m, image: e.target.value } : m
                          ),
                        },
                      }))
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        presentationPage: {
                          ...prev.presentationPage,
                          equipe: prev.presentationPage.equipe.filter((m) => m.id !== membre.id),
                        },
                      }))
                    }
                  >
                    Supprimer ce membre
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    presentationPage: {
                      ...prev.presentationPage,
                      equipe: [
                        ...prev.presentationPage.equipe,
                        { id: newId, nom: "", role: "", image: "" },
                      ],
                    },
                  }));
                  unlockField(`presentationPage.equipe[${newId}].nom`);
                  unlockField(`presentationPage.equipe[${newId}].role`);
                  unlockField(`presentationPage.equipe[${newId}].image`);
                }}
              >
                Ajouter un autre membre
              </button>
              <button className="primary-btn" onClick={() => saveMessage("Page Presentation")}>
                Enregistrer
              </button>
            </section>
          </>
        )}

        {activeTab === "Realisations" && (
          <>
            <h1>Edition de la page Realisations</h1>
            <section className="form-card">
              <h3>Banniere et introduction</h3>
              {renderField(
                "realisationsPage.banniere.titreNoir",
                "Titre-noir banniere",
                data.realisationsPage.banniere.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    realisationsPage: {
                      ...prev.realisationsPage,
                      banniere: { ...prev.realisationsPage.banniere, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "realisationsPage.banniere.titreBleu",
                "Titre-Bleu banniere",
                data.realisationsPage.banniere.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    realisationsPage: {
                      ...prev.realisationsPage,
                      banniere: { ...prev.realisationsPage.banniere, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "realisationsPage.banniere.image",
                "Image",
                data.realisationsPage.banniere.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    realisationsPage: {
                      ...prev.realisationsPage,
                      banniere: { ...prev.realisationsPage.banniere, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Liste des realisations</h3>
              {data.realisationsPage.realisations.map((item, index) => (
                <div className="service-block" key={item.id}>
                  <h5>Realisation {index + 1}</h5>
                  {renderField(
                    `realisationsPage.realisations[${item.id}].client`,
                    "Client",
                    item.client,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.map((r) =>
                            r.id === item.id ? { ...r, client: e.target.value } : r
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `realisationsPage.realisations[${item.id}].projet`,
                    "Projet",
                    item.projet,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.map((r) =>
                            r.id === item.id ? { ...r, projet: e.target.value } : r
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `realisationsPage.realisations[${item.id}].category`,
                    "Categorie",
                    item.category,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.map((r) =>
                            r.id === item.id ? { ...r, category: e.target.value } : r
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `realisationsPage.realisations[${item.id}].imgBefore`,
                    "Image avant",
                    item.imgBefore,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.map((r) =>
                            r.id === item.id ? { ...r, imgBefore: e.target.value } : r
                          ),
                        },
                      }))
                  )}
                  {renderField(
                    `realisationsPage.realisations[${item.id}].imgAfter`,
                    "Image apres",
                    item.imgAfter,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.map((r) =>
                            r.id === item.id ? { ...r, imgAfter: e.target.value } : r
                          ),
                        },
                      }))
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        realisationsPage: {
                          ...prev.realisationsPage,
                          realisations: prev.realisationsPage.realisations.filter(
                            (r) => r.id !== item.id
                          ),
                        },
                      }))
                    }
                  >
                    Supprimer cette realisation
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    realisationsPage: {
                      ...prev.realisationsPage,
                      realisations: [
                        ...prev.realisationsPage.realisations,
                        {
                          id: newId,
                          client: "",
                          projet: "",
                          category: "",
                          imgBefore: "",
                          imgAfter: "",
                        },
                      ],
                    },
                  }));
                  ["client", "projet", "category", "imgBefore", "imgAfter"].forEach((field) =>
                    unlockField(`realisationsPage.realisations[${newId}].${field}`)
                  );
                }}
              >
                Ajouter une autre realisation
              </button>
              <button className="primary-btn" onClick={() => saveMessage("Page Realisations")}>
                Enregistrer
              </button>
            </section>
          </>
        )}

        {activeTab === "Contact" && (
          <>
            <h1>Edition de la page Contact</h1>
            <section className="form-card">
              <h3>Banniere</h3>
              {renderField(
                "contactPage.banniere.titreNoir",
                "Titre-noir",
                data.contactPage.banniere.titreNoir,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    contactPage: {
                      ...prev.contactPage,
                      banniere: { ...prev.contactPage.banniere, titreNoir: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "contactPage.banniere.titreBleu",
                "Titre-Bleu",
                data.contactPage.banniere.titreBleu,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    contactPage: {
                      ...prev.contactPage,
                      banniere: { ...prev.contactPage.banniere, titreBleu: e.target.value },
                    },
                  }))
              )}
              {renderField(
                "contactPage.banniere.image",
                "Image",
                data.contactPage.banniere.image,
                (e) =>
                  setData((prev) => ({
                    ...prev,
                    contactPage: {
                      ...prev.contactPage,
                      banniere: { ...prev.contactPage.banniere, image: e.target.value },
                    },
                  }))
              )}
            </section>
            <section className="form-card">
              <h3>Blocs d'informations</h3>
              {data.contactPage.infos.map((item, index) => (
                <div className="service-block" key={item.id}>
                  <h5>Bloc {index + 1}</h5>
                  {renderField(`contactPage.infos[${item.id}].titre`, "Titre", item.titre, (e) =>
                    setData((prev) => ({
                      ...prev,
                      contactPage: {
                        ...prev.contactPage,
                        infos: prev.contactPage.infos.map((i) =>
                          i.id === item.id ? { ...i, titre: e.target.value } : i
                        ),
                      },
                    }))
                  )}
                  {renderField(
                    `contactPage.infos[${item.id}].contenu`,
                    "Contenu",
                    item.contenu,
                    (e) =>
                      setData((prev) => ({
                        ...prev,
                        contactPage: {
                          ...prev.contactPage,
                          infos: prev.contactPage.infos.map((i) =>
                            i.id === item.id ? { ...i, contenu: e.target.value } : i
                          ),
                        },
                      })),
                    true
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        contactPage: {
                          ...prev.contactPage,
                          infos: prev.contactPage.infos.filter((i) => i.id !== item.id),
                        },
                      }))
                    }
                  >
                    Supprimer ce bloc
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="secondary-btn"
                onClick={() => {
                  const newId = nextId;
                  setNextId((prev) => prev + 1);
                  setData((prev) => ({
                    ...prev,
                    contactPage: {
                      ...prev.contactPage,
                      infos: [...prev.contactPage.infos, { id: newId, titre: "", contenu: "" }],
                    },
                  }));
                  unlockField(`contactPage.infos[${newId}].titre`);
                  unlockField(`contactPage.infos[${newId}].contenu`);
                }}
              >
                Ajouter un autre bloc
              </button>
            </section>
            <section className="form-card">
              <h3>Carte</h3>
              {renderField(
                "contactPage.mapCoordinates",
                "Coordonnees de la carte",
                data.contactPage.mapCoordinates,
                (e) =>
                setData((prev) => ({
                  ...prev,
                  contactPage: { ...prev.contactPage, mapCoordinates: e.target.value },
                }))
              )}
              <button className="primary-btn" onClick={() => saveMessage("Page Contact")}>
                Enregistrer
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
