import React from 'react'

function TextCreate() {
  return (
    <div className='inputForm inputCreateLink'>
      <div className="formInput">
        <input type="text" placeholder="Title"/>
      </div>
      <div className="formTextarea">
        <textarea type="text" placeholder="Text (optional)"/>
      </div>
      <button className="formButton">Create Post</button>
    </div>
  );
}

export default TextCreate;