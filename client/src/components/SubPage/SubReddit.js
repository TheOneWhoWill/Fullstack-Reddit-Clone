import axios from 'axios';
import Post from './../Post';
import SubBanner from './SubBanner';
import SubSidebar from './SubSidebar';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from'react';

function SubReddit() {
  const subID = useParams().sub;
  const [posts, setPosts] = useState([]);
  const [subData, setSubData] = useState();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="SubReddit">
      {subData ? 
      <SubBanner
        handle={subData.SubredditHandle}
        name={subData.SubredditName}
        picture={subData.SubredditPicture}
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
        /> : <></>}
      </div>
    </div>
  );
}

export default SubReddit;