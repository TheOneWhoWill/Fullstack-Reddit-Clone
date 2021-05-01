import axios from 'axios';
import Post from './../Post';
import SubBanner from './SubBanner';
import SubSidebar from './SubSidebar';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from'react';
import { useAuth } from '../../contexts/AuthContext';

function SubReddit() {
  const subID = useParams().sub;
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [subData, setSubData] = useState();
  const [joined, setJoined] = useState(null);
  const [joinedSubs, setJoinedSubs] = useState([]);
  const user = currentUser ? currentUser.uid : null;
  const baseUserRequest = 'http://localhost:2000/user/';
  const subHandle = subData ? subData.SubredditHandle : '';

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
    axios.get(`http://localhost:2000/community/${subID}`).then(result => {
      setSubData(result.data[0])
      console.log(result.data[0])
    })
    axios.get(`http://localhost:2000/posts/sub/${subID}`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    fetchUserData();
    userIsJoined();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinedSubs]);

  return (
    <div className="SubReddit">
      {subData ? 
      <SubBanner
        handle={subData.SubredditHandle}
        name={subData.SubredditName}
        picture={subData.SubredditPicture}
        joined={joined}
        user={user}
      /> : <></>}
      <div className="SubPosts">
        <div className="Posts">
          {posts.map(post => {
            return <Post post={post} key={post._id} />
          })}
        </div>
        {subData ? 
        <SubSidebar
          handle={subData.SubredditHandle}
          description={subData.description}
        /> : <></>}
      </div>
    </div>
  );
}

export default SubReddit;