import { useState, useEffect } from 'react';
import api from '../api/axios';
import EditableField from '../components/EditableField';

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [banner, setBanner] = useState({ titreNoir: "", titreBleu: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({...prev, [key]: !prev[key]}));

  const fetchData = async () => {
    try {
      const [resServices, resPage] = await Promise.all([
        api.get('/admin/services'),
        api.get('/admin/pages/services/content')
      ]);
      setServices(resServices.data);
      if (resPage.data && resPage.data.banniere) {
        setBanner(resPage.data.banniere);
      }
    } catch(e) {
      console.warn("Backend non prêt, mock activé.");
      setServices([{ idService: 1, titre: "Plomberie Mock", image: "", details: "" }]);
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
      await api.patch('/admin/pages/services/banniere', banner);
      alert("Bannière enregistrée !");
    } catch(e) { alert("Erreur lors de la sauvegarde de la bannière."); }
  };

  const handleChange = (id, fieldName, val) => {
    setServices(prev => prev.map(s => s.idService === id ? { ...s, [fieldName]: val } : s));
  };

  const handleCreate = async () => {
    try {
      await api.post('/admin/services', { titre: "Nouveau Service" });
      fetchData();
    } catch(e) { alert("API manquante pour l'ajout"); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Voulez-vous supprimer ce service ?")) return;
    try {
      await api.delete(`/admin/services/${id}`);
      fetchData();
    } catch(e) { alert("Erreur lors de la suppression"); }
  };

  const handleSave = async (service) => {
    try {
      // On retire les champs potentiellement problématiques ou inutiles avant l'envoi
      const { description, ...payload } = service; 
      await api.put(`/admin/services/${service.idService}`, payload);
      alert("Service enregistré !");
      fetchData(); // Rafraîchir pour être sûr
    } catch(e) { 
      console.error(e);
      alert("Erreur lors de la sauvegarde du service"); 
    }
  };

  if(loading) return <div className="placeholder-card">Chargement...</div>;

  return (
    <>
      <h1>Gestion de la page Services</h1>

      <section className="form-card">
        <h3>Bannière de la page</h3>
        <EditableField label="Titre Noir" value={banner.titreNoir} isEditing={editingFields["b_tn"]} onToggle={() => toggleEdit("b_tn")} onChange={(e) => handleBannerChange("titreNoir", e.target.value)} />
        <EditableField label="Titre Bleu" value={banner.titreBleu} isEditing={editingFields["b_tb"]} onToggle={() => toggleEdit("b_tb")} onChange={(e) => handleBannerChange("titreBleu", e.target.value)} />
        <EditableField label="Image de fond" value={banner.image} isEditing={editingFields["b_img"]} onToggle={() => toggleEdit("b_img")} onChange={(e) => handleBannerChange("image", e.target.value)} isImage />
        <button className="primary-btn" onClick={saveBanner}>Enregistrer la bannière</button>
      </section>

      <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px'}}>
        <h2>Liste des Services</h2>
        <button className="primary-btn" onClick={handleCreate}>+ Nouveau Service</button>
      </div>

      {services.map((service, index) => (
        <section className="form-card" key={service.idService}>
          <h3>Service #{index + 1} ({service.titre})</h3>
          
          <EditableField
            label="Titre du service"
            value={service.titre}
            isEditing={editingFields[`titre_${service.idService}`]}
            onToggle={() => toggleEdit(`titre_${service.idService}`)}
            onChange={(e) => handleChange(service.idService, 'titre', e.target.value)}
          />

          <EditableField
            label="Détails (Long texte)"
            value={service.details}
            isEditing={editingFields[`details_${service.idService}`]}
            onToggle={() => toggleEdit(`details_${service.idService}`)}
            onChange={(e) => handleChange(service.idService, 'details', e.target.value)}
            textarea
          />
          <EditableField
            label="Image (URL / Upload)"
            value={service.image}
            isEditing={editingFields[`img_${service.idService}`]}
            onToggle={() => toggleEdit(`img_${service.idService}`)}
            onChange={(e) => handleChange(service.idService, 'image', e.target.value)}
            isImage
          />

          <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
             <button className="primary-btn" onClick={() => handleSave(service)}>Sauvegarder</button>
             <button className="danger-btn" onClick={() => handleDelete(service.idService)}>Supprimer</button>
          </div>
        </section>
      ))}
    </>
  );
}
