import { faPoll, faLink, faFire, faCertificate, faSort } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const Posts = React.memo(() => {

  const history = useHistory();
  const { currentUser } = useAuth();
  const [sort, setSort] = useState('hot');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [ItemsLeft, setItemsLeft] = useState(true)

  const profilePicture = currentUser ? currentUser.photoURL : null;
  let query = currentUser ? `http://localhost:2000/posts/user/feed/${currentUser.uid}/${page}/${sort}` : `http://localhost:2000/posts`

  async function InfinityScroll() {
    setPage(page + 1)
    axios.get(query)
      .then(res => {
        if(res.data) {
          setPosts([...posts, res.data]);
        } else {
          setItemsLeft(false);
        }
      })
      .catch(err => {
        console.log(err)
      })
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
      <InfiniteScroll
        dataLength={posts.length}
        next={InfinityScroll}
        hasMore={ItemsLeft}
        loader={<h3>Loading...</h3>}
      >
        {posts.map(post => {
          return <Post post={post} key={post._id} />
        })}
      </InfiniteScroll>
    </div>
  );
})

export default Posts;