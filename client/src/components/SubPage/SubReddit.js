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
  const user = currentUser ? currentUser.uid : null;
  const baseUserRequest = 'http://localhost:2000/user/';

  async function fetchSubData() {
    axios.get(`http://localhost:2000/community/${subID}`)
      .then(result => {
        setSubData(result.data[0])
      })
    axios.get(`http://localhost:2000/posts/sub/${subID}`)
      .then(result => {
        setPosts(result.data)
      })
  }

  function userIsJoined(list) {
    if (list.find((joinedUser) => joinedUser === subID)) {
      setJoined(true);
    } else setJoined(false);
  }

  useEffect(() => {
    fetchSubData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joined])

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