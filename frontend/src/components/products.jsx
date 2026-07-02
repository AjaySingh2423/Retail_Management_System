import React, { useState } from 'react'
import Footer from './bottomBar';
import NavBar from './navBar';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Products.css';

function Products() {
     const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/home`, {
          withCredentials: true
        });
      } catch (err) {
        navigate("/");   //redirect if not logged in
      }
    };

    checkUser();
  }, []);


    
const [name,setName] = useState("");
const [category,setCategory] = useState("");     
const [brand,setBrand] = useState("");
const [buyPrice,setBuyPrice] = useState("");
const [sellPrice,setSellPrice] = useState("");
const [quantity,setQuantity] = useState("");
const [expiry,setExpiry] = useState("");
const [supplier,setSupplier] = useState("");

const [products,setProducts] = useState([]);
const [editingId, setEditingId] = useState(null);



useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getProducts`,{withCredentials: true})
      .then((res) => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );

  const handleEdit = (product) => {

  setEditingId(product._id);

  setName(product.name);
  setCategory(product.category);
  setBrand(product.brand);
  setBuyPrice(product.buyPrice);
  setSellPrice(product.sellPrice);
  setQuantity(product.quantity);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (editingId) {

    await axios.put(
      `${import.meta.env.VITE_API_URL}/updateProduct/${editingId}`,
      {
        name,
        category,
        brand,
        buyPrice,
        sellPrice,
        quantity
      },
      {
        withCredentials: true
      }
    );

    alert("Product updated");

    setEditingId(null);

  } else {

    await axios.post(
      `${import.meta.env.VITE_API_URL}/addProduct`,
      {
        name,
        category,
        brand,
        buyPrice,
        sellPrice,
        quantity,
        expiry,
        supplier
      },
      {
        withCredentials: true
      }
    );

    alert("Product added");
  }

  // Clear form
  setName("");
  setCategory("");
  setBrand("");
  setBuyPrice("");
  setSellPrice("");
  setQuantity("");
  setExpiry("");
  setSupplier("");

  // Refresh table
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/getProducts`,
    {
      withCredentials: true
    }
  );

  setProducts(res.data);
};

                                                   //Deleting product
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const res2 = await axios.delete(
      `${import.meta.env.VITE_API_URL}/deleteProduct/${id}`,
      {
        withCredentials: true
      }
    );

    alert(res2.data.message);

    setProducts(
      products.filter(
        (product) => product._id !== id
      )
    );

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Failed to delete product"
    );
  }
};
     
  return (
    <div className="products-page">
     <div className="app">
     <NavBar/>
      <div className="content">
        {/* Your page content */}
         <form onSubmit={handleSubmit}>
<input
  type='text'
  placeholder='Product Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type='text'
  placeholder='Category'
  value={category}
  onChange={(e) => setCategory(e.target.value)}
/>

<input
  type='text'
  placeholder='Brand'
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
/>

<input
  type='number'
  placeholder='Buy Price'
  value={buyPrice}
  onChange={(e) => setBuyPrice(e.target.value)}
/>

<input
  type='number'
  placeholder='Sell Price'
  value={sellPrice}
  onChange={(e) => setSellPrice(e.target.value)}
/>

<input
  type='number'
  placeholder='Quantity'
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
/>

<input
  type='date'
  placeholder='Expiry Date'
  value={expiry}
  onChange={(e) => setExpiry(e.target.value)}
/>

<input
  type='text'
  placeholder='Supplier Name'
  value={supplier}
  onChange={(e) => setSupplier(e.target.value)}
/>
           <input type='submit'value={editingId ? "Update" : "Add Product"}/>
           </form>
 {name &&
        filteredProducts.map((product) => (
          <div key={product._id}>
            {product.name}/{product.category}/{product.brand}/{product.buyPrice}/{product.sellPrice}
          </div>
        ))}


      <div className="products-table-wrapper">
      <table className="products-table">    
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Catagory</th>
          <th>Brand</th>
          <th>Buy Price</th>
          <th>Sell Price</th>
          <th>Quantity</th>
          <th>Edit</th>
          <th>Delete</th>
          
        </tr>
        {products.map((product)=> (
           <tr key={product._id}>
           <td>{product.productId}</td>
           <td>{product.name}</td>
           <td>{product.category}</td>
           <td>{product.brand}</td>
           <td>{product.buyPrice}</td>
           <td>{product.sellPrice}</td>
           <td>{product.quantity}</td>
           <td><button onClick={() => handleEdit(product)}>Edit</button></td>
           <td><button onClick={() => handleDelete(product._id)}>Delete</button></td>
           </tr>
        
        ))}
      </table>
      </div>  
      </div>
      
      <Footer />
    </div>
    </div>
  )
}

export default Products