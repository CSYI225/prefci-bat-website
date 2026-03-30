import { useEffect, useState } from 'react';
import api from '../api/axios';
import EditableField from '../components/EditableField';

export default function DynamicPageAdmin({ slug, title }) {
  const [loading, setLoading] = useState(false);
  const [schema, setSchema] = useState(null); 
  const [valeurs, setValeurs] = useState({}); 
  const [editingFields, setEditingFields] = useState({});

  const toggleEdit = (key) => setEditingFields(prev => ({...prev, [key]: !prev[key]}));

  const handleChange = (champId, blocId, val) => {
    const key = blocId ? `${champId}_${blocId}` : `${champId}`;
    setValeurs(prev => ({...prev, [key]: { ...prev[key], contenu: val, id_champ: champId, id_bloc: blocId }}));
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/pages/${slug}/content`);
      // Le backend devra renvoyer { page: {...}, sections: [...], valeurs: [...] }
      setSchema({ page: res.data.page, sections: res.data.sections });
      
      const vols = {};
      if (res.data.valeurs) {
        res.data.valeurs.forEach(v => {
          const key = v.id_bloc ? `${v.id_champ}_${v.id_bloc}` : `${v.id_champ}`;
          vols[key] = { ...v, contenu: v.contenu || '' };
        });
      }
      setValeurs(vols);
    } catch (error) {
      console.warn("Backend API not fully ready, falling back to mock schema.", error);
      // Mock de test en attendant que l'API Backend soit créée !
      setSchema({
        page: { nom_page: title || slug, slug },
        sections: [
          {
            id_section: 1, nom_section: "Bannière & Description",
            champs: [
               { id_champ: 1, nom_champ: "Titre principal", type_champ: "texte" },
               { id_champ: 2, nom_champ: "Description", type_champ: "textarea" },
               { id_champ: 3, nom_champ: "Image de fond", type_champ: "image" }
            ],
            blocs: []
          },
          {
            id_section: 2, nom_section: "Éléments répétables",
            champs: [
               { id_champ: 4, nom_champ: "Nom de l'élément", type_champ: "texte" },
               { id_champ: 5, nom_champ: "Détails", type_champ: "textarea" }
            ],
            blocs: [
               { id_bloc: 1 },
               { id_bloc: 2 }
            ]
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleSave = async (sectionId) => {
    try {
      const sectionFields = schema.sections.find(s => s.id_section === sectionId).champs.map(c => c.id_champ);
      const valuesToSave = Object.values(valeurs).filter(v => sectionFields.includes(v.id_champ));
      await api.post(`/admin/pages/${slug}/valeurs`, { valeurs: valuesToSave, id_section: sectionId });
      alert("Enregistré avec succès !");
    } catch (e) {
      alert("Erreur: L'API backend n'est pas encore prête.");
    }
  };

  const addBloc = async (sectionId) => {
     try {
       await api.post(`/admin/sections/${sectionId}/blocs`);
       loadData();
     } catch(e) {
       alert("L'ajout dynamique de bloc requiert le backend.");
     }
  };

  const deleteBloc = async (blocId) => {
     try {
       await api.delete(`/admin/blocs/${blocId}`);
       loadData();
     } catch(e) {
       alert("L'effacement de bloc requiert le backend.");
     }
  };

  if (loading) return <div className="placeholder-card">Chargement...</div>;
  if (!schema) return <div className="placeholder-card">Erreur de chargement.</div>;

  return (
    <>
      <h1>Édition : {schema.page.nom_page}</h1>
      {schema.sections.map(section => (
        <section className="form-card" key={section.id_section}>
          <h3>{section.nom_section}</h3>
          
          {section.champs.map(champ => {
            const key = `${champ.id_champ}`;
            const val = valeurs[key]?.contenu || "";
            return (
              <EditableField
                key={key}
                label={champ.nom_champ}
                value={val}
                isEditing={editingFields[key]}
                onToggle={() => toggleEdit(key)}
                onChange={(e) => handleChange(champ.id_champ, null, e.target.value)}
                textarea={champ.type_champ === 'textarea'}
                isImage={champ.type_champ === 'image'}
              />
            )
          })}

          {section.blocs && section.blocs.length > 0 && (
             <div className="mini-form">
               <h4>Éléments multiples</h4>
               {section.blocs.map((bloc, index) => (
                 <div className="service-block" key={bloc.id_bloc}>
                    <h5>N° {index + 1}</h5>
                    {section.champs.map(champ => {
                       const key = `${champ.id_champ}_${bloc.id_bloc}`;
                       const val = valeurs[key]?.contenu || "";
                       return (
                         <EditableField
                           key={key}
                           label={champ.nom_champ}
                           value={val}
                           isEditing={editingFields[key]}
                           onToggle={() => toggleEdit(key)}
                           onChange={(e) => handleChange(champ.id_champ, bloc.id_bloc, e.target.value)}
                           textarea={champ.type_champ === 'textarea'}
                           isImage={champ.type_champ === 'image'}
                         />
                       )
                    })}
                    <button className="danger-btn" onClick={() => deleteBloc(bloc.id_bloc)}>Supprimer</button>
                 </div>
               ))}
               <button className="secondary-btn" onClick={() => addBloc(section.id_section)} style={{marginTop: '10px'}}>
                 Ajouter un élément à {section.nom_section}
               </button>
             </div>
          )}
          {section.blocs && section.blocs.length === 0 && section.champs.length > 0 && section.nom_section.toLowerCase().includes('multiple') && (
            <button className="secondary-btn" onClick={() => addBloc(section.id_section)} style={{marginTop: '10px'}}>
              Créer un premier élément
            </button>
          )}

          <button className="primary-btn" onClick={() => handleSave(section.id_section)} style={{marginTop: '20px'}}>
            Enregistrer les modifications
          </button>
        </section>
      ))}
    </>
  );
}
