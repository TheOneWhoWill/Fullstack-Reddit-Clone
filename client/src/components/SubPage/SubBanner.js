import { useAuth } from '../../contexts/AuthContext';
import { usePrompt } from '../../contexts/PromptContext';
import React, { useState, useEffect } from'react';
import axios from 'axios';

function SubBanner(props) {

  const user = props.user;
  const { currentUser } = useAuth();
  const { setPromptData } = usePrompt();
  const [joined, setJoined] = useState(props.joined);
  const [joinedSubs, setJoinedSubs] = useState([]);
  const baseUserRequest = `${process.env.REACT_APP_BASE}/user/`;
  const subHandle = props.handle ? props.handle : null;

  // I send a Axios Request to join a subreddit
  async function joinSub() {
    
    const postReq = {
      cummunity: subHandle
    }

    await axios.post(`${baseUserRequest}join/${user}`, postReq)
    .then(resonse => userIsJoined(resonse.data.joined))
    // Displays a prompt to the user
    setPromptData(`Successfully joined r/${subHandle}`)
  }

  // I send a Axios Request to leave a subreddit
  async function leaveSub() {

    const postReq = {
      cummunity: subHandle
    }

    await axios.post(`${baseUserRequest}leave/${user}`, postReq)
    .then(resonse => userIsJoined(resonse.data.joined))
    //userIsJoined(result.data[0].joined)
    // Displays a prompt to the user
    setPromptData(`Successfully left r/${subHandle}`)
  }

  async function fetchUserData() {
    // The ${baseUserRequest}${user} bit looks weird but it works
    // Trust me. The if statement is to
    // prevent Errors for people not logged in
    if(currentUser) {
      await axios.get(`${baseUserRequest}${user}`)
        .then(result => {
          userIsJoined(result.data[0].joined)
        })
    }
  }

  function userIsJoined(list) {
    if (list.find((joinedUser) => joinedUser === subHandle)) {
      setJoined(true);
    } else setJoined(false);
  }

  useEffect(() => {
    fetchUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined])

  return (
    <div className="SubBanner">
      <div className="SubBackGround">
        <img src="https://styles.redditmedia.com/t5_2x2n9/styles/bannerBackgroundImage_mp5e7yw2s7u11.png" alt=""/>
      </div>
      <div className="SubMainBar">
        <img src={props.picture} alt="pic"/>
        <div className="SubBarHandles">
          <div className="SubBarHandleTop">
            <h2>{props.name}</h2>
            {joined ?
              <button className="JoinedBTN" onClick={() => leaveSub()}><span>Joined</span></button>
              :
              <button className="JoinBTN" onClick={() => joinSub()}>Join</button>
            }
          </div>
          <p>r/{props.handle}</p>
        </div>
      </div>
    </div>
  );
}

export default SubBanner;