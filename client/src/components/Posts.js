import { faPoll, faLink, faFire, faCertificate, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const history = useHistory();
  let [page, setPage] = useState(1);
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);

  const profilePicture = currentUser ? currentUser.photoURL : null;

  function query(sort) {
    return currentUser ? `${process.env.REACT_APP_BASE}/posts/user/feed/${currentUser.uid}/${sort}` : `${process.env.REACT_APP_BASE}/posts`
  }

  async function changeSort(newSort) {
    axios.get(query(newSort))
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    setPage(page + 1)
    axios.get(query('hot'))
      .then(res => {
        setPosts(prev => [...prev, ...res.data])
      })
      .catch(err => {
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  );
})

export default Posts;