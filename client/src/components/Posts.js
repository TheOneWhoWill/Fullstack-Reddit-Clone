import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from'react';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

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
      {posts.map(post => {
        return <Post post={post} key={post._id} />
      })}
    </div>
  );
})

export default Posts;