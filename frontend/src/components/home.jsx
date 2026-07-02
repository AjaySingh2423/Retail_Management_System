import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Footer from './bottomBar';
import NavBar from './navBar';
import '../css/Home.css';

const Home = () => {
  
    const navigate = useNavigate();
    const [name,setName]=useState("");
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/home`, {
          withCredentials: true
        });
        setName(res.data.message);

      } catch (err) {
        navigate("/");   //redirect if not logged in
      }
    };

    checkUser();
  }, []);

  const [dashboard, setDashboard] = useState({});

  useEffect(() => {

  axios.get(
    `${import.meta.env.VITE_API_URL}/dashboard`,
    {
      withCredentials: true
    }
  )
  .then((res) => {
    setDashboard(res.data);
  });

}, []);




  return (
     <div className="app">
     <NavBar/>
      <div className="content">
        <h1>{name}</h1>
        <div className="card-container">

  <div className="card">
    <h3>Total Products</h3>
    <h2>
      {dashboard.totalProducts}
    </h2>
  </div>

  <div className="card">
    <h3>Total Customers</h3>
    <h2>
      {dashboard.totalCustomers}
    </h2>
  </div>

  <div className="card">
    <h3>Stock Value</h3>
    <h2>
      ₹{dashboard.stockValue}
    </h2>
  </div>

  <div className="card">
    <h3>Profit (24 Hours)</h3>
    <h2>
      ₹{dashboard.profit24Hours}
    </h2>
  </div>

</div>

<h2>Low Stock Products</h2>
<div className="table-wrapper">
<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Quantity</th>
</tr>
</thead>

<tbody>

{
dashboard.lowStockProducts?.map(
(product) => (

<tr key={product._id}>
<td>{product.productId}</td>
<td>{product.name}</td>
<td>{product.quantity}</td>
</tr>

))
}
</tbody>
</table>
</div>


<h2>
Products Expiring Within 10 Days
</h2>


<div className="table-wrapper">
<table>
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Expiry</th>
</tr>
</thead>
<tbody>

{
dashboard.expiringProducts?.map(
(product) => (

<tr key={product._id}>
<td>{product.productId}</td>
<td>{product.productName}</td>
<td>
{
new Date(
product.expiry
).toLocaleDateString()
}
</td>
</tr>

))
}
</tbody>
</table>
</div>

      </div>

      <Footer />
    </div>
  )
}

export default Home