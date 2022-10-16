import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Popup/index.css';
import Logo from './Logo';

const CreateWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="App-content">
      <Logo />
      <input type={'password'} placeholder="비밀번호" />
      <button className="btn btn-primary">지갑 가져오기</button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default CreateWallet;
