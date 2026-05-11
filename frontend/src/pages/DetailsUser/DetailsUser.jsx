import { Link } from "react-router";
import "./details-user.css";
import { useAuth } from "../../context/AuthContext";

function DetailsUser() {
  const { user } = useAuth();

  return (
    <div>
      <div>עמוד פרטי משתמש</div>

      <Link
        className="dropdown-item text-danger px-4 py-2"
        to={`/edit-user/${user?._id}`}
      >
        עריכה
      </Link>
    </div>
  );
}

export default DetailsUser;
