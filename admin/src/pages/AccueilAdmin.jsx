import { useState, useEffect } from "react";
import api from "../api/axios";
import EditableField from "../components/EditableField";

const defaultState = {
  banniere: { titreNoir: "", titreBleu: "", image: "" },
  quiSommesNous: { image: "", titreNoir: "", titreBleu: "", description: "" },
  nosServices: { titreNoir: "", titreBleu: "", description: "", services: [] },
  nosRealisations: { titreNoir: "", titreBleu: "", description: "", realisations: [] },
  nosPartenaires: { titreNoir: "", titreBleu: "", description: "", partenaires: [] },
  avisClients: { titreNoir: "", titreBleu: "", description: "", avis: [] },
  devisGratuit: { titreNoir: "", titreBleu: "", description: "" }
};

export default function AccueilAdmin() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({...prev, [key]: !prev[key]}));
  const isEditing = (key) => !!editingFields[key];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/pages/accueil/content");
        if(res.data) {
          setData(prev => {
            const next = { ...prev };
            Object.keys(res.data).forEach(key => {
              if (res.data[key]) next[key] = res.data[key];
            });
            return next;
          });
        }
      } catch (e) {
        console.warn("Utilisation du mock local en attendant le backend", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveSection = async (sectionKey, label) => {
    try {
      await api.patch(`/admin/pages/accueil/${sectionKey}`, data[sectionKey]);
      alert(`${label} enregistré avec succès !`);
    } catch (e) {
      alert("Erreur: Backend non prêt ou injoignable.");
    }
  };

  const updateField = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateArrayItem = (section, arrayKey, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: prev[section][arrayKey].map(item => item.id === id ? { ...item, [field]: value } : item)
      }
    }));
  };

  const addArrayItem = (section, arrayKey, defaultItem) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: [...prev[section][arrayKey], { id: Date.now(), ...defaultItem }]
      }
    }));
  };

  const removeArrayItem = (section, arrayKey, id) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: prev[section][arrayKey].filter(item => item.id !== id)
      }
    }));
  };

  if (loading) return <div className="placeholder-card">Chargement...</div>;

  return (
    <>
      <h1>Édition de la page Accueil</h1>

      <section className="form-card">
        <h3>Bannière</h3>
        <EditableField label="Titre-noir" value={data.banniere.titreNoir} isEditing={isEditing("b_titreN")} onToggle={() => toggleEdit("b_titreN")} onChange={(e) => updateField("banniere", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.banniere.titreBleu} isEditing={isEditing("b_titreB")} onToggle={() => toggleEdit("b_titreB")} onChange={(e) => updateField("banniere", "titreBleu", e.target.value)} />
        <EditableField label="Image (URL / Upload)" value={data.banniere.image} isEditing={isEditing("b_img")} onToggle={() => toggleEdit("b_img")} onChange={(e) => updateField("banniere", "image", e.target.value)} isImage />
        <button className="primary-btn" onClick={() => saveSection("banniere", "Bannière Accueil")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Qui sommes-nous</h3>
        <EditableField label="Image" value={data.quiSommesNous.image} isEditing={isEditing("q_img")} onToggle={() => toggleEdit("q_img")} onChange={(e) => updateField("quiSommesNous", "image", e.target.value)} isImage />
        <EditableField label="Titre-noir" value={data.quiSommesNous.titreNoir} isEditing={isEditing("q_titreN")} onToggle={() => toggleEdit("q_titreN")} onChange={(e) => updateField("quiSommesNous", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.quiSommesNous.titreBleu} isEditing={isEditing("q_titreB")} onToggle={() => toggleEdit("q_titreB")} onChange={(e) => updateField("quiSommesNous", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.quiSommesNous.description} isEditing={isEditing("q_desc")} onToggle={() => toggleEdit("q_desc")} onChange={(e) => updateField("quiSommesNous", "description", e.target.value)} textarea />
        <button className="primary-btn" onClick={() => saveSection("quiSommesNous", "Qui sommes-nous")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Nos services mis en avant (Accueil)</h3>
        <EditableField label="Titre-noir" value={data.nosServices.titreNoir} isEditing={isEditing("s_titreN")} onToggle={() => toggleEdit("s_titreN")} onChange={(e) => updateField("nosServices", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.nosServices.titreBleu} isEditing={isEditing("s_titreB")} onToggle={() => toggleEdit("s_titreB")} onChange={(e) => updateField("nosServices", "titreBleu", e.target.value)} />
        <EditableField label="Description courte" value={data.nosServices.description} isEditing={isEditing("s_desc")} onToggle={() => toggleEdit("s_desc")} onChange={(e) => updateField("nosServices", "description", e.target.value)} textarea />
        
        <div className="mini-form">
          <h4>Éléments répétitifs (Les services affichés)</h4>
          <p style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>Ajoutez ici les services spécifiques que vous voulez montrer sur la page d'accueil.</p>
          {data.nosServices.services.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Service {idx + 1}</h5>
              <EditableField label="Nom" value={item.nom} isEditing={isEditing(`s_n_${item.id}`)} onToggle={() => toggleEdit(`s_n_${item.id}`)} onChange={(e) => updateArrayItem("nosServices", "services", item.id, "nom", e.target.value)} />
              <EditableField label="Description" value={item.description} isEditing={isEditing(`s_d_${item.id}`)} onToggle={() => toggleEdit(`s_d_${item.id}`)} onChange={(e) => updateArrayItem("nosServices", "services", item.id, "description", e.target.value)} textarea />
              <EditableField label="Image" value={item.image} isEditing={isEditing(`s_i_${item.id}`)} onToggle={() => toggleEdit(`s_i_${item.id}`)} onChange={(e) => updateArrayItem("nosServices", "services", item.id, "image", e.target.value)} isImage />
              <button className="danger-btn" onClick={() => removeArrayItem("nosServices", "services", item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addArrayItem("nosServices", "services", { nom: "", description: "", image: "" })}>+ Ajouter un service à l'accueil</button>
        </div>
        <button className="primary-btn" onClick={() => saveSection("nosServices", "Nos services (Accueil)")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Nos partenaires</h3>
        <EditableField label="Titre-noir" value={data.nosPartenaires.titreNoir} isEditing={isEditing("p_titreN")} onToggle={() => toggleEdit("p_titreN")} onChange={(e) => updateField("nosPartenaires", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.nosPartenaires.titreBleu} isEditing={isEditing("p_titreB")} onToggle={() => toggleEdit("p_titreB")} onChange={(e) => updateField("nosPartenaires", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.nosPartenaires.description} isEditing={isEditing("p_desc")} onToggle={() => toggleEdit("p_desc")} onChange={(e) => updateField("nosPartenaires", "description", e.target.value)} textarea />
        
        <div className="mini-form">
          <h4>Liste des partenaires</h4>
          <p style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>Logos et noms des partenaires récurrents.</p>
          {data.nosPartenaires.partenaires.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Partenaire {idx + 1}</h5>
              <EditableField label="Nom" value={item.nom} isEditing={isEditing(`p_n_${item.id}`)} onToggle={() => toggleEdit(`p_n_${item.id}`)} onChange={(e) => updateArrayItem("nosPartenaires", "partenaires", item.id, "nom", e.target.value)} />
              <EditableField label="Logo" value={item.image} isEditing={isEditing(`p_i_${item.id}`)} onToggle={() => toggleEdit(`p_i_${item.id}`)} onChange={(e) => updateArrayItem("nosPartenaires", "partenaires", item.id, "image", e.target.value)} isImage />
              <button className="danger-btn" onClick={() => removeArrayItem("nosPartenaires", "partenaires", item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addArrayItem("nosPartenaires", "partenaires", { nom: "", image: "" })}>+ Ajouter un partenaire</button>
        </div>
        <button className="primary-btn" onClick={() => saveSection("nosPartenaires", "Partenaires")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Avis clients</h3>
        <EditableField label="Titre-noir" value={data.avisClients.titreNoir} isEditing={isEditing("a_titreN")} onToggle={() => toggleEdit("a_titreN")} onChange={(e) => updateField("avisClients", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.avisClients.titreBleu} isEditing={isEditing("a_titreB")} onToggle={() => toggleEdit("a_titreB")} onChange={(e) => updateField("avisClients", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.avisClients.description} isEditing={isEditing("a_desc")} onToggle={() => toggleEdit("a_desc")} onChange={(e) => updateField("avisClients", "description", e.target.value)} textarea />
        
        <div className="mini-form">
          <h4>Témoignages (Répétitifs)</h4>
          {data.avisClients.avis.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Avis {idx + 1}</h5>
              <EditableField label="Nom" value={item.nom} isEditing={isEditing(`a_n_${item.id}`)} onToggle={() => toggleEdit(`a_n_${item.id}`)} onChange={(e) => updateArrayItem("avisClients", "avis", item.id, "nom", e.target.value)} />
              <EditableField label="Rôle/Entreprise" value={item.role} isEditing={isEditing(`a_r_${item.id}`)} onToggle={() => toggleEdit(`a_r_${item.id}`)} onChange={(e) => updateArrayItem("avisClients", "avis", item.id, "role", e.target.value)} />
              <EditableField label="Texte de l'avis" value={item.texte} isEditing={isEditing(`a_t_${item.id}`)} onToggle={() => toggleEdit(`a_t_${item.id}`)} onChange={(e) => updateArrayItem("avisClients", "avis", item.id, "texte", e.target.value)} textarea />
              <EditableField label="Avatar (Initiales ou URL)" value={item.avatar} isEditing={isEditing(`a_a_${item.id}`)} onToggle={() => toggleEdit(`a_a_${item.id}`)} onChange={(e) => updateArrayItem("avisClients", "avis", item.id, "avatar", e.target.value)} />
              <button className="danger-btn" onClick={() => removeArrayItem("avisClients", "avis", item.id)}>Supprimer cet avis</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addArrayItem("avisClients", "avis", { nom: "", role: "", texte: "", avatar: "" })}>+ Ajouter un avis client</button>
        </div>
        <button className="primary-btn" onClick={() => saveSection("avisClients", "Avis clients")}>Enregistrer</button>
      </section>
    </>
  );
}
