import { usePrompt } from '../../contexts/PromptContext';
import React, { useEffect, useState } from'react'
import { useAuth } from '../../contexts/AuthContext';
import Prompt from './Prompt';
import Post from '../Post';
import axios from 'axios';

const Profile = React.memo(() => {
  const { setPromptData } = usePrompt();
  const [posts, setPosts] = useState([]);
  const { currentUser, resetPassword } = useAuth();
  const [promptMenu, setPromptMenu] = useState(true);
  const [axiosLink] = useState(currentUser ? `${process.env.REACT_APP_BASE}/posts/user/${currentUser.displayName.substring(2)}` : null);

  useEffect(() => {
    axios.get(axiosLink)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [axiosLink]);

  function passwordHandler() {
    setPromptData('Check your Email to reset your Password')
    resetPassword(currentUser.email)
  }
  function emailHandler() {
    setPromptMenu(!promptMenu)
  }

  return (
    <div className="Profile">
      {promptMenu ? <></> : <Prompt email={currentUser.email}/>}
      <div className="profileTop">
        {currentUser ? <img src={currentUser.photoURL} alt=""/> : <h1>Not Logged In</h1>}
        <div className="profileRight">
          {currentUser ? <h2>{currentUser.displayName}</h2> : <h1>Anonymous User</h1>}
          <h4>{posts.length} Posts</h4>
        </div>
      </div>
      <div className="profilePreferences">
        <div className="preference">
          <div>
            <h3>Email address</h3>
            {currentUser ? <p>{currentUser.email}</p> : <p>user@example.com</p>}
          </div>
          <button onClick={() => emailHandler()}>Change</button>
        </div>
        <div className="preference">
          <div>
            <h3>Password</h3>
            <p>Password must be at least 6 characters long</p>
          </div>
          <button onClick={passwordHandler}>Change</button>
        </div>
      </div>
      {currentUser ? 
      <div className="FrontPage">
        <div>
          {posts.map(post => {
            return <Post post={post}/>
          })}
        </div>
      </div>
    : <></>}
    </div>
  );
})

export default Profile;