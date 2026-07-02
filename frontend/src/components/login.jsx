import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../css/login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password }, { withCredentials: true });

    if (res.data.user === false) {
      alert("Invalid email or password");
    }
    if (res.data.user === true) {
      navigate("/home");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={sendData}>
        <h1>Login</h1>

        <div className="input-box">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-box">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <button type="submit">Login</button>
        <p className="register-text">
  New user?
  <Link to="/register" className="register-link">
    Register here
  </Link>
</p>
      </form>
    </div>
  )
}

export default Login