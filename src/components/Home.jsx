import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Popup/index.css';
import Logo from './Logo';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="App-content">
      <Logo>
        <p>WellCome To Dash&Cash</p>
      </Logo>
      <button
        className="btn btn-primary"
        onClick={() => navigate('/create-wallet')}
      >
        지갑 생성
      </button>
      <button className="btn" onClick={() => navigate('/login-wallet')}>
        지갑 가져오기
      </button>
    </div>
  );
};

export default Home;
