import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './bottomBar';
import NavBar from './navBar';
import '../css/PurchaseHistory.css';

const PurchaseHistory = () => {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [searchField, setSearchField] = useState("productName");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {

    const checkUser = async () => {
      try {
        await axios.get(
          "http://localhost:8000/home",
          {
            withCredentials: true
          }
        );
      } catch (err) {
        navigate("/");
      }
    };

    checkUser();

  }, []);

  useEffect(() => {

    axios.get(
      "http://localhost:8000/getPurchaseHistory",
      {
        withCredentials: true
      }
    )
    .then((res) => {
      setHistory(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const filteredHistory = history.filter((item) => {

    if (searchValue === "") {
      return true;
    }

    return String(item[searchField])
      .toLowerCase()
      .includes(searchValue.toLowerCase());

  });

  return (
    <div className="purchase-history-page">
    <div className="app">
      <NavBar />

      <div className="content">

        <h1>Purchase History</h1>
        
        <div className="history-search-section">
        <div className="select-box">
        <select
         value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        >
       <option value="productId">Product ID</option>
       <option value="productName">Product Name</option>
       <option value="buyPrice">Buy Price</option>
       <option value="supplier">Supplier</option>
       </select>
       </div>

        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        </div>

        <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Supplier</th>
              <th>Buy Price</th>
              <th>Quantity Purchased</th>
              <th>Expiry</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((item) => (
              <tr key={item._id}>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.supplier}</td>
                <td>{item.buyPrice}</td>
                <td>{item.quantityPurchased}</td>
                <td>
                  {item.expiry
                    ? new Date(item.expiry).toLocaleDateString()
                    : "-"
                  }
                </td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
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
  );
};

export default PurchaseHistory;