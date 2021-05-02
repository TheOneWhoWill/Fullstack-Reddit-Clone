import { faPoll, faLink, faFire, faCertificate, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const history = useHistory();
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const profilePicture = currentUser ? currentUser.photoURL : null;
  const query = currentUser ? `http://localhost:2000/posts/user/feed/${currentUser.uid}` : `http://localhost:2000/posts`

  // Sort by Hot
  function hot(voteCount, timePosted) {
    let baseScore = Math.log(Math.max(voteCount));
    let now = Math.floor(Date.now() / 1000);
    let timeDiff = (now - timePosted)
    let trustScore = Math.log(Math.max(baseScore)) * (-8 * timeDiff * timeDiff)

    return trustScore
  }
  function sortHot() {
    return [...posts].sort((a, b) => hot(b.voteCount, b.created) - hot(a.voteCount, a.created))
  }
  // Sort by New
  function sortNew() {
    return [...posts].sort((a, b) => b.created - a.created)
  }
  // Sort by Top
  function sortTop() {
    return [...posts].sort((a, b) => b.voteCount - a.voteCount)
  }

  useEffect(() => {
    axios.get(query)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="Posts">
      <div className="Post CreatePost">
        <img
          onClick={() => history.push('/profile')}
          src={profilePicture}
          alt="profile"
        />
        <input
          onClick={() => history.push('/create/post')}
          type="text"
          placeholder="Create Post"
        />
        <FontAwesomeIcon
          onClick={() => history.push('/create/post')}
          className="CreatePostIcon"
          icon={faPoll}
        />
        <FontAwesomeIcon
          onClick={() => history.push('/create/post')}
          className="CreatePostIcon"
          icon={faLink}
        />
      </div>
      <div className="Post SortBy">
        <div className="SortByTab" onClick={() => setPosts(sortHot)}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faFire}
          />
          Hot
        </div>
        <div className="SortByTab" onClick={() => setPosts(sortNew)}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faCertificate}
          />
          New
        </div>
        <div className="SortByTab" onClick={() => setPosts(sortTop)}>
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
  );
})

export default Posts;