import "./input.css";

function Input({ type = "text", placeholder, fieldProps, error }) {
  return (
    <div className="form-group">
      <div className="input-wrapper">
        <input type={type} {...fieldProps} required />
        <label className={fieldProps.value ? "filled" : ""}>
          {placeholder}
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Input;
