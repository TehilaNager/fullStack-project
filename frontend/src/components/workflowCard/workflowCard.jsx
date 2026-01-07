import "./workflow-card.css";

function WorkflowCard({ type, icon, title, steps = [] }) {
  return (
    <div className={`workflow-card ${type}`}>
      <div className="workflow-card-header">
        <div className="workflow-icon">
          <i className={`bi ${icon}`}></i>
        </div>
        <h3 className="workflow-card-title">{title}</h3>
      </div>

      <div className="workflow-steps">
        {steps.map((step, index) => (
          <div className="workflow-step" key={index}>
            <span className="step-index">{index + 1}</span>
            <div>
              <h4 className="workflow-step-title">{step.title}</h4>
              <p className="workflow-step-text">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowCard;
