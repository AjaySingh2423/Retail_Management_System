import React, { useState,useEffect } from 'react'
import Footer from './bottomBar';
import NavBar from './navBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import '../css/Billing.css';

function Billing() {
   const navigate = useNavigate();

    const [shopInfo, setShopInfo] = useState({});
  
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


     useEffect(() => {
     axios.get("http://localhost:8000/getShopkeeper",{withCredentials: true})
      .then((res) => setShopInfo(res.data));
     }, []);


      const [items,setItems] = useState([]);
      const [quantity,setQuantity] = useState("");
      const [products, setProducts] = useState([]);
      const [search, setSearch] = useState("");
      const [email, setEmail] = useState("");
      const [prid,setPrid] = useState("");

    
      const [billNo, setBillNo] = useState("");
      const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/getProducts",{withCredentials: true})
      .then((res) => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

 const handleClick = (e) => {
  e.preventDefault();

  const product = products.find(
    (p) => p.productId === Number(prid)
  );

  console.log(product);

const Price=(Number(product.sellPrice))*(Number(quantity));
console.log(Price);
   const item = {
  ...product,
  quantityP: Number(quantity),
  price: Number(Price)
};

 setItems([...items, item]);
 setSearch("");
 setQuantity("") ;
 setPrid("");
 
};

const handleDelete = (_id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (!confirmDelete) return;

  const updatedItems = items.filter(
    (item) => item._id !== _id
  );

  setItems(updatedItems);
};


const handleEdit = (_id) => {
  const newQuantity = prompt("Enter new quantity:");

  if (!newQuantity) return;

  const updatedItems = items.map((item) => {
    if (item._id === _id) {
      return {
        ...item,
        quantityP: Number(newQuantity),
        price: Number(item.sellPrice) * Number(newQuantity)
      };
    }

    return item;
  });

  setItems(updatedItems);
};


const handleFinalSubmit = async () => {

  const result = await saveBillToDatabase();

  if (result.success) {

    generatePDF(
      result.billNo,
      result.customerName
    );

    setItems([]);
    setQuantity("");
    setSearch("");
    setEmail("");
    setPrid("");

  }
};

                                             //Saving bill to database
const saveBillToDatabase = async () => {
  const billItems = items.map((item) => ({
    productId: item._id,
    productName: item.name,
    sellPrice: item.sellPrice,
    quantity: item.quantityP,
    total: item.price
  }));

  const grandTotal = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  try {
    const response = await axios.post(
      "http://localhost:8000/saveBill",
      {
        customerEmail: email,
        items: billItems,
        grandTotal
      },
      {
        withCredentials: true
      }
    );

    setBillNo(response.data.billNo);
    setCustomerName(response.data.customerName || "");

    alert(response.data.message);

    return {
   success: true,
   billNo: response.data.billNo,
   customerName: response.data.customerName
   };

  } catch (err) {

    console.log(err);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    alert(err.response?.data?.message);

    return false; // failed
  }
};



                                                                // Generating pdf bill
const generatePDF =async ( currentBillNo,currentCustomerName) => {

  const doc = new jsPDF();

  const grandTotal = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  console.log("billNo:", currentBillNo);
  console.log("customerName:", currentCustomerName);

  // Shop Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text(
    shopInfo.shopName || "",
    105,
    15,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    shopInfo.shopAddress || "",
    105,
    22,
    { align: "center" }
  );

  doc.text(
    shopInfo.email || "",
    105,
    28,
    { align: "center" }
  );

  doc.line(10, 33, 200, 33);

  // Invoice Heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  doc.text(
    "INVOICE",
    105,
    42,
    { align: "center" }
  );

  // Bill Details
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(
    `Bill No : ${currentBillNo}`,
    14,
    55
  );

  doc.text(
    `Date : ${new Date().toLocaleDateString()}`,
    140,
    55
  );

  doc.text(
    `Customer Name : ${currentCustomerName}`,
    14,
    63
  );

  doc.text(
    `Customer Email : ${email}`,
    14,
    70
  );

  // Products Table
  autoTable(doc, {
    startY: 80,

    head: [
      [
        "Product Name",
        "Rate",
        "Quantity",
        "Amount"
      ]
    ],

    body: items.map((item) => [
      item.name,
      item.sellPrice,
      item.quantityP,
      item.price
    ]),

    theme: "grid",

    styles: {
      halign: "center",
      valign: "middle",
      fontSize: 10
    },

    headStyles: {
      fontStyle: "bold"
    }
  });

  const finalY = doc.lastAutoTable.finalY;

  doc.line(
    120,
    finalY + 10,
    195,
    finalY + 10
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text(
  "Grand Total : Rs. " + String(grandTotal),
  130,
  finalY + 20
);

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");

  doc.text(
    "Thank you for your purchase!",
    105,
    finalY + 35,
    { align: "center" }
  );

doc.save(`Bill_${currentBillNo}.pdf`);

const pdfBase64 = doc.output("datauristring");

await axios.post(
  "http://localhost:8000/sendBillEmail",
  {
    customerEmail: email,
    billNo: currentBillNo,
    pdfData: pdfBase64
  },
  {
    withCredentials: true
  }
);

};




      
  return (
    <div className="billing-page">
     <div className="app">
     <NavBar/>
      <div className="content">
        <h1>Billing</h1>
        <form onSubmit={handleClick}>
         <div>
      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Id"
        value={prid}
        onChange={(e) => setPrid(e.target.value)}
      />
      
      <div className="product-suggestions">
      {search &&
        filteredProducts.map((product) => (
          <div key={product._id} style={{marginLeft:"10px"}}  className="suggestion-item">
           {product.productId}/{product.name}/{product.category}/{product.brand}/{product.buyPrice}/{product.sellPrice}
          </div>
        ))}
        </div>
    </div>
        <input placeholder='Enter quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
        <input placeholder='Enter coustomer email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input type='submit' value='Submit'/>
        </form>
  <div className="billing-table-wrapper">
  <table className="billing-table">
           <thead>
          <tr>
            <td>Product name</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Sub total</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          </thead>
           <tbody>
              {
        items.map((product) => (
          <tr key={product._id}>
            <td>
            {product.name}
            </td>
            <td>
            {product.sellPrice}
            </td>
            <td>
            {product.quantityP}
            </td>
            <td>
            {product.price}
            </td>
            <td>
              <button
               type="button"
               onClick={() => handleDelete(product._id)}
               >
               Delete
              </button>
            </td>
            <td>
               <button
    type="button"
    onClick={() => handleEdit(product._id)}
  >
    Edit
  </button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        </div>
        <button  onClick={handleFinalSubmit}>Submit</button>
      </div>

      <Footer />
    </div>
    </div>
  )
}

export default Billing