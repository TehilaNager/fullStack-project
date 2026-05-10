import "./tag.css";
import { getTagKey } from "../../helpers/tagMaps";

function Tag({ type, value, label, size = "md" }) {
  const key = getTagKey(type, value);
  const displayValue = value || "לא צוין";

  return (
    <span className={`tag tag--${size} tag--${type} tag--${type}--${key}`}>
      {label && <span className="tag-label">{label}:</span>}
      {displayValue}
    </span>
  );
}

export default Tag;
