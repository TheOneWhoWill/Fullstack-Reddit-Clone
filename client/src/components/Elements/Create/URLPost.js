import axios from 'axios';
import React, { useRef } from 'react'
import { useAuth } from '../../../contexts/AuthContext';

function URLPost() {

  const titleRef = useRef();
  const linkRef = useRef()
  const subredditRef = useRef()
  const { currentUser } = useAuth()

  function postHandler() {
    let currentPost = {
      user: currentUser.displayName,
      subReddit: subredditRef.current.value,
      title: titleRef.current.value,
      link: linkRef.current.value,
      voted: currentUser.uid,
      voteCount: 1,
    }
    axios.post('http://localhost:2000/posts/create/link', currentPost)
  }

  return (
    <div className='inputForm inputCreateLink'>
      <div className="formInput">
        <input ref={titleRef} type="text" placeholder="Title"/>
      </div>
      <div className="formInput">
        <input ref={subredditRef} type="text" placeholder="Subreddit"/>
      </div>
      <div className="formTextarea">
        <textarea ref={linkRef} type="url" placeholder="Url"/>
      </div>
      <button onClick={postHandler} className="formButton">Create Post</button>
    </div>
  );
}

export default URLPost;