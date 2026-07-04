const User=require("../models/user");
const Product=require("../models/product");
const Coustomer=require("../models/coustomer");
const CoustomerBills = require("../models/coustomerBills");
const PurchaseHistory =require("../models/purchaseHistory");
const transporter = require("../services/email");
const bcrypt = require("bcrypt");
const { params } = require("../routes/user");
const {setUser} = require("../services/auth");





                                                                                   //Handle Login
async function  handleLogin(req,res){
        const {email,password} = req.body;

                   const user = await User.findOne({email});
                   if(!user){
                       return res.json({user: false,message:"User not found"});  
                   }

                   const isMatch = await bcrypt.compare(password, user.password);

                   if (!isMatch) {
                   return res.json({ user: false, message: "Invalid password" });
                   }
                   
                   const token = setUser(user);

                     res.cookie("uid", token, {
                      httpOnly: true,
                      secure: true,     
                      sameSite: "None",
                    });

                     res.json({user: true});

              }


 async function handleHome(req,res){
  
   const name=req.user.name;
   res.json({ message: "Welcome "+name, user: req.user });
 } 
 
 async function handleProduct(req,res){
   res.json({ message: "Welcome to home", user: req.user });
 }
 
 async function handleCoustomer(req,res){
   res.json({ message: "Welcome to home", user: req.user });
 } 

 async function handleBilling(req,res){
   res.json({ message: "Welcome to home", user: req.user });
 }
 
 async function handleLogout(req,res){
            res.clearCookie("uid");
            res.json({ success: true });
 }


                                                                              //Handle Register
 async function handleRegister(req,res){
 try {
    const { name, email, shopName, shopAddress, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      shopName,
      shopAddress,
      password: hashedPassword,
      role,
    });

    return res.json({
      success: true,
      user
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating user"
    });
  }
 }
                                                                                 //Adding product
 async function handleAddProducts(req,res){
    
    const shopkeeperId1 = req.user._id;

    const {
    shopkeeperId,
    name,
    category,
    brand,
    buyPrice,
    sellPrice,
    quantity,
    expiry,
    supplier
    } = req.body;

    
    const existingProduct = await Product.findOne({
    name,
    category,
    brand,
    buyPrice,
    sellPrice,
    shopkeeperId: shopkeeperId1
    });

if (existingProduct) {
  existingProduct.quantity += Number(quantity);
  await existingProduct.save();

  await PurchaseHistory.create({
    productId: existingProduct._id,
    productName: name,
    supplier,
    expiry,
    quantityPurchased: quantity,
    buyPrice,
    shopkeeperId: shopkeeperId1
  });

  return res.status(200).json({
    message: "Stock updated successfully"
  });
}

const LastProduct = await Product.findOne({
    shopkeeperId: shopkeeperId1
    }).sort({productId: -1 });

const productId = LastProduct
  ? LastProduct.productId + 1
  : 1;

const product = await Product.create({
  shopkeeperId: shopkeeperId1,
  productId,
  name,
  category,
  brand,
  buyPrice,
  sellPrice,
  quantity
});

await PurchaseHistory.create({
  productId: product._id,
  productName: name,
  supplier,
  expiry,
  quantityPurchased: quantity,
  buyPrice,
  shopkeeperId: shopkeeperId1
});

return res.status(201).json({
  message: "Product added successfully"
});
    
}
                                                                        //Adding coustomer
 async function handleAddCoustomer(req,res){
  try {
    const shopkeeperId = req.user._id;
    const { name, email } = req.body;
    const customer = new Coustomer({
        name,
        email,
        shopkeeperId
    });

    await customer.save();
    
    return res.status(201).json({
      success: true,
      customer
    });

  } catch(err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
                                                                     //Get Products
async function handleGetProducts(req,res){
     try {
     const shopkeeperId = req.user._id;

     const product = await Product.find({
        shopkeeperId: shopkeeperId
     });
    
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
 }
                                       
                                                                        //Saving bill
 async function handleSaveBill(req, res) {
try {
const shopkeeperId2 = req.user._id;


const {
  customerEmail,
  items,
  grandTotal
} = req.body;

if(items.length==0){
   return res.status(404).json({
      message: "Atleast one product to generate bill"
    });
}

// Check customer exists for this shopkeeper
const customer = await Coustomer.findOne({
  email: customerEmail,
  shopkeeperId: shopkeeperId2
});

if (!customer) {
  return res.status(400).json({
    message: "Customer is not registered"
  });
}

// Check stock for all products
for (const item of items) {

  const product = await Product.findOne({
    _id: item.productId,
    shopkeeperId: shopkeeperId2
  });

  if (!product) {
    return res.status(404).json({
      message: `${item.productName} not found`
    });
  }

  if (product.quantity < item.quantity) {
    return res.status(400).json({
      message: `Not enough stock for ${product.name}`
    });
  }

  if (item.quantity < 0) {
  return res.status(400).json({
    message: "Quantity cannot be negative"
  });
}

if (item.quantity == 0) {
  return res.status(400).json({
    message: "Quantity cannot be zero"
  });
}
}

// Generate bill number
const lastBill = await CoustomerBills.findOne({
  shopkeeperId: shopkeeperId2
}).sort({ billNo: -1 });

const billNo = lastBill
  ? lastBill.billNo + 1
  : 1;

// Save bill
const bill = new CoustomerBills({
  billNo,
  shopkeeperId: shopkeeperId2,
  customerEmail,
  items,
  grandTotal
});

await bill.save();

// Update stock
for (const item of items) {

  const product = await Product.findOne({
    _id: item.productId,
    shopkeeperId: shopkeeperId2
  });

  product.quantity -= item.quantity;

  await product.save();
}


return res.status(201).json({
  message: "Bill saved successfully",
  billNo,
  customerName: customer.name
});


} catch (err) {
return res.status(500).json({
message: err.message
});
}
}
                                                                    //Delete Product
async function handleDeleteProduct(req, res) {
  try {
    const shopkeeperId = req.user._id;
    const productId = req.params.id;

    const product = await Product.findOneAndDelete({
      _id: productId,
      shopkeeperId
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}
                                                                        //Updating product
async function handleUpdateProduct(req, res) {

  const shopkeeperId = req.user._id;

  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      shopkeeperId
    },
    req.body,
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  return res.status(200).json({
    message: "Product updated successfully"
  });
}
                                                                         //Get coustomer
async function handleGetCustomers(req, res) {
  try {

    const shopkeeperId = req.user._id;

    const customers = await Coustomer.find({
      shopkeeperId
    });

    return res.status(200).json(customers);

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

                                                                      //Deleting coustomer
async function handleDeleteCustomer(req, res) {
  try {

    const shopkeeperId = req.user._id;

    const customer = await Coustomer.findOneAndDelete({
      _id: req.params.id,
      shopkeeperId
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    return res.status(200).json({
      message: "Customer deleted successfully"
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
}
                                                                       //Get Purchase History
async function handleGetPurchaseHistory(req, res) {
  try {

    const shopkeeperId = req.user._id;

    const history = await PurchaseHistory.find({
      shopkeeperId
    }).sort({ createdAt: -1 });

    return res.status(200).json(history);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
}
                                                                       //Search Purchase History
async function handleSearchPurchaseHistory(req, res) {

  try {

    const shopkeeperId = req.user._id;

    const { field, value } = req.query;

    const query = {
      shopkeeperId
    };

    if (value) {
      query[field] = {
        $regex: value,
        $options: "i"
      };
    }

    const history = await PurchaseHistory.find(query);

    return res.status(200).json(history);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
}
                                                                              //Search Bills
async function handleSearchBills(req, res) {
  try {

    const shopkeeperId = req.user._id;
    const { field, value } = req.query;

    let query = {
      shopkeeperId
    };

    if (value) {

      if (field === "billNo") {
        query.billNo = Number(value);
      }

      if (field === "customerEmail") {
        query.customerEmail = value;
      }
    }

    const bills = await CoustomerBills.find(query)
      .sort({ createdAt: -1 });

    let summary = null;

    if (field === "customerEmail" && value) {

      let totalBills = bills.length;
      let totalItems = 0;
      let totalValue = 0;

      bills.forEach((bill) => {

        totalValue += bill.grandTotal;

        bill.items.forEach((item) => {
          totalItems += item.quantity;
        });

      });

      summary = {
        totalBills,
        totalItems,
        totalValue
      };
    }

    return res.status(200).json({
      bills,
      summary
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
}

                                                              //Get Shopkeeper
async function handleGetShopkeeper(req, res) {
  try {

    const shopkeeper = await User.findById(
      req.user._id
    );

    if (!shopkeeper) {
      return res.status(404).json({
        message: "Shopkeeper not found"
      });
    }

    return res.status(200).json(shopkeeper);

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });
  }
}
                                                                       //Update Profile
async function handleUpdateProfile(req, res) {
  try {
    const shopkeeperId = req.user._id;

    const {
      field,
      value
    } = req.body;

    const allowedFields = [
      "name",
      "email",
      "shopName",
      "shopAddress"
    ];

    if (
      !allowedFields.includes(field)
    ) {
      return res.status(400).json({
        message: "Invalid field"
      });
    }

    await User.findByIdAndUpdate(
      shopkeeperId,
      {
        [field]: value
      }
    );

    return res.status(200).json({
      message: "Profile updated"
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });

  }
}


                                                              //Handle Dashboard
async function handleDashboard(req, res) {
  try {
    const shopkeeperId = req.user._id;

    const totalProducts =
      await Product.countDocuments({
        shopkeeperId
      });

    const totalCustomers =
      await Coustomer.countDocuments({
        shopkeeperId
      });

    const products =
      await Product.find({
        shopkeeperId
      });

    const stockValue = products.reduce(
      (sum, product) =>
        sum +
        (product.buyPrice * product.quantity),
      0
    );

    const lowStockProducts =
      await Product.find({
        shopkeeperId,
        quantity: { $lt: 4 }
      });

    const today = new Date();

    const tenDaysLater = new Date();
    tenDaysLater.setDate(
      tenDaysLater.getDate() + 10
    );

    const expiringProducts =
      await PurchaseHistory.find({
        shopkeeperId,
        expiry: {
          $gte: today,
          $lte: tenDaysLater
        }
      });

    const yesterday = new Date();
    yesterday.setHours(
      yesterday.getHours() - 24
    );

    const bills =
      await CoustomerBills.find({
        shopkeeperId,
        createdAt: {
          $gte: yesterday
        }
      });

    let profit24Hours = 0;

    for (const bill of bills) {

      for (const item of bill.items) {

        const product =
          await Product.findById(
            item.productId
          );

        if (product) {

          profit24Hours +=
            (
              item.sellPrice -
              product.buyPrice
            ) *
            item.quantity;
        }
      }
    }

    res.json({
      totalProducts,
      totalCustomers,
      stockValue,
      profit24Hours,
      lowStockProducts,
      expiringProducts
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
}

                                              


                    
                                                                //Send Bill Email
async function handleSendBillEmail(req, res) {

  try {
    const {
      customerEmail,
      billNo,
      pdfData
    } = req.body;

    await transporter.sendMail({

      from: process.env.EMAIL,

      to: customerEmail,

      subject: `Invoice #${billNo}`,

      text: "Thank you for your purchase.",

      attachments: [
        {
          filename: `Invoice_${billNo}.pdf`,

          content:
            pdfData.split(",")[1],

          encoding: "base64"
        }
      ]

    });

    return res.status(200).json({
      message: "Invoice emailed successfully"
    });

  } catch (err) {

    return res.status(500).json({
      message: err.message
    });

  }
}


module.exports = {
  handleLogin,
  handleHome,
  handleLogout,
  handleRegister,
  handleAddProducts,
  handleProduct,
  handleCoustomer,
  handleBilling,
  handleAddCoustomer,
  handleGetProducts,
  handleSaveBill,
  handleDeleteProduct,
  handleUpdateProduct,
  handleGetCustomers,
  handleDeleteCustomer,
  handleGetPurchaseHistory,
  handleSearchPurchaseHistory,
  handleSearchBills,
  handleGetShopkeeper,
  handleUpdateProfile,
  handleDashboard,
  handleSendBillEmail,
}