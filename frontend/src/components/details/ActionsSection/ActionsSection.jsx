import "./actions-section.css";

function ActionsSection({
  canManage,
  isEditingStatus,
  tempStatus,
  statusOptions = [],
  onStartEdit,
  onTempStatusChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  if (!canManage) return null;

  return (
    <div className="manage-buttons">
      <div className="manage-status">
        {!isEditingStatus ? (
          <button className="edit-status-btn" onClick={onStartEdit}>
            שינוי סטטוס
          </button>
        ) : (
          <div className="status-edit-box">
            <select
              value={tempStatus}
              onChange={(e) => onTempStatusChange(e.target.value)}
              className="status-select"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button className="save-status-btn" onClick={onSave}>
              שמור
            </button>

            <button className="cancel-status-btn" onClick={onCancel}>
              ביטול
            </button>
          </div>
        )}
      </div>

      <button className="edit-btn" onClick={onEdit}>
        <i className="bi bi-pencil manage-icon"></i>
      </button>

      <button className="delete-btn" onClick={onDelete}>
        <i className="bi bi-trash manage-icon"></i>
      </button>
    </div>
  );
}

export default ActionsSection;
