import React, { useEffect, useState } from'react';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2000/posts')
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