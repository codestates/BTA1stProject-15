import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecoverWallet = () => {
  const navigate = useNavigate();

  return (
    <div className="App-content">
      <textarea></textarea>
      <input type={'password'} placeholder="비밀번호" />
      <input type={'password'} placeholder="비밀번호" />
      <button className="btn btn-primary">생성</button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default RecoverWallet;
