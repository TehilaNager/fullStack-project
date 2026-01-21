import "./filter-group.css";

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="filter-group">
      <p className="filter-title">{title}</p>
      {options.map((opt) => (
        <label key={opt} className="filter-option">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default FilterGroup;
