import { useNavigate } from "react-router";
import "./form-buttons.css";

function FormButtons({ onReset, textBtn, ...rest }) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="button-group">
        <button onClick={handleCancel} type="button" className="btn-Cancel">
          ביטול
        </button>

        <button
          onClick={onReset}
          type="button"
          className="btn-refresh bi bi-arrow-clockwise"
          title="איפוס"
        ></button>
      </div>

      <button type="submit" className="btn-submit" {...rest}>
        {textBtn}
      </button>
    </div>
  );
}

export default FormButtons;
