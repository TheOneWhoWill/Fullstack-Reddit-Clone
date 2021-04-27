import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function CummunityItem(props) {

  const { currentUser } = useAuth();
  const user = currentUser ? currentUser.uid : null;
  const destination = `r/${props.subHandle}`;
  const [joined, setJoined] = useState(false);
  const [joinedSubs, setJoinedSubs] = useState([]);

  // I send a Axios Request to join a subreddit
  async function joinSub() {
    
    const postReq = {
      cummunity: props.subHandle
    }

    await axios.post(`http://localhost:2000/user/join/${user}`, postReq)
    .then(setJoined(true))
  }

  // I send a Axios Request to leave a subreddit
  async function leaveSub() {

    const postReq = {
      cummunity: props.subHandle
    }

    await axios.post(`http://localhost:2000/user/leave/${user}`, postReq)
    .then(setJoined(false))
  }

  useEffect(() => {
    async function fetchUserData() {
      axios.get(`http://localhost:2000/user/${user}`).then(result => {
        setJoinedSubs(result.data[0].joined)
        if (joinedSubs.find((joinedUser) => joinedUser === props.subHandle)) {
          setJoined(true);
        } else setJoined(false);
      })
    }
    fetchUserData()
  }, [joined, joinedSubs, user, props.subHandle])

  return (
    <div className="cummunityItem">
      <img src={props.image} alt="Logo"/>
      <div className="cummunityItemRight">
        <div className="cummunityItemRightDetails">
          <Link to={destination}>r/{props.subHandle}</Link>
          <p>999 members</p>
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