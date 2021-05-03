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

  let currentPage = 1
  const profilePicture = currentUser ? currentUser.photoURL : null;
  const query = currentUser ? `http://localhost:2000/posts/user/feed/${currentUser.uid}/3/${currentPage}` : `http://localhost:2000/posts`

  // Sort by Hot
  function hot(voteCount, timePosted) {
    let z = 1.281551565545;
    let right = z*Math.sqrt(voteCount/((Date.now() / 1000) - timePosted));
    let trustScore = right
    console.log(trustScore)
    return trustScore
  }
  function sortHot(a, b) {
    a.trust = 0;
    b.trust = 0;
    return (b.trust + hot(b.voteCount, b.created)) - (a.trust + hot(a.voteCount, a.created))
  }
  function hotHandler(arr) {
    return [...arr].sort(sortHot)
  }
  // Sort by New
  function sortNew(arr) {
    return [...arr].sort((a, b) => b.created - a.created)
  }
  // Sort by Top
  function sortTop(arr) {
    return [...arr].sort((a, b) => b.voteCount - a.voteCount)
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
        <div className="SortByTab" onClick={() => setPosts(hotHandler(posts))}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faFire}
          />
          Hot
        </div>
        <div className="SortByTab" onClick={() => setPosts(sortNew(posts))}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faCertificate}
          />
          New
        </div>
        <div className="SortByTab" onClick={() => setPosts(sortTop(posts))}>
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