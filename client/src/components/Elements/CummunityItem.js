import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function joinSub(subReddit) {

  const postReq = {
    cummunity: subReddit
  }

  axios.post('http://localhost:2000/user/join/l3jPkNp2OVaHaxBPHKJ30MuIUxr1', postReq)
}

function JoinedBtn() {
  return (
    <button className="JoinedBTN"><span>Joined</span></button>
  )
}

function JoinBtn(props) {
  return (
    <button
      className="JoinBTN"
      onClick={() => joinSub(props.subHandle)}
    >
      Join
    </button>
  )
}

function CummunityItem(props) {

  const destination = `r/${props.subHandle}`;

  return (
    <div className="cummunityItem">
      <img src={props.image} alt="Logo"/>
      <div className="cummunityItemRight">
        <div className="cummunityItemRightDetails">
          <Link to={destination}>r/{props.subHandle}</Link>
          <p>999 members</p>
        </div>
        {props.joined ? <JoinedBtn /> : <JoinBtn subHandle={props.subHandle}/>}
      </div>
    </div>
  )
}

export default CummunityItem;