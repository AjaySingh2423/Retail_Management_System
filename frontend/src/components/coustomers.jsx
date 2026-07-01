import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Footer from './bottomBar';
import NavBar from './navBar';
import { useNavigate } from 'react-router-dom';
import '../css/Coustomers.css';

function Customers() {
    const navigate = useNavigate();

  useEffect(() => {

    const checkUser = async () => {
      try {
        await axios.get("http://localhost:8000/home", {
          withCredentials: true
        });
      } catch (err) {
        navigate("/");   //redirect if not logged in
      }
    };

    checkUser();
  }, []);

      const [name,setName] = useState("");
      const [email,setEmail] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:8000/addCoustomer",
      {
        name,
        email
      },
      {
        withCredentials: true
      }
    );

    alert("Customer Added");

    // Clear form
    setName("");
    setEmail("");

    // Refresh table
    const response = await axios.get(
      "http://localhost:8000/getCustomers",
      {
        withCredentials: true
      }
    );

    setCustomers(response.data);

  } catch (err) {

    if (err.response) {
      alert(
        err.response.data.message
      );
    } else if (err.request) {
      alert("Server is not responding");
    } else {
      alert("Something went wrong");
    }
    console.log(err);
  }
};

const [customers, setCustomers] = useState([]);

useEffect(() => {
  axios.get(
    "http://localhost:8000/getCustomers",
    {
      withCredentials: true
    }
  )
  .then((res) => setCustomers(res.data));
}, []);



const handleDeleteCustomer = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure?"
  );
  if (!confirmDelete) return;
  const res = await axios.delete(
    `http://localhost:8000/deleteCustomer/${id}`,
    {
      withCredentials: true
    }
  );

  alert(res.data.message);
  setCustomers(
    customers.filter(
      (customer) => customer._id !== id
    )
  );
};

const [search, setSearch] = useState("");

const filteredCustomers = customers.filter(
  (customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.email
      .toLowerCase()
      .includes(search.toLowerCase())
);


  return (
    <div className="customers-page">
      <div className="app">
     <NavBar/>
      <div className="content">
        {/* Your page content */}
        <form onSubmit={handleSubmit}>
           <input
  type='text'
  placeholder='Enter coustomer Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type='text'
  placeholder='Enter coustomer email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

 <input type='submit' value='Submit'/>
        </form>
        <input
  type="text"
  placeholder="Search Customer"
  className="customer-search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="customers-table-wrapper">
  <table className="customers-table">       
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody>
  {filteredCustomers.map((customer) => (
    <tr key={customer._id}>
      <td>{customer.name}</td>
      <td>{customer.email}</td>

      <td>
        <button
          onClick={() =>
            handleDeleteCustomer(customer._id)
          }
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
      </div>

      <Footer />
    </div>
    </div>
  )
}

export default Customers