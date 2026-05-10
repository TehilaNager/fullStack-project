import "./section-wrapper.css";

function SectionWrapper({ icon, title, children }) {
  return (
    <div className="section-wrapper">
      <h2 className="section-title">
        <i className={`bi ${icon} section-icon`}></i>
        {title}
      </h2>

      {children}
    </div>
  );
}

export default SectionWrapper;
