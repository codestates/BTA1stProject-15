import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateWallet from '../../components/CreateWallet';
import LoginWallet from '../../components/LoginWallet';
import Home from '../../components/Home';

const Popup = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/login-wallet" element={<LoginWallet />} />
    </Routes>
  );
};

export default Popup;
