import React from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import '../pages/Popup/index.css';

const CreateWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="App-content">
      <Logo />
      <input type={'password'} placeholder="비밀번호" />
      <input type={'password'} placeholder="비밀번호" />
      <button className="btn btn-primary">생성</button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default CreateWallet;
