import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePrompt } from '../../contexts/PromptContext';

function CummunityItem(props) {

  const { currentUser } = useAuth();
  const { setPromptData } = usePrompt();
  const user = currentUser ? currentUser.uid : null;
  const destination = `r/${props.subHandle}`;
  const [joined, setJoined] = useState(null);
  const [joinedSubs, setJoinedSubs] = useState([props.joinedSubs]);
  const baseUserRequest = `${process.env.REACT_APP_BASE}/user/`;

  // I send a Axios Request to join a subreddit
  async function joinSub() {
    
    const postReq = {
      cummunity: props.subHandle
    }

    await axios.post(`${baseUserRequest}join/${user}`, postReq)
    .then(resonse => userIsJoined(resonse.data.joined))
    // Displays a prompt to the user
    setPromptData(`Successfully joined r/${props.subHandle}`)
  }

  // I send a Axios Request to leave a subreddit
  async function leaveSub() {

    const postReq = {
      cummunity: props.subHandle
    }

    await axios.post(`${baseUserRequest}leave/${user}`, postReq)
    .then(resonse => userIsJoined(resonse.data.joined))
    //userIsJoined(result.data[0].joined)
    // Displays a prompt to the user
    setPromptData(`Successfully left r/${props.subHandle}`)
  }

  function userIsJoined(list) {
    if (list.find((joinedUser) => joinedUser === props.subHandle)) {
      setJoined(true);
    } else setJoined(false);
  }

  async function fetchUserData() {
    // The ${baseUserRequest}${user} bit looks weird but it works
    // Trust me. The if statement is to
    // prevent Errors for people not logged in
    if(currentUser) {
      await axios.get(`${baseUserRequest}${user}`)
        .then(result => {
          setJoinedSubs(result.data[0].joined)
          userIsJoined(result.data[0].joined)
        })
    }
  }

  useEffect(() => {
    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined])

  return (
    <div className="cummunityItem">
      <img src={props.image} alt="Logo"/>
      <div className="cummunityItemRight">
        <div className="cummunityItemRightDetails">
          <Link to={destination}>r/{props.subHandle}</Link>
          <p>{props.members} members</p>
        </div>
        {joined ? 
          <button className="JoinedBTN" onClick={() => leaveSub()}><span>Joined</span></button>
          :
          <button className="JoinBTN" onClick={() => joinSub()}>Join</button>
        }
      </div>
    </div>
  )
}

export default CummunityItem;