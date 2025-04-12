import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UserList from './components/UserList';
import { ConfigProvider } from 'antd';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { AddUser } from './components/AddUser';
import { Routes,BrowserRouter,Route } from 'react-router-dom';
import { PrivateRoutes } from './components/PrivateRoutes';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider
  theme={{
    token:{
      colorPrimary:"#EC9F20"
    }
  }}
  >
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userlist" element={
        <PrivateRoutes>
        <UserList/>
        </PrivateRoutes>
        }/>
      <Route path="/adduser" element={
        <PrivateRoutes>
        <AddUser/>
        </PrivateRoutes>
      }/>
    </Routes>

  </BrowserRouter>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
