import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function CummunityItem(props) {
  var [joined, setJoined] = useState(props.joined);

  // Styling the button if a user already joined the sub
  function JoinedBtn(props) {
    return (
      <button
        className="JoinedBTN"
        onClick={() => leaveSub(props.subHandle, props.user)}
      >
        <span>Joined</span>
      </button>
    )
  }
  // Styling the button if a user already joined the sub
  function JoinBtn(props) {
    return (
      <button
        className="JoinBTN"
        onClick={() => joinSub(props.subHandle, props.user)}
      >
        Join
      </button>
    )
  }

  // I send a Axios Request to join a subreddit
  async function joinSub(subReddit, user, getUserData) {
    
    const postReq = {
      cummunity: subReddit
    }

    await axios.post(`http://localhost:2000/user/join/${user}`, postReq)
    .then(setJoined(true))
  }

  // I send a Axios Request to leave a subreddit
  async function leaveSub(subReddit, user) {

    const postReq = {
      cummunity: subReddit
    }

    await axios.post(`http://localhost:2000/user/leave/${user}`, postReq)
    .then(setJoined(false))
  }

  const { currentUser } = useAuth();
  const destination = `r/${props.subHandle}`;

  return (
    <div className="cummunityItem">
      <img src={props.image} alt="Logo"/>
      <div className="cummunityItemRight">
        <div className="cummunityItemRightDetails">
          <Link to={destination}>r/{props.subHandle}</Link>
          <p>999 members</p>
        </div>
        {joined ? <JoinedBtn user={currentUser.uid} subHandle={props.subHandle}/> : <JoinBtn user={currentUser.uid} subHandle={props.subHandle}/>}
      </div>
    </div>
  )
}

export default CummunityItem;