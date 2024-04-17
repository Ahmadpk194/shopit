import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ProductDetails from './components/products/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';

import { loadUser } from './actions/userActions';
import store from './store'
import { useEffect, useState } from 'react';

import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/cart/Payment';

// payments
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrder from './components/order/ListOrder';
import OrderDetails from './components/order/OrderDetails';

//admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';

function App() {
  const navigate = useNavigate();

  const {user, loading, isAuthenticated} = useSelector(state => state.auth)
  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey()

  }, [])

  return (
    <div className="App">
      <Header navigate={navigate} />
      <div className="container container-fluid">
        <Routes>
          <Route path='/login' element={<Login navigate={navigate} />} exact />
          <Route path='/' element={<Home />} exact />
          <Route path='/search/:keyword' element={<Home />} exact />
          <Route path='/product/:id' element={<ProductDetails />} exact />
          <Route path='/register' element={<Register navigate={navigate} />} exact />
          <Route path='/me' element={<Profile navigate={navigate} />} exact />
          <Route path='/me/update' element={<UpdateProfile navigate={navigate} />} exact />
          <Route path='/password/update' element={<UpdatePassword navigate={navigate} />} exact />
          <Route path='/password/forgot' element={<ForgotPassword navigate={navigate} />} exact />
          <Route path='/password/reset/:token' element={<NewPassword navigate={navigate} />} exact />
          <Route path='/cart' element={<Cart navigate={navigate} />} exact />
          <Route path='/shipping' element={<Shipping navigate={navigate} />} exact />
          <Route path='/confirm' element={<ConfirmOrder navigate={navigate} />} exact />
          <Route path='/payment' element={stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Payment navigate={navigate} /></Elements>} exact />
          <Route path='/success' element={<OrderSuccess />} exact />
          <Route path='/orders/me' element={<ListOrder />} exact />
          <Route path='/order/:id' element={<OrderDetails />} exact />
        </Routes>
      </div>
      <Routes>
        <Route path='/dashboard' isAdmin={true} element={<Dashboard />} exact />
        <Route path='/admin/products' isAdmin={true} element={<ProductsList navigate={navigate} />} exact />
        <Route path='/admin/product' isAdmin={true} element={<NewProduct navigate={navigate} />} exact />
        <Route path='/admin/product/:id' isAdmin={true} element={<UpdateProduct navigate={navigate} />} exact />
        <Route path='/admin/orders' isAdmin={true} element={<OrderList navigate={navigate} />} exact />
        <Route path='/admin/order/:id' isAdmin={true} element={<ProcessOrder navigate={navigate} />} exact />
        <Route path='/admin/users' isAdmin={true} element={<UsersList navigate={navigate} />} exact />
        <Route path='/admin/user/:id' isAdmin={true} element={<UpdateUser navigate={navigate} />} exact />
        <Route path='/admin/reviews' isAdmin={true} element={<ProductReviews navigate={navigate} />} exact />

      </Routes>
        {!loading && (!isAuthenticated || user?.role !== 'admin') && (
          <Footer />
        )}
    </div>
  );


}

export default App;
