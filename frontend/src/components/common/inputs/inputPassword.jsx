import { useState } from "react";
import "./inputPassword.css";

function InputPassword({ placeholder, fieldProps, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group password-group">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...fieldProps}
      />
      <i
        className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
        onClick={() => setShowPassword((prev) => !prev)}
      ></i>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default InputPassword;
