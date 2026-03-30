import { useState, useEffect } from "react";
import api from "../api/axios";

export default function DevisAdmin() {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevis = async () => {
    try {
      const res = await api.get("/admin/devis");
      setDevis(res.data);
    } catch (e) {
      console.warn("Backend non prêt pour Devis");
      setDevis([
        {
          id_demande: 1,
          nom_client: "Jean Dupont",
          email: "jean@example.com",
          telephone: "0758314119",
          service_demande: "Plomberie générale",
          message: "J'ai une fuite au niveau de la tuyauterie...",
          date_demande: new Date().toISOString(),
          statut: "en_attente",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDevis(); }, []);

  const updateStatut = async (id, nouveauStatut) => {
    try {
      await api.patch(`/admin/devis/${id}/statut`, { statut: nouveauStatut });
      alert("Statut mis à jour !");
      fetchDevis();
    } catch (e) {
      alert("API manquante pour la mise à jour");
    }
  };

  if(loading) return <div className="placeholder-card">Chargement des devis...</div>;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Gestion des Demandes de Devis</h1>
      </div>

      {devis.map((demande) => (
        <section className="form-card" key={demande.id_demande} style={{borderLeft: demande.statut === 'en_attente' ? '5px solid #ffcc00' : '5px solid #4CAF50'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h3>{demande.nom_client}</h3>
            <span>{new Date(demande.date_demande).toLocaleDateString()}</span>
          </div>
          
          <p><strong>Email :</strong> {demande.email}</p>
          <p><strong>Téléphone :</strong> {demande.telephone || 'Non renseigné'}</p>
          <p><strong>Service :</strong> {demande.service_demande}</p>
          <div style={{background: '#f9f9f9', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
             <strong>Message :</strong>
             <p>{demande.message}</p>
          </div>

          <div className="field-row" style={{marginTop: '20px'}}>
            <label><strong>Statut :</strong></label>
            <div className="field-input-wrap">
              <select 
                value={demande.statut} 
                onChange={(e) => updateStatut(demande.id_demande, e.target.value)}
                style={{ padding: '8px', minWidth: '200px' }}
              >
                <option value="en_attente">En attente</option>
                <option value="traite">Traité</option>
                <option value="refuse">Refusé</option>
              </select>
            </div>
          </div>
        </section>
      ))}
      
      {devis.length === 0 && (
         <p>Aucune demande de devis pour le moment.</p>
      )}
    </>
  );
}
