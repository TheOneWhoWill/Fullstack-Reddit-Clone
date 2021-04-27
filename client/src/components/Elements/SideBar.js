import axios from 'axios';
import CummunityItem from './CummunityItem';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function SideBar() {

  const { currentUser } = useAuth();

  const [subs, setSubs] = useState([]);
  const [joinedSubs, setJoined] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/community')
      .then(res => {
        setSubs(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios.get(`http://localhost:2000/user/${currentUser ? currentUser.uid : null}`)
    .then(res => {
      setJoined(res.data[0].joined);
      console.log(res.data[0].joined);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            return (
              <CummunityItem
                joined={joinedSubs.includes(sub.SubredditHandle) ? true : false}
                image={sub.SubredditPicture}
                subHandle={sub.SubredditHandle}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default SideBar;