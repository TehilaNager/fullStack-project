import { useState } from "react";
import "./inputPassword.css";

function InputPassword({ placeholder, fieldProps, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group password-group">
      <div className="input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          {...fieldProps}
          required
          dir="rtl"
        />
        <label className={fieldProps.value ? "filled" : ""}>
          {placeholder}
        </label>
        <i
          className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
          onClick={() => setShowPassword((prev) => !prev)}
        ></i>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default InputPassword;
