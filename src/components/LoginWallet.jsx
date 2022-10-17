import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Popup/index.css';
import axios from 'axios';
import Logo from './Logo';

const LoginWallet = () => {
  const navigate = useNavigate();
  const [passWard, setPassWard] = useState(null);

  const onClickLogin = async () => {
    await axios
      .post('http:localhost:8080/dash/login', {
        passwd: passWard,
      })
      .then(({ data: { result } }) => {
        navigate('/my-wallet');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App-content">
      <Logo />
      <input
        type={'password'}
        placeholder="비밀번호"
        onChange={(e) => setPassWard(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onClickLogin}>
        지갑 가져오기
      </button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
      <button
        className="btn"
        onClick={() => navigate('/recover-wallet')}
        style={{ border: 'none', backgroundColor: '#fff', marginTop: '30px' }}
      >
        니모닉으로 지갑 찾기
      </button>
    </div>
  );
};

export default LoginWallet;
