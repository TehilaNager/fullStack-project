import { useNavigate } from "react-router";
import "./form-buttons.css";

function FormButtons({ onReset, textBtn, ...rest }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="button-group">
        <button
          onClick={() => navigate("/")}
          type="button"
          className="btn-Cancel"
        >
          ביטול
        </button>

        <button
          onClick={onReset}
          type="button"
          className="btn-refresh bi bi-arrow-clockwise"
        ></button>
      </div>

      <button type="submit" className="btn-submit" {...rest}>
        {textBtn}
      </button>
    </div>
  );
}

export default FormButtons;
