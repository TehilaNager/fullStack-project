import "./form-field.css";

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  options = [],
  as = "input",
  touched,
  errors,
  values,
  getFieldProps,
  required = false,
  children,
}) {
  const hasValue =
    values[name] !== undefined && values[name] !== null && values[name] !== "";

  const isInvalid = touched[name] && errors[name];
  const isValid = hasValue && !errors[name];

  const inputClass =
    `${
      as === "textarea"
        ? "form-textarea"
        : as === "select"
        ? "form-select"
        : "form-input"
    } form-control ` +
    `${isInvalid ? "is-invalid" : ""} ${isValid ? "is-valid" : ""}`;

  return (
    <div className="form-group">
      <label className="form-label">
        {required && <span style={{ color: "red" }}>*</span>} {label}
      </label>

      {as === "textarea" && (
        <textarea
          {...getFieldProps(name)}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {as === "select" && (
        <select {...getFieldProps(name)} className={inputClass}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input
          {...getFieldProps(name)}
          type={type}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      <div className="invalid-feedback">{errors[name]}</div>
      <div className="valid-feedback">תקין</div>

      {children}
    </div>
  );
}

export default FormField;
