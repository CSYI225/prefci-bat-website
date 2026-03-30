import { useState, useEffect } from 'react';
import api from '../api/axios';
import EditableField from '../components/EditableField';

export default function RealisationsAdmin() {
  const [realisations, setRealisations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banner, setBanner] = useState({ titreNoir: "", titreBleu: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({ ...prev, [key]: !prev[key] }));

  const fetchData = async () => {
    try {
      const [resReals, resCats, resPage] = await Promise.all([
        api.get('/admin/realisations'),
        api.get('/admin/categories'),
        api.get('/admin/pages/realisations/content')
      ]);
      setRealisations(resReals.data);
      setCategories(resCats.data);
      if (resPage.data && resPage.data.banniere) {
        setBanner(resPage.data.banniere);
      }
    } catch (e) {
      console.warn("Backend API not ready for Realisations.");
      setRealisations([{
        idRealisation: 1, titre: "Example", nomClient: "Client", descriptionProjet: "Desc", descriptionClient: "Desc Client",
        imageAvant: "", imageApres: "", idCategorie: null
      }]);
      setCategories([{ idCategorie: 1, nom: "Plomberie" }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData() }, []);

  const handleBannerChange = (field, val) => {
    setBanner(prev => ({ ...prev, [field]: val }));
  };

  const saveBanner = async () => {
    try {
      await api.patch('/admin/pages/realisations/banniere', banner);
      alert("Bannière enregistrée !");
    } catch (e) { alert("Erreur lors de la sauvegarde de la bannière."); }
  };

  const handleChange = (id, fieldName, val) => {
    setRealisations(prev => prev.map(r => r.idRealisation === id ? { ...r, [fieldName]: val } : r));
  };

  const handleCreate = async () => {
    try {
      await api.post('/admin/realisations', { titre: "Nouvelle réalisation" });
      fetchData();
    } catch (e) { alert("Erreur lors de l'ajout."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette réalisation ?")) return;
    try {
      await api.delete(`/admin/realisations/${id}`);
      fetchData();
    } catch (e) { alert("Erreur lors de la suppression."); }
  };

  const handleSave = async (real) => {
    try {
      const { idRealisation, categorie, dateRealisation, imageAvant, imageApres, ...textPayload } = real;

      // 1. Sauvegarder les champs texte (sans images pour éviter les paquets trop grands)
      await api.put(`/admin/realisations/${idRealisation}`, textPayload);

      // 2. Sauvegarder les images séparément (une à la fois)
      if (imageAvant !== undefined) {
        await api.put(`/admin/realisations/${idRealisation}`, { imageAvant });
      }
      if (imageApres !== undefined) {
        await api.put(`/admin/realisations/${idRealisation}`, { imageApres });
      }

      alert("Réalisation sauvegardée !");
      fetchData();
    } catch (e) {
      console.error("Save Error:", e.response?.data || e);
      const msg = e.response?.data?.message || "Erreur lors de la sauvegarde.";
      alert(msg);
    }
  };

  if (loading) return <div className="placeholder-card">Chargement...</div>;

  return (
    <>
      <h1>Gestion de la page Réalisations</h1>

      <section className="form-card">
        <h3>Bannière de la page</h3>
        <EditableField label="Titre Noir" value={banner.titreNoir} isEditing={editingFields["b_tn"]} onToggle={() => toggleEdit("b_tn")} onChange={(e) => handleBannerChange("titreNoir", e.target.value)} />
        <EditableField label="Titre Bleu" value={banner.titreBleu} isEditing={editingFields["b_tb"]} onToggle={() => toggleEdit("b_tb")} onChange={(e) => handleBannerChange("titreBleu", e.target.value)} />
        <EditableField label="Image de fond" value={banner.image} isEditing={editingFields["b_img"]} onToggle={() => toggleEdit("b_img")} onChange={(e) => handleBannerChange("image", e.target.value)} isImage />
        <button className="primary-btn" onClick={saveBanner}>Enregistrer la bannière</button>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
        <h2>Liste des Réalisations</h2>
        <button className="primary-btn" onClick={handleCreate}>+ Nouvelle Réalisation</button>
      </div>

      {realisations.map((real, index) => (
        <section className="form-card" key={real.idRealisation}>
          <h3>Projet #{index + 1} ({real.titre})</h3>

          <EditableField
            label="Titre du projet"
            value={real.titre}
            isEditing={editingFields[`titre_${real.idRealisation}`]}
            onToggle={() => toggleEdit(`titre_${real.idRealisation}`)}
            onChange={(e) => handleChange(real.idRealisation, 'titre', e.target.value)}
          />
          <EditableField
            label="Nom du Client / Entreprise"
            value={real.nomClient}
            isEditing={editingFields[`nom_${real.idRealisation}`]}
            onToggle={() => toggleEdit(`nom_${real.idRealisation}`)}
            onChange={(e) => handleChange(real.idRealisation, 'nomClient', e.target.value)}
          />
          <EditableField
            label="Description du Projet"
            value={real.descriptionProjet}
            isEditing={editingFields[`descP_${real.idRealisation}`]}
            onToggle={() => toggleEdit(`descP_${real.idRealisation}`)}
            onChange={(e) => handleChange(real.idRealisation, 'descriptionProjet', e.target.value)}
            textarea
          />
          <EditableField
            label="Description Client (Témoignage)"
            value={real.descriptionClient}
            isEditing={editingFields[`descC_${real.idRealisation}`]}
            onToggle={() => toggleEdit(`descC_${real.idRealisation}`)}
            onChange={(e) => handleChange(real.idRealisation, 'descriptionClient', e.target.value)}
            textarea
          />

          <div className="field-row">
            <label>Catégorie</label>
            <div className="field-input-wrap">
              <select
                value={real.idCategorie || ""}
                onChange={(e) => handleChange(real.idRealisation, 'idCategorie', e.target.value ? parseInt(e.target.value) : null)}
                disabled={!editingFields[`cat_${real.idRealisation}`]}
                style={{ width: '100%', padding: '8px' }}
              >
                <option value="">-- Sans catégorie --</option>
                {categories.map(c => <option key={c.idCategorie} value={c.idCategorie}>{c.nom}</option>)}
              </select>
              <button className="secondary-btn" onClick={() => toggleEdit(`cat_${real.idRealisation}`)} style={{ marginLeft: '10px' }}>
                {editingFields[`cat_${real.idRealisation}`] ? "Verrouiller" : "Modifier"}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <label><strong>Image Avant</strong></label>
              <EditableField
                label=""
                value={real.imageAvant}
                isEditing={editingFields[`imgAvant_${real.idRealisation}`]}
                onToggle={() => toggleEdit(`imgAvant_${real.idRealisation}`)}
                onChange={(e) => handleChange(real.idRealisation, 'imageAvant', e.target.value)}
                isImage
              />
            </div>
            {/* <div style={{flex: 1}}>
                <label><strong>Image Après</strong></label>
                <EditableField
                  label=""
                  value={real.imageApres}
                  isEditing={editingFields[`imgApres_${real.idRealisation}`]}
                  onToggle={() => toggleEdit(`imgApres_${real.idRealisation}`)}
                  onChange={(e) => handleChange(real.idRealisation, 'imageApres', e.target.value)}
                  isImage
                />
             </div> */}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button className="primary-btn" onClick={() => handleSave(real)}>Sauvegarder</button>
            <button className="danger-btn" onClick={() => handleDelete(real.idRealisation)}>Supprimer</button>
          </div>
        </section>
      ))}
    </>
  );
}
