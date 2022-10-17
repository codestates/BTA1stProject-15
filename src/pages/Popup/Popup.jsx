import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateWallet from '../../components/CreateWallet';
import LoginWallet from '../../components/LoginWallet';
import Home from '../../components/Home';
import MyWallet from '../../components/MyWallet';
import SendToken from '../../components/SendToken';
import RecoverWallet from '../../components/RecoverWallet';

const Popup = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/login-wallet" element={<LoginWallet />} />
      <Route path="/my-wallet" element={<MyWallet />} />
      <Route path="/recover-wallet" element={<RecoverWallet />} />
      <Route path="/send-token" element={<SendToken />} />
    </Routes>
  );
};

export default Popup;
