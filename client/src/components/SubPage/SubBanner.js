import React, { useState, useEffect } from'react';
import axios from 'axios';

function SubBanner(props) {

  const user = props.user;
  const joinedProp = props.joined;
  const [joined, setJoined] = useState(joinedProp);
  const [joinedSubs, setJoinedSubs] = useState([]);
  const baseUserRequest = 'http://localhost:2000/user/';
  const subHandle = props.handle ? props.handle : null;

  async function joinSub() {
    
    const postReq = {
      cummunity: subHandle
    }

    await axios.post(`${baseUserRequest}join/${user}`, postReq)
    .then(resonse => setJoined(resonse))
  }

  // I send a Axios Request to leave a subreddit
  async function leaveSub() {

    const postReq = {
      cummunity: subHandle
    }

    await axios.post(`${baseUserRequest}leave/${user}`, postReq)
    .then(resonse => setJoined(resonse))
  }

  async function fetchUserData() {
    // The ${baseUserRequest}${user} bit looks weird but it works
    // Trust me
    axios.get(`${baseUserRequest}${user}`).then(result => {
      setJoinedSubs(result.data[0].joined)
    })
  }

  function userIsJoined() {
    if (joinedSubs.find((joinedUser) => joinedUser === subHandle)) {
      setJoined(true);
    } else setJoined(false);
  }

  useEffect(() => {
    fetchUserData();
    userIsJoined();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinedSubs]);

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