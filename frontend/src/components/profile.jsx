import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Footer from './bottomBar';
import NavBar from './navBar';
import '../css/Profile.css';


const Profile = () => {
    const navigate = useNavigate();
    
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/home`, {
          withCredentials: true
        });
        

      } catch (err) {
        navigate("/");   //redirect if not logged in
      }
    };

    checkUser();
  }, []);

  const [user, setUser] = useState({});
  useEffect(() => {

  axios.get(
    `${import.meta.env.VITE_API_URL}/getShopkeeper`,
    {
      withCredentials: true
    }
  )
  .then((res) => {
    setUser(res.data);
  });

}, []);



const handleEdit = async (field) => {

  const newValue = prompt(
    `Enter new ${field}`,
    user[field]
  );

  if (!newValue) return;

  try {

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/updateProfile`,
      {
        field,
        value: newValue
      },
      {
        withCredentials: true
      }
    );

    alert(res.data.message);

    setUser({
      ...user,
      [field]: newValue
    });

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Update failed"
    );

  }
};

  return (
    <div className="profile-page">
     <div className="app">
     <NavBar/>
      <div className="content">
        {/* Your page content */}
        <h1>My Profile</h1>


<div className="profile-table-wrapper">
  <table className="profile-table">
    <tbody>

      <tr>
        <td>Name</td>
        <td>{user.name}</td>
        <td>
          <button onClick={() => handleEdit("name")}>
            Edit
          </button>
        </td>
      </tr>

      <tr>
        <td>Email</td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => handleEdit("email")}>
            Edit
          </button>
        </td>
      </tr>

      <tr>
        <td>Shop Name</td>
        <td>{user.shopName}</td>
        <td>
          <button onClick={() => handleEdit("shopName")}>
            Edit
          </button>
        </td>
      </tr>

      <tr>
        <td>Shop Address</td>
        <td>{user.shopAddress}</td>
        <td>
          <button onClick={() => handleEdit("shopAddress")}>
            Edit
          </button>
        </td>
      </tr>

    </tbody>
  </table>
</div>
       
      </div>

      <Footer />
    </div>
    </div>
  )
}

export default Profile