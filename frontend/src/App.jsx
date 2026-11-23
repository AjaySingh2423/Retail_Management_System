import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'
import Customers from './components/coustomers'
import Products from './components/products'
import Billing from './components/billing'
import Logout from './components/logout'
import NavBar from './components/navBar'
import Registration from './components/registration'
import CoustomerBill from './components/searchBills'
import PurchaseHistory from './components/purchaseHistory'
import Profile from './components/profile'
import './App.css'

function App() {
 const router=createBrowserRouter([
       {
        path: '/',
        element:<> <Login /></>
       },
        {
        path: '/home',
        element:<> <Home /></>
       },
         {
        path: '/products',
        element:<> <Products /></>
       },
       {
        path: '/customers',
        element:<> <Customers /></>
       },
         {
        path: '/billing',
        element:<> <Billing /></>
       },
        {
        path: '/logout',
        element:<> <Logout /></>
       },
        {
        path: '/register',
        element:<> <Registration /></>
       },
        {
        path: '/coustomerBill',
        element:<> <CoustomerBill /></>
       },
       {
        path: '/purchaseHistory',
        element:<> <PurchaseHistory /></>
       },
        {
        path: '/profile',
        element:<> <Profile /></>
       },
 ])

  return (
    <>
     
    <RouterProvider router={router}/>
    
    
    </>
  )
}

export default App
