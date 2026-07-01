import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/navbar.css'

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="navbar">
        
        {/* Logo */}
        <div className="logo">RetailPro</div>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/products">Products</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/billing">Billing</Link>
          <Link to="/coustomerBill">Coustomers bill</Link>
          <Link to="/purchaseHistory">Purchase History</Link>
          <Link to="/logout">Logout</Link>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "active" : ""}`}>
        
        {/* Close button */}
        <div className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </div>

        <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
        <Link to="/customers" onClick={() => setOpen(false)}>Customers</Link>
        <Link to="/billing" onClick={() => setOpen(false)}>Billing</Link>
        <Link to="/coustomerBill">Coustomers bill</Link>
        <Link to="/purchaseHistory">Purchase History</Link>
        <Link to="/logout" onClick={() => setOpen(false)}>Logout</Link>
      </div>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  )
}

export default NavBar