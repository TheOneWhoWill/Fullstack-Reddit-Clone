import axios from 'axios';
import CummunityItem from './CummunityItem';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SideBar() {

  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/community')
      .then(res => {
        setSubs(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="SideBar">
      <div className="SideBarPost sideBarCreateOptions">
        <div className="SideBarBanner">Home</div>
        <p>Welcome to your frontpage. Look here to check in on your favorite communities.</p>
        <div className="createButtonsContainer">
          <Link className="CreateButton" to="/create/post">Create Post</Link>
          <Link className="CreateButton" to="/create/cummunity">Create Cummunity</Link>
        </div>
      </div>
      <div className="SideBarPost sideBarCummunities">
        <h4 className="trendingCummunitiesBanner">Trending Communities</h4>
        <div className="cummunites">
          {subs.map(sub => {
            return <CummunityItem image={sub.SubredditPicture} subHandle={sub.SubredditHandle} />
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;