import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true
      });
      navigate("/");
    };

    logout();
  }, []);

  return <p>Logging out...</p>;
}

export default Logout;