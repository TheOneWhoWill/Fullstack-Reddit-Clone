import '../../firebase'
import axios from 'axios'
import 'firebase/storage';
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import React, { useRef, useState } from'react';
import { useAuth } from '../../contexts/AuthContext'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CreateSubreddit() {
  const history = useHistory()
  const { currentUser } = useAuth()
  const uploadRef = useRef()
  const subredditRef = useRef()
  const descriptionRef = useRef()
  const titleRef = useRef()
  
  var [uploaded, setUpload] = useState(false);
  var [imgURL, setImage] = useState();
  var [fileRef, setFileRef] = useState('Drag and drop logo or');
  var filename = `${uuidv4()}.png`
  var storageRef = firebase.storage().ref().child(filename);

  async function uploadHandler() {
    setFileRef(uploadRef.current.files[0].name)
    await storageRef.put(uploadRef.current.files[0])
    await storageRef.getDownloadURL().then((res) => {
      setImage(res)
      setUpload(true)
    })
  }

  async function postHandler(e) {
    e.preventDefault()

    var currentSub = {
      SubredditName: titleRef.current.value,
      SubredditHandle: subredditRef.current.value,
      description: descriptionRef.current.value,
      SubredditPicture: imgURL,
      mod: currentUser.uid
    }

    await axios.post(`${process.env.REACT_APP_BASE}/community/create`, currentSub)
    .then(history.push('/'))
  }
  return (
    <div class="Form Create">
      <div class="inputForm inputCreateSub">
        <h2>Create Community</h2>
        <div className="formInput">
          <input ref={titleRef} type="text" placeholder="Subreddit Name"/>
        </div>
        <div className="formInput">
          <input ref={subredditRef} type="text" placeholder="r/Subreddit"/>
        </div>
        <div className="formTextarea">
          <textarea ref={descriptionRef} type="text" placeholder="Write a brief Description of your Cummunity, feel free to add any rules you want people to follow"/>
        </div>
        <label className="formUpload">
          {uploaded ? <img src={imgURL} alt="" /> : <><p>{fileRef}</p><FontAwesomeIcon icon={faCloudUploadAlt}/></>}
          <input ref={uploadRef} onChange={uploadHandler} type="file" className="formUploadText" />
        </label>
        <button onClick={postHandler} className="formButton">Create</button>
      </div>
    </div>
  );
}

export default CreateSubreddit;