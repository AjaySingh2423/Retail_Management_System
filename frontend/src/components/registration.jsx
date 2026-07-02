import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/register.css';

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const sendUser = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
      name, email, shopName, shopAddress, password, role
    });

    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setShopName("");
    setShopAddress("");

    if (res.data.success === true) {
      navigate("/");
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={sendUser}>
        <h1>Register</h1>

        <div className="input-box">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Name</label>
        </div>

        <div className="input-box">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Email</label>
        </div>

        <div className="input-box">
          <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
          <label>Shop Name</label>
        </div>

        <div className="input-box">
          <input type="text" value={shopAddress} onChange={(e) => setShopAddress(e.target.value)} required />
          <label>Shop Address</label>
        </div>

         <div className="input-box">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">-- Select Role --</option>
        <option value="Shopkeeper">Shopkeeper</option>
        </select>
        </div>

        <div className="input-box">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>Password</label>
        </div>

        <div className="input-box">
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
          <label>Confirm Password</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Registration