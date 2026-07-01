const express=require("express");
const { handleLogin,handleHome,handleLogout,handleRegister,handleAddProducts,handleProduct,handleCoustomer,handleBilling,handleAddCoustomer,handleGetProducts,handleSaveBill,handleDeleteProduct,handleUpdateProduct,handleGetCustomers,handleDeleteCustomer,handleGetPurchaseHistory,handleSearchPurchaseHistory,handleSearchBills,handleGetShopkeeper,handleUpdateProfile,handleDashboard,handleSendBillEmail} =require("../controllers/user");
const {restrictToLoggedInUserOnly} = require("../middleware/auth");
const router=express.Router();


router.post("/login", handleLogin );    
router.get("/home",restrictToLoggedInUserOnly,handleHome);
router.get("/product",restrictToLoggedInUserOnly,handleProduct);
router.get("/coustomer",restrictToLoggedInUserOnly,handleCoustomer); 
router.get("/billing",restrictToLoggedInUserOnly,handleBilling);    
router.get("/logout",handleLogout);
router.post("/register",handleRegister);
router.post("/addProduct",restrictToLoggedInUserOnly,handleAddProducts);
router.post("/addCoustomer",restrictToLoggedInUserOnly,handleAddCoustomer);
router.get("/getProducts",restrictToLoggedInUserOnly,handleGetProducts);
router.post("/saveBill",restrictToLoggedInUserOnly,handleSaveBill); 
router.delete("/deleteProduct/:id",restrictToLoggedInUserOnly,handleDeleteProduct);  
router.put("/updateProduct/:id",restrictToLoggedInUserOnly,handleUpdateProduct);
router.get("/getCustomers",restrictToLoggedInUserOnly,handleGetCustomers);
router.delete("/deleteCustomer/:id",restrictToLoggedInUserOnly,handleDeleteCustomer);
router.get("/getPurchaseHistory",restrictToLoggedInUserOnly,handleGetPurchaseHistory);
router.get("/searchPurchaseHistory",restrictToLoggedInUserOnly,handleSearchPurchaseHistory);
router.get("/searchBills",restrictToLoggedInUserOnly,handleSearchBills);
router.get("/getShopkeeper",restrictToLoggedInUserOnly,handleGetShopkeeper);
router.put("/updateProfile",restrictToLoggedInUserOnly,handleUpdateProfile);
router.get("/dashboard",restrictToLoggedInUserOnly,handleDashboard);
router.post("/sendBillEmail",restrictToLoggedInUserOnly,handleSendBillEmail);
module.exports = router;