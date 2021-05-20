import axios from 'axios';
import React, { useState } from'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useAward } from '../../../contexts/AwardContext';
import { usePrompt } from '../../../contexts/PromptContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faTimes } from '@fortawesome/free-solid-svg-icons';

function Award() {

  const { AwardData, setAwardData } = useAward();
  const { currentUser } = useAuth();
  const { setPromptData } = usePrompt();
  const [coinToBeSent, setCoinToBeSent] = useState(100);
  
  function changeCount(method) {
    switch(method) {
      case '+':
        setCoinToBeSent(coinToBeSent + 100)
        break;
      case '-':
        if(coinToBeSent >= 200) {
          setCoinToBeSent(coinToBeSent - 100)
        } else if(100 <= coinToBeSent) {
          setCoinToBeSent(coinToBeSent - (coinToBeSent - 100))
        }
        break;
      default:
        return;
    }
  }

  async function awardHandler() {
  
    let newData = {
      sender: AwardData.sender,
      recipient: AwardData.recipient,
      amount: coinToBeSent
    }
  
    axios.post(`${process.env.REACT_APP_BASE}/award`, newData)
      .then(res => {
        //res.data.msg
        setPromptData(res.data.msg)
      });
    setAwardData(null);
  }

  return (
    <div className="AwardContainer">
      <div className="Award">
        <span className="x" onClick={() => setAwardData(null)}>
          <FontAwesomeIcon icon={faTimes}/>
        </span>
        <h1>🎉 Award Spark Coins 🎉</h1>
        <p>{currentUser.displayName} to {AwardData.recipient}</p>
        <div className="bottomOptions">
          <div className="awardInput">
            <FontAwesomeIcon icon={faCoins} />
            <input type="number" min="50" value={coinToBeSent}/>
            <div className="inputIncriments">
              <button onClick={() => changeCount('+')}>+</button>
              <button onClick={() => changeCount('-')}>-</button>
            </div>
          </div>
          <button className="sendCoins" onClick={() => awardHandler()}>Send {coinToBeSent} Spark</button>
        </div>
      </div>
    </div>
  );
}

export default Award;