import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from'react';
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Cummunity(props) {
  return (
    <li onClick={props.redirect}>
      <div>
        <FontAwesomeIcon icon={faSortUp} />
        <img src={props.img} alt=""/>
        <h4>r/{props.subHandle}</h4>
      </div>
      <span>{props.members} members</span>
    </li>
  )
}

function All() {

  const history = useHistory();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/community/')
    .then(res => setSubs(res.data))
  })
  return (
    <div class="All">
      <div className="AllBanner">
        <div className="AllBannerChild">
          <h1>Our Top Growing Communities</h1>
          <p>Browse Reddit's top growing communities. Find the top communities in your favorite category.</p>
        </div>
      </div>
      <div className="growingCummunities">
        <div className="growingTop">
          <span>Today's Top Growing Communities</span>
          <span>Rank Change</span>
        </div>
        <ol className="growingList">
          {subs.map(sub => {
            return (
              <Cummunity
                key={sub._id}
                members={sub.members}
                img={sub.SubredditPicture}
                subHandle={sub.SubredditHandle}
                redirect={() => history.push(`r/${sub.SubredditHandle}`)}
              />
            )
          })}
        </ol>
      </div>
    </div>
  );
}

export default All;