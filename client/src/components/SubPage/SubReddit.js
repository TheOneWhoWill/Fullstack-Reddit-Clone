import axios from 'axios';
import Post from './../Post';
import SubBanner from './SubBanner';
import SubSidebar from './SubSidebar';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from'react';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faCertificate, faSort } from '@fortawesome/free-solid-svg-icons'

function SubReddit() {
  const subID = useParams().sub;
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [subData, setSubData] = useState();
  const [joined] = useState(null);
  const user = currentUser ? currentUser.uid : null;

  function query(sort) {
    return currentUser ? `${process.env.REACT_APP_BASE}/posts/sub/${subID}/${sort}` : `${process.env.REACT_APP_BASE}/posts`
  }

  async function fetchSubData() {
    axios.get(`${process.env.REACT_APP_BASE}/community/${subID}`)
      .then(result => {
        setSubData(result.data[0])
      })
  }

  async function changeSort(newSort) {
    console.log(query(newSort))
    axios.get(query(newSort))
      .then(res => {
        setPosts(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchSubData()
    axios.get(query('hot'))
      .then(result => {
        setPosts(result.data)
      })
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
          <div className="Post SortBy">
            <div className="SortByTab" onClick={() => changeSort('hot')}>
              <FontAwesomeIcon
                className="CreatePostIcon"
                icon={faFire}
              />
              Hot
            </div>
            <div className="SortByTab" onClick={() => changeSort('new')}>
              <FontAwesomeIcon
                className="CreatePostIcon"
                icon={faCertificate}
              />
              New
            </div>
            <div className="SortByTab" onClick={() => changeSort('top')}>
              <FontAwesomeIcon
                className="CreatePostIcon"
                icon={faSort}
              />
              Top
            </div>
          </div>
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