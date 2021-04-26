import React, { useState } from'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePrompt } from '../../contexts/PromptContext';

function Prompt(props) {

  const history = useHistory();
  const { setPromptData } = usePrompt();
  const [email, setEmail] = useState(props.email);
  const { updateEmail, currentUser } = useAuth();
  
  function inputHandler(value) {
    setEmail(value)
  }

  function submitHandler() {
    updateEmail(email);
    history.push('/');
    setPromptData(`This is Final, your new Email is ${currentUser.email}, the next time you log in you will be asked for it. Please Remember this.`);
  }

  return (
    <div className="Prompt">
      <h1>Are You Sure?</h1>
      <p>If you dont have access to this email you may not be able to do things such as reset your password</p>
      <div className="promptInput">
        <input type="email" value={email} onChange={(e) => inputHandler(e.target.value)}/>
        <button onClick={() => submitHandler()}>Confirm</button>
      </div>
    </div>
  );
}

export default Prompt;