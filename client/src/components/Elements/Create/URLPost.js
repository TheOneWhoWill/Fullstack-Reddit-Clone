import React, { useRef } from 'react'

function URLPost() {

  const titleRef = useRef();

  return (
    <div className='inputForm inputCreateLink'>
      <div className="formInput">
        <input ref={titleRef} type="text" placeholder="Title"/>
      </div>
      <div className="formTextarea">
        <textarea type="url" placeholder="Url"/>
      </div>
      <button className="formButton">Create Post</button>
    </div>
  );
}

export default URLPost;