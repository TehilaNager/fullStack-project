import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

function SignOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogOut = async () => {
      await logout();
      navigate("/");
    };

    handleLogOut();
  }, [logout, navigate]);

  return null;
}

export default SignOut;
