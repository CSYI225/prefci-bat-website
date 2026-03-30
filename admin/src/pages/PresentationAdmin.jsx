import { useState, useEffect } from "react";
import api from "../api/axios";
import EditableField from "../components/EditableField";

const defaultState = {
  banniere: { titreNoir: "", titreBleu: "", image: "" },
  expertise: { titreNoir: "", titreBleu: "", description: "" },
  quiSommesNous: { titreNoir: "", titreBleu: "", description: "", image1: "", image2: "", image3: "" },
  stats: [],
  mission: { titreNoir: "", titreBleu: "", description: "", image: "" },
  valeurs: { titreNoir: "", titreBleu: "", description: "", image: "" },
  pourquoiTravailler: { titreNoir: "", titreBleu: "", description: "", raisons: [] },
  motDirecteur: { nom: "", message1: "", message2: "", message3: "", image: "" },
  equipe: { titreNoir: "", titreBleu: "", description: "", membres: [] }
};

export default function PresentationAdmin() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({...prev, [key]: !prev[key]}));
  const isEditing = (key) => !!editingFields[key];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/pages/presentation/content");
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
        console.warn("Utilisation du mock local en attendant le backend");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveSection = async (sectionKey, label) => {
    try {
      await api.patch(`/admin/pages/presentation/${sectionKey}`, data[sectionKey]);
      alert(`${label} enregistré avec succès !`);
    } catch (e) {
      alert("Erreur: Backend non prêt ou injoignable.");
    }
  };

  const updateField = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateRootArrayItem = (section, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addRootArrayItem = (section, defaultItem) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now(), ...defaultItem }]
    }));
  };

  const removeRootArrayItem = (section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const updateNestedArrayItem = (section, arrayKey, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: prev[section][arrayKey].map(item => item.id === id ? { ...item, [field]: value } : item)
      }
    }));
  };

  const addNestedArrayItem = (section, arrayKey, defaultItem) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: [...prev[section][arrayKey], { id: Date.now(), ...defaultItem }]
      }
    }));
  };

  const removeNestedArrayItem = (section, arrayKey, id) => {
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
      <h1>Édition de la page Présentation</h1>

      <section className="form-card">
        <h3>Bannière de la page</h3>
        <EditableField label="Titre Noir" value={data.banniere.titreNoir} isEditing={isEditing("b_tn")} onToggle={() => toggleEdit("b_tn")} onChange={(e) => updateField("banniere", "titreNoir", e.target.value)} />
        <EditableField label="Titre Bleu" value={data.banniere.titreBleu} isEditing={isEditing("b_tb")} onToggle={() => toggleEdit("b_tb")} onChange={(e) => updateField("banniere", "titreBleu", e.target.value)} />
        <EditableField label="Image de fond" value={data.banniere.image} isEditing={isEditing("b_img")} onToggle={() => toggleEdit("b_img")} onChange={(e) => updateField("banniere", "image", e.target.value)} isImage />
        <button className="primary-btn" onClick={() => saveSection("banniere", "Bannière")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Notre Mission</h3>
        <EditableField label="Titre Noir" value={data.mission.titreNoir} isEditing={isEditing("m_tn")} onToggle={() => toggleEdit("m_tn")} onChange={(e) => updateField("mission", "titreNoir", e.target.value)} />
        <EditableField label="Titre Bleu" value={data.mission.titreBleu} isEditing={isEditing("m_tb")} onToggle={() => toggleEdit("m_tb")} onChange={(e) => updateField("mission", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.mission.description} isEditing={isEditing("m_desc")} onToggle={() => toggleEdit("m_desc")} onChange={(e) => updateField("mission", "description", e.target.value)} textarea />
        <EditableField label="Image" value={data.mission.image} isEditing={isEditing("m_img_m")} onToggle={() => toggleEdit("m_img_m")} onChange={(e) => updateField("mission", "image", e.target.value)} isImage />
        <button className="primary-btn" onClick={() => saveSection("mission", "Mission")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Nos Valeurs</h3>
        <EditableField label="Titre Noir" value={data.valeurs.titreNoir} isEditing={isEditing("v_tn")} onToggle={() => toggleEdit("v_tn")} onChange={(e) => updateField("valeurs", "titreNoir", e.target.value)} />
        <EditableField label="Titre Bleu" value={data.valeurs.titreBleu} isEditing={isEditing("v_tb")} onToggle={() => toggleEdit("v_tb")} onChange={(e) => updateField("valeurs", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.valeurs.description} isEditing={isEditing("v_desc")} onToggle={() => toggleEdit("v_desc")} onChange={(e) => updateField("valeurs", "description", e.target.value)} textarea />
        <EditableField label="Image" value={data.valeurs.image} isEditing={isEditing("v_img_v")} onToggle={() => toggleEdit("v_img_v")} onChange={(e) => updateField("valeurs", "image", e.target.value)} isImage />
        <button className="primary-btn" onClick={() => saveSection("valeurs", "Valeurs")}>Enregistrer</button>
      </section>


      <section className="form-card">
        <h3>Qui sommes-nous</h3>
        <EditableField label="Titre-noir" value={data.quiSommesNous.titreNoir} isEditing={isEditing("pq_titreN")} onToggle={() => toggleEdit("pq_titreN")} onChange={(e) => updateField("quiSommesNous", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.quiSommesNous.titreBleu} isEditing={isEditing("pq_titreB")} onToggle={() => toggleEdit("pq_titreB")} onChange={(e) => updateField("quiSommesNous", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.quiSommesNous.description} isEditing={isEditing("pq_desc")} onToggle={() => toggleEdit("pq_desc")} onChange={(e) => updateField("quiSommesNous", "description", e.target.value)} textarea />
        <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
             <div style={{flex: 1}}>
                <label><strong>Image 1</strong></label>
                <EditableField label="" value={data.quiSommesNous.image1} isEditing={isEditing("pq_i1")} onToggle={() => toggleEdit("pq_i1")} onChange={(e) => updateField("quiSommesNous", "image1", e.target.value)} isImage />
             </div>
             <div style={{flex: 1}}>
                <label><strong>Image 2</strong></label>
                <EditableField label="" value={data.quiSommesNous.image2} isEditing={isEditing("pq_i2")} onToggle={() => toggleEdit("pq_i2")} onChange={(e) => updateField("quiSommesNous", "image2", e.target.value)} isImage />
             </div>
             <div style={{flex: 1}}>
                <label><strong>Image 3</strong></label>
                <EditableField label="" value={data.quiSommesNous.image3} isEditing={isEditing("pq_i3")} onToggle={() => toggleEdit("pq_i3")} onChange={(e) => updateField("quiSommesNous", "image3", e.target.value)} isImage />
             </div>
        </div>
        <button className="primary-btn" onClick={() => saveSection("quiSommesNous", "Qui sommes-nous")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Pourquoi Travailler Avec Nous</h3>
        <EditableField label="Titre-noir" value={data.pourquoiTravailler.titreNoir} isEditing={isEditing("pt_titreN")} onToggle={() => toggleEdit("pt_titreN")} onChange={(e) => updateField("pourquoiTravailler", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.pourquoiTravailler.titreBleu} isEditing={isEditing("pt_titreB")} onToggle={() => toggleEdit("pt_titreB")} onChange={(e) => updateField("pourquoiTravailler", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.pourquoiTravailler.description} isEditing={isEditing("pt_desc")} onToggle={() => toggleEdit("pt_desc")} onChange={(e) => updateField("pourquoiTravailler", "description", e.target.value)} textarea />
        
        <div className="mini-form" style={{marginTop: '20px'}}>
          <h4>Raisons (Éléments répétitifs)</h4>
          {data.pourquoiTravailler.raisons.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Raison {idx + 1}</h5>
              <EditableField label="Titre" value={item.titre} isEditing={isEditing(`pt_rt_${item.id}`)} onToggle={() => toggleEdit(`pt_rt_${item.id}`)} onChange={(e) => updateNestedArrayItem("pourquoiTravailler", "raisons", item.id, "titre", e.target.value)} />
              <EditableField label="Texte" value={item.texte} isEditing={isEditing(`pt_rx_${item.id}`)} onToggle={() => toggleEdit(`pt_rx_${item.id}`)} onChange={(e) => updateNestedArrayItem("pourquoiTravailler", "raisons", item.id, "texte", e.target.value)} textarea />
              <EditableField label="Icône / Image" value={item.image} isEditing={isEditing(`pt_ri_${item.id}`)} onToggle={() => toggleEdit(`pt_ri_${item.id}`)} onChange={(e) => updateNestedArrayItem("pourquoiTravailler", "raisons", item.id, "image", e.target.value)} isImage />
              <button className="danger-btn" onClick={() => removeNestedArrayItem("pourquoiTravailler", "raisons", item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addNestedArrayItem("pourquoiTravailler", "raisons", { titre: "", texte: "", image: "" })}>+ Ajouter une raison</button>
        </div>

        <button className="primary-btn" onClick={() => saveSection("pourquoiTravailler", "Pourquoi Travailler Avec Nous")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Mot du Directeur</h3>
        <EditableField label="Nom" value={data.motDirecteur.nom} isEditing={isEditing("m_n")} onToggle={() => toggleEdit("m_n")} onChange={(e) => updateField("motDirecteur", "nom", e.target.value)} />
        <EditableField label="Paragraphe 1" value={data.motDirecteur.message1} isEditing={isEditing("m_m1")} onToggle={() => toggleEdit("m_m1")} onChange={(e) => updateField("motDirecteur", "message1", e.target.value)} textarea />
        <EditableField label="Paragraphe 2" value={data.motDirecteur.message2} isEditing={isEditing("m_m2")} onToggle={() => toggleEdit("m_m2")} onChange={(e) => updateField("motDirecteur", "message2", e.target.value)} textarea />
        <EditableField label="Photo du Directeur" value={data.motDirecteur.image} isEditing={isEditing("m_img")} onToggle={() => toggleEdit("m_img")} onChange={(e) => updateField("motDirecteur", "image", e.target.value)} isImage />
        <button className="primary-btn" onClick={() => saveSection("motDirecteur", "Mot du Directeur")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>L'Équipe</h3>
        <EditableField label="Titre-noir" value={data.equipe.titreNoir} isEditing={isEditing("e_titreN")} onToggle={() => toggleEdit("e_titreN")} onChange={(e) => updateField("equipe", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.equipe.titreBleu} isEditing={isEditing("e_titreB")} onToggle={() => toggleEdit("e_titreB")} onChange={(e) => updateField("equipe", "titreBleu", e.target.value)} />
        <EditableField label="Description" value={data.equipe.description} isEditing={isEditing("e_desc")} onToggle={() => toggleEdit("e_desc")} onChange={(e) => updateField("equipe", "description", e.target.value)} textarea />

        <div className="mini-form">
          <h4>Membres de l'équipe (Éléments répétitifs)</h4>
          {(data.equipe.membres || []).map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Membre {idx + 1}</h5>
              <EditableField label="Nom" value={item.nom} isEditing={isEditing(`e_n_${item.id}`)} onToggle={() => toggleEdit(`e_n_${item.id}`)} onChange={(e) => updateNestedArrayItem("equipe", "membres", item.id, "nom", e.target.value)} />
              <EditableField label="Rôle" value={item.role} isEditing={isEditing(`e_r_${item.id}`)} onToggle={() => toggleEdit(`e_r_${item.id}`)} onChange={(e) => updateNestedArrayItem("equipe", "membres", item.id, "role", e.target.value)} />
              <EditableField label="Photo" value={item.image} isEditing={isEditing(`e_i_${item.id}`)} onToggle={() => toggleEdit(`e_i_${item.id}`)} onChange={(e) => updateNestedArrayItem("equipe", "membres", item.id, "image", e.target.value)} isImage />
              <button className="danger-btn" onClick={() => removeNestedArrayItem("equipe", "membres", item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addNestedArrayItem("equipe", "membres", { nom: "", role: "", image: "" })}>+ Ajouter un membre</button>
        </div>
        <button className="primary-btn" onClick={() => saveSection("equipe", "Équipe")}>Enregistrer</button>
      </section>

      <section className="form-card">
        <h3>Nos Statistiques Clés (Éléments répétitifs)</h3>
        <div className="mini-form">
          {data.stats.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Statistique {idx + 1}</h5>
              <EditableField label="Valeur (ex: 10+)" value={item.value} isEditing={isEditing(`st_v_${item.id}`)} onToggle={() => toggleEdit(`st_v_${item.id}`)} onChange={(e) => updateRootArrayItem("stats", item.id, "value", e.target.value)} />
              <EditableField label="Libellé (ex: Années d'expérience)" value={item.label} isEditing={isEditing(`st_l_${item.id}`)} onToggle={() => toggleEdit(`st_l_${item.id}`)} onChange={(e) => updateRootArrayItem("stats", item.id, "label", e.target.value)} />
              <button className="danger-btn" onClick={() => removeRootArrayItem("stats", item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addRootArrayItem("stats", { label: "", value: "" })}>+ Ajouter une statistique</button>
        </div>
        <button className="primary-btn" onClick={() => saveSection("stats", "Statistiques")}>Enregistrer</button>
      </section>
    </>
  );
}
