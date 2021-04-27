import React from 'react'
import { Link } from 'react-router-dom';

function JoinedBtn() {
  return (
    <button className="JoinedBTN">Joined</button>
  )
}

function JoinBtn() {
  return (
    <button className="JoinBTN">Join</button>
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
        {props.joined ? <JoinedBtn /> : <JoinBtn />}
      </div>
    </div>
  )
}

export default CummunityItem;