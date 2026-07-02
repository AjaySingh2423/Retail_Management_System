import React, { useState } from "react";
import axios from "axios";
import Footer from "./bottomBar";
import NavBar from "./navBar";
import '../css/CustomerBill.css';

const CoustomerBill = () => {

  const [searchField, setSearchField] =
    useState("customerEmail");

  const [searchValue, setSearchValue] =
    useState("");

  const [bills, setBills] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const handleSearch = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/searchBills`,
        {
          params: {
            field: searchField,
            value: searchValue
          },
          withCredentials: true
        }
      );

      console.log(res.data);

      setBills(res.data.bills);
      setSummary(res.data.summary);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Search Failed"
      );

    }
  };

  return (
    <div className="customer-bills-page">
    <div className="app">

      <NavBar />

      <div className="content">

        <h1>Customer Bills</h1>
        

        <div className="search-section">
        <select
          value={searchField}
          onChange={(e) =>
            setSearchField(e.target.value)
          }
        >
          <option value="customerEmail">
            Customer Email
          </option>

          <option value="billNo">
            Bill Number
          </option>
        </select>

        <input
          type="text"
          value={searchValue}
          placeholder="Enter Value"
          onChange={(e) =>
            setSearchValue(e.target.value)
          }
        />

        <button onClick={handleSearch}>
          Search
        </button>
        </div>

        {/* EMAIL SEARCH */}

        {searchField === "customerEmail" &&
          summary && (

          <div>

            <h2>
              Total Bills :
              {summary.totalBills}
            </h2>

            <h2>
              Total Items :
              {summary.totalItems}
            </h2>

            <h2>
              Total Value :
              ₹{summary.totalValue}
            </h2>

          </div>

        )}

        {searchField === "customerEmail" && (

        <div className="bill-table-wrapper">
        <table className="bill-table">

            <thead>
              <tr>
                <th>Bill No</th>
                <th>Email</th>
                <th>Total Items</th>
                <th>Grand Total</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {bills.map((bill) => (

                <tr key={bill._id}>

                  <td>{bill.billNo}</td>

                  <td>
                    {bill.customerEmail}
                  </td>

                  <td>
                    {
                      bill.items.reduce(
                        (sum, item) =>
                          sum + item.quantity,
                        0
                      )
                    }
                  </td>

                  <td>
                    ₹{bill.grandTotal}
                  </td>

                  <td>
                    {
                      new Date(
                        bill.createdAt
                      ).toLocaleDateString()
                    }
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
          </div>

        )}

        {/* BILL NUMBER SEARCH */}

        {searchField === "billNo" &&
         bills.length > 0 && (

          <div>

            <h2>
              Bill Number :
              {bills[0].billNo}
            </h2>

            <h2>
              Customer Email :
              {bills[0].customerEmail}
            </h2>

            <h2>
              Bill Date :
              {
                new Date(
                  bills[0].createdAt
                ).toLocaleDateString()
              }
            </h2>

            <h2>
              Grand Total :
              ₹{bills[0].grandTotal}
            </h2>

            <table border="1">

              <thead>

                <tr>

                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Sell Price</th>
                  <th>Quantity</th>
                  <th>Total</th>

                </tr>

              </thead>

              <tbody>

                {bills[0].items.map(
                  (item, index) => (

                  <tr key={index}>

                    <td>
                      {item.productId}
                    </td>

                    <td>
                      {item.productName}
                    </td>

                    <td>
                      {item.sellPrice}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      {item.total}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      <Footer />

    </div>
    </div>
  );
};

export default CoustomerBill;