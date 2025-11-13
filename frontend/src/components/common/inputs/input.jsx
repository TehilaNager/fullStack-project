import "./input.css";

function Input({ type = "text", placeholder, fieldProps, error }) {
  return (
    <div className="form-group">
      <input type={type} placeholder={placeholder} {...fieldProps} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Input;
