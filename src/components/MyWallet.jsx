import React from 'react';
import { useNavigate } from 'react-router';
import Logo from './Logo';

const MyWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="App-content">
      <Logo></Logo>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/send-token')}
      >
        토큰 전송
      </button>
    </div>
  );
};

export default MyWallet;
