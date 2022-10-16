import React from 'react';
import { useNavigate } from 'react-router-dom';

const SendToken = () => {
  const navigate = useNavigate();
  return (
    <div className="App-content">
      <input placeholder="받을 주소" />
      <input placeholder="금액" />
      <button className="btn btn-primary">지갑 가져오기</button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default SendToken;
