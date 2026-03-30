export default function EditableField({
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
    if (!file) return;
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
        <div style={{ flex: 1 }}>
          {isImage ? (
            <div className="image-field-extra">
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePick}
                disabled={!isEditing}
              />
              {value ? (
                <img className="image-preview" src={value} alt="Aperçu" style={{maxHeight:'100px', marginTop:'10px', display: 'block'}} />
              ) : (
                <p className="image-preview-empty">Aucune image sélectionnée</p>
              )}
            </div>
          ) : textarea ? (
            <textarea
              rows={4}
              value={value || ""}
              onChange={onChange}
              disabled={!isEditing}
              style={{ width: '100%', padding: '8px' }}
            />
          ) : (
            <input
              type="text"
              value={value || ""}
              onChange={onChange}
              disabled={!isEditing}
              style={{ width: '100%', padding: '8px' }}
            />
          )}
        </div>
        <button type="button" className="secondary-btn" onClick={onToggle} style={{ marginLeft: '10px' }}>
          {isEditing ? "Verrouiller" : "Modifier"}
        </button>
      </div>
    </div>
  );
}
