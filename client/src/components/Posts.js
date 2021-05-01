import { faPoll, faLink } from '@fortawesome/free-solid-svg-icons'
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
      {posts.map(post => {
        return <Post post={post} key={post._id} />
      })}
    </div>
  );
})

export default Posts;