import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customers from './components/Customers';
import EditItem from './components/EditItem';
import ItemProfile from './components/ItemProfile';
import Layout from './components/Layout';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Login from './components/Login';
import Items from './components/Items'
import { StateProvider } from './StateContext';
import Dashboard from './components/Dashboard';
import EmailMsg from './components/EmailMsg';
import ForgetPassword from './components/ForgetPassword';
import Notification from './components/Notification';


const App = () => {
  return (
    <StateProvider>
        <Router>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          <Route path='/emailmsg' element={<EmailMsg/>}/>
          <Route path='/forgetpassword' element={<ForgetPassword/>}/>
          <Route path='/layout' element={<Layout/>}>
          <Route index path='/layout/' element={<Dashboard/>} />
          <Route path='/layout/items' element={<Items/>}/>
          <Route path='/layout/customers' element={<Customers/>}/>
          <Route path='/layout/itemprofile' element={<ItemProfile/>}/>
          <Route path='/layout/orders' element={<Orders/>}/>
          <Route path='/layout/notification' element={<Notification/>}/>
          <Route path='/layout/profile' element={<Profile/>}/>
          <Route path='/layout/edititem' element={<EditItem/>}/>
          </Route>
        </Routes>
      </Router>
    </StateProvider>

  );
}

export default App;
