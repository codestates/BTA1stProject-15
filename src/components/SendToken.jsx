import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendToken = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [amount, setAmount] = useState(null);

  const onClickTransfer = async () => {
    await axios
      .post('http:localhost:8080/dash/transfer', {
        dest: destination,
        dash: amount,
      })
      .then(({ data }) => {
        if (data.code === '9999') {
          alert('보내는 양식이 잘못되었습니다.');
        } else {
          alert('토큰 전송 완료');
          navigate('/my-wallet');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App-content">
      <input
        placeholder="받을 주소"
        onChange={(e) => setDestination(e.target.value)}
      />
      <input placeholder="금액" onChange={(e) => setAmount(e.target.value)} />
      <button className="btn btn-primary" onClick={onClickTransfer}>
        토큰 전송
      </button>
      <button className="btn" onClick={() => navigate('/my-wallet')}>
        취소
      </button>
    </div>
  );
};

export default SendToken;
