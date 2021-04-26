import React, { useState } from'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePrompt } from '../../contexts/PromptContext';

function Header() {
  const [optionsMenu, setOptionsMenu] = useState(true)
  const { prompt } = usePrompt();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function logoutHandler() {logout();setOptionsMenu(!optionsMenu)}

  return (
    <>
      <div className="Header">
        <div className="headerLeft" onClick={() => history.push('')}>
          <img width="38" height="38" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fwww.vectorico.com%2Fwp-content%2Fuploads%2F2018%2F08%2FReddit-logo.png%3Fresize%3D300%252C300&f=1&nofb=1" alt=""/>
          <h5>Reddit 2.0</h5>
        </div>
        <div className="headerRight">
          {currentUser ? <img onClick={() => setOptionsMenu(!optionsMenu)} className="profileImage" src={currentUser.photoURL} alt="profile" /> : <Link to="/login" className="loginButton">Login</Link>}
          {optionsMenu ? <></> : 
            <div className="optionsHeader">
              <button className="headerButton" onClick={logoutHandler}>Logout</button>
              <button className="headerButton" onClick={() => history.push('/profile')}>Profile</button>
            </div>
          }
        </div>
      </div>
      {prompt ? <div className="prompt">{prompt}</div> : <></>}
    </>
  );
}

export default Header;