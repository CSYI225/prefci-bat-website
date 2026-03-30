import { useState, useEffect } from "react";
import api from "../api/axios";
import EditableField from "../components/EditableField";

const defaultState = {
  banniere: { titreNoir: "", titreBleu: "", image: "" },
  infos: [],
  mapCoordinates: ""
};

export default function ContactAdmin() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({...prev, [key]: !prev[key]}));
  const isEditing = (key) => !!editingFields[key];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/admin/pages/contact/content");
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
      if (sectionKey === "pageData") {
        // Enregistrer chaque section séparément car le backend est conçu par section
        await Promise.all([
          api.patch(`/admin/pages/contact/banniere`, data.banniere),
          api.patch(`/admin/pages/contact/infos`, data.infos),
          api.patch(`/admin/pages/contact/mapCoordinates`, { value: data.mapCoordinates })
        ]);
        alert("Toute la page Contact a été enregistrée !");
      } else {
        const payload = sectionKey === 'mapCoordinates' ? { value: data[sectionKey] } : data[sectionKey];
        await api.patch(`/admin/pages/contact/${sectionKey}`, payload);
        alert(`${label} enregistré avec succès !`);
      }
    } catch (e) {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  const updateField = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateArrayItem = (id, field, value) => {
    setData(prev => ({
      ...prev,
      infos: prev.infos.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addArrayItem = (defaultItem) => {
    setData(prev => ({
      ...prev,
      infos: [...prev.infos, { id: Date.now(), ...defaultItem }]
    }));
  };

  const removeArrayItem = (id) => {
    setData(prev => ({
      ...prev,
      infos: prev.infos.filter(item => item.id !== id)
    }));
  };

  if (loading) return <div className="placeholder-card">Chargement...</div>;

  return (
    <>
      <h1>Édition de la page Contact</h1>

      <section className="form-card">
        <h3>Bannière</h3>
        <EditableField label="Titre-noir" value={data.banniere.titreNoir} isEditing={isEditing("b_titreN")} onToggle={() => toggleEdit("b_titreN")} onChange={(e) => updateField("banniere", "titreNoir", e.target.value)} />
        <EditableField label="Titre-Bleu" value={data.banniere.titreBleu} isEditing={isEditing("b_titreB")} onToggle={() => toggleEdit("b_titreB")} onChange={(e) => updateField("banniere", "titreBleu", e.target.value)} />
        <EditableField label="Image (URL / Upload)" value={data.banniere.image} isEditing={isEditing("b_img")} onToggle={() => toggleEdit("b_img")} onChange={(e) => updateField("banniere", "image", e.target.value)} isImage />
      </section>

      <section className="form-card">
        <h3>Coordonnées de l'entreprise (Éléments répétitifs)</h3>
        <div className="mini-form">
          {data.infos.map((item, idx) => (
            <div className="service-block" key={item.id}>
              <h5>Information {idx + 1}</h5>
              <EditableField label="Libellé (ex: Email, Adresse)" value={item.titre} isEditing={isEditing(`i_t_${item.id}`)} onToggle={() => toggleEdit(`i_t_${item.id}`)} onChange={(e) => updateArrayItem(item.id, "titre", e.target.value)} />
              <EditableField label="Contenu" value={item.contenu} isEditing={isEditing(`i_c_${item.id}`)} onToggle={() => toggleEdit(`i_c_${item.id}`)} onChange={(e) => updateArrayItem(item.id, "contenu", e.target.value)} />
              <button className="danger-btn" onClick={() => removeArrayItem(item.id)}>Supprimer</button>
            </div>
          ))}
          <button className="secondary-btn" onClick={() => addArrayItem({ titre: "", contenu: "" })}>+ Ajouter une coordonnée</button>
        </div>
      </section>

      <section className="form-card">
        <h3>Coordonnées de la Carte (Google Maps)</h3>
        <EditableField label="Coordonnées GPS (ex: 5.318854,-3.957688)" value={data.mapCoordinates} isEditing={isEditing("map_coord")} onToggle={() => toggleEdit("map_coord")} onChange={(e) => setData(prev => ({ ...prev, mapCoordinates: e.target.value }))} />
      </section>

      {/* Bouton global pour toute la page Contact vu sa petite taille */}
      <button className="primary-btn" onClick={() => saveSection("pageData", "Contact")} style={{marginTop: '20px'}}>Enregistrer toute la page</button>
    </>
  );
}
