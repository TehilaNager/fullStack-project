import "./details-grid-section.css";

function DetailsGridSection({ type = "request", items = [] }) {
  return (
    <div className={`grid-details ${type}`}>
      {items.map((item, index) => (
        <div key={index} className="detail-item" title={item.title}>
          <i className={`bi ${item.icon} detail-icon`}></i>

          <span className="detail-label">{item.label}</span>

          <span className="detail-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default DetailsGridSection;
