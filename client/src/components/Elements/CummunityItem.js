import React from 'react'
import { Link, useHistory } from 'react-router-dom';

function CummunityItem(props) {

  const history = useHistory();
  const destination = `r/${props.subHandle}`;

  return (
    <div className="cummunityItem">
      <img src={props.image} alt="Logo"/>
      <div className="cummunityItemRight">
        <div className="cummunityItemRightDetails">
          <Link to={destination}>r/{props.subHandle}</Link>
          <p>999 members</p>
        </div>
        <button onClick={() => history.push(destination)}>Visit</button>
      </div>
    </div>
  )
}

export default CummunityItem;