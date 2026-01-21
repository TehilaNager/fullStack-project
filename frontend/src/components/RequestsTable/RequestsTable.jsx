import "./requests-table.css";

function RequestsTable({ requests, onRowClick }) {
  return (
    <div className="table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>כותרת</th>
            <th>קטגוריה</th>
            <th>אזור</th>
            <th>קהל יעד</th>
            <th>דחיפות</th>
            <th>סטטוס</th>
            <th>תוקף</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="title-cell">{req.title}</td>
              <td>{req.category}</td>
              <td>{req.region}</td>
              <td>
                {req.requiredQuantity === 1
                  ? "אדם אחד"
                  : `${req.requiredQuantity} אנשים`}
              </td>

              <td>
                <span className={`priority-badge ${req.priority}`}>
                  {req.priority}
                </span>
              </td>
              <td>{req.status || "—"}</td>
              <td>
                {req.deadline
                  ? new Date(req.deadline).toLocaleDateString("he-IL")
                  : "ללא תוקף"}
              </td>
              <td>
                <button
                  className="table-action-btn"
                  onClick={() => onRowClick(req._id)}
                >
                  לפרטים
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestsTable;
