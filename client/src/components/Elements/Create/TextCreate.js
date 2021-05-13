import axios from 'axios';
import React, { useRef } from 'react'
import { useAuth } from '../../../contexts/AuthContext';

function TextCreate() {

  const titleRef = useRef();
  const textRef = useRef()
  const subredditRef = useRef()
  const { currentUser } = useAuth()

  function postHandler() {
    let currentPost = {
      user: currentUser.displayName,
      subReddit: subredditRef.current.value,
      title: titleRef.current.value,
      text: textRef.current.value,
      voted: currentUser.uid,
      voteCount: 1,
    }
    axios.post('http://localhost:2000/posts/create/text', currentPost)
  }

  return (
    <div className='inputForm inputCreateLink'>
      <div className="formInput">
        <input type="text" ref={titleRef} placeholder="Title"/>
      </div>
      <div className="formInput">
        <input ref={subredditRef} type="text" placeholder="Subreddit"/>
      </div>
      <div className="formTextarea">
        <textarea type="text" ref={textRef} placeholder="Text (optional)"/>
      </div>
      <button className="formButton" onClick={postHandler}>Create Post</button>
    </div>
  );
}

export default TextCreate;