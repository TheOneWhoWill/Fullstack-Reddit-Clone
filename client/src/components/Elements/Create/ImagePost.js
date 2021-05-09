import '../../../firebase'
import axios from 'axios'
import 'firebase/storage';
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import React, { useRef, useState } from'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePrompt } from '../../../contexts/PromptContext';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ImagePost(props) {

  const { setPromptData } = usePrompt();
  const history = useHistory()
  const { currentUser } = useAuth()
  const uploadRef = useRef()
  const subredditRef = useRef()
  const titleRef = useRef()
  
  var [uploaded, setUpload] = useState(false);
  var [imgURL, setImage] = useState();
  var [fileRef, setFileRef] = useState('Drag and drop images or');
  var filename = `${uuidv4()}.png`
  var storageRef = firebase.storage().ref().child(filename);

  function postSuccessful() {
    history.push('/')
    setPromptData('Posted Successfully')
  }

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

    const subReddit = subredditRef.current.value;
    await axios.get(`http://localhost:2000/community/exists/${subReddit}`)
    .then(res => {
      if(res.data) {
        var currentPost = {
          user: currentUser.displayName,
          subReddit: subredditRef.current.value,
          title: titleRef.current.value,
          imageURL: imgURL,
          voted: currentUser.uid,
          voteCount: 1,
        }
  
        axios.post('http://localhost:2000/posts/create', currentPost)
        postSuccessful()
      } else {
        setPromptData('Subreddit not Found')
      }
    })
  }

  return (
    <div class="inputForm inputCreate">
      <div className="formInput">
        <input ref={titleRef} type="text" placeholder="Title"/>
      </div>
      <div className="formInput">
        <input ref={subredditRef} type="text" placeholder="Subreddit"/>
      </div>
      <label className="formUpload">
        {uploaded ? <img src={imgURL} alt="" /> : <><p>{fileRef}</p><FontAwesomeIcon icon={faCloudUploadAlt}/></>}
        <input ref={uploadRef} onChange={uploadHandler} type="file" className="formUploadText" />
      </label>
      <button onClick={postHandler} className="formButton">Create Post</button>
    </div>
  )
}

export default ImagePost