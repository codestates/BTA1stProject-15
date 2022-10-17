import React, { useState } from 'react';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/Popup/index.css';

const CreateWallet = () => {
  const navigate = useNavigate();
  const [passWard, setPassWard] = useState(null);

  const onClickCreate = async () => {
    await axios
      .post('http:localhost:8080/dash/createWallet', {
        passwd: passWard,
      })
      .then(({ data: { result } }) => {
        chrome.storage.sync.set({ account: result });
        navigate('/my-wallet');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App-content">
      <Logo />
      <input type={'password'} placeholder="비밀번호" />
      <input
        type={'password'}
        placeholder="비밀번호"
        onChange={(e) => setPassWard(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onClickCreate}>
        생성
      </button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default CreateWallet;
