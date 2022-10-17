import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const RecoverWallet = () => {
  const navigate = useNavigate();
  const [mnemonic, setMnemonic] = useState(null);
  const [password, setPassWard] = useState(null);

  const onClickRecover = async () => {
    await axios
      .post('http:localhost:8080/dash/login', {
        mnemonic: mnemonic,
        passwd: password,
      })
      .then(({ data }) => {
        if (data.code === '9999') {
          alert('암호 구문이 틀렸습니다.');
        } else {
          alert('새 비밀번호로 로그인 해주세요.');
          navigate('/');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App-content">
      <Logo />
      <textarea
        placeholder="암호 구문"
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <input type={'password'} placeholder="새비밀번호" />
      <input
        type={'password'}
        placeholder="새비밀번호"
        onChange={(e) => setPassWard(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onClickRecover}>
        설정
      </button>
      <button className="btn" onClick={() => navigate('/')}>
        취소
      </button>
    </div>
  );
};

export default RecoverWallet;
