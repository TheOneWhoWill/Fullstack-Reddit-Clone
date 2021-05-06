import axios from 'axios';
import CummunityItem from './CummunityItem';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function SideBar() {

  const history = useHistory();
  const { currentUser } = useAuth();

  const [subs, setSubs] = useState([]);
  const [joinedSubs, setJoined] = useState([]);

  useEffect(() => {
    async function getUserData() {
      if(currentUser) {
        // This just feched user data
        axios.get(`http://localhost:2000/user/${currentUser ? currentUser.uid : null}`)
          .then(res => {
            setJoined(res.data[0].joined);
          })
      }
    }
    axios.get('http://localhost:2000/community/trending')
      .then(res => {
        setSubs(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    // The if statement is to prevent Errors
    // for people not logged in
    if(currentUser) {
      // This just feched user data
      getUserData()
    }
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
                joinedSubs={joinedSubs}
                image={sub.SubredditPicture}
                subHandle={sub.SubredditHandle}
                members={sub.members}
                key={sub._id}
              />
            )
          })}
          <button className="viewAll" onClick={() => history.push('/all')}>View All</button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;