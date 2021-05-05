import { faPoll, faLink, faFire, faCertificate, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from'react';
import { useHistory } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const history = useHistory();
  const { currentUser } = useAuth();
  const [sort, setSort] = useState('hot');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const profilePicture = currentUser ? currentUser.photoURL : null;
  let query = currentUser ? `http://localhost:2000/posts/user/feed/${currentUser.uid}/${page}/${sort}` : `http://localhost:2000/posts`

  async function InfinityScroll() {
    setPage(page + 1)
  }

  useEffect(() => {
    axios.get(query)
      .then(res => {
        setPosts(prev => [...prev, ...res.data])
      })
      .catch(err => {
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
        <div className="SortByTab" onClick={() => setSort('hot')}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faFire}
          />
          Hot
        </div>
        <div className="SortByTab" onClick={() => setSort('new')}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faCertificate}
          />
          New
        </div>
        <div className="SortByTab" onClick={() => setSort('top')}>
          <FontAwesomeIcon
            className="CreatePostIcon"
            icon={faSort}
          />
          Top
        </div>
      </div>
      <div>
        {posts.map((post, index) => {
          return <Post post={post} key={post._id} />
        })}
      </div>
      <button onClick={() => InfinityScroll()}>Load More...</button>
    </div>
  );
})

export default Posts;