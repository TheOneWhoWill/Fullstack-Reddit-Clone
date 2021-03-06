import axios from 'axios';
import LazyLoad from 'react-lazyload';
import { useHistory } from 'react-router-dom';
import deletePost from './functions/deletePost';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from'react';
import { useAward } from '../contexts/AwardContext';
import { usePrompt } from '../contexts/PromptContext';
import { faEllipsisV, faShareAlt, faCommentAlt, faLink, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Post = React.memo((props) => {
  const [likeCount, setLikeCount] = useState(null);
  const [likes, setLikes] = useState(props.post.voted);
  const [optionsMenu, setOptionsMenu] = useState(true);
  const [postOption, setPostOption] = useState();
  const [postData, setPostData] = useState();
  const [liked, setLiked] = useState(false);
  const { setPromptData } = usePrompt();
  const { setAwardData } = useAward();
  const { currentUser } = useAuth();
  const history = useHistory();
  const user = currentUser ? currentUser.uid : null;
  const postID = props.post._id;

  async function upvotePost(msg) {
    const voter = user;
    var postReq = {
      voter
    }
    if(user !== null) {
      axios.post(`${process.env.REACT_APP_BASE}/posts/upvote/${postID}`, postReq).then(res => {
        if(res.data.code === 500) {
          alert(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
      console.log('All fine')
      setLikeCount(likeCount + 1)
      setLiked(true)
    } else {
      setPromptData('You Must be Logged In to Vote');
    }
  }

  async function downvotePost(msg) {
    const voter = user;
    var postReq = {
      voter
    }
    if(user !== null) {
      axios.post(`${process.env.REACT_APP_BASE}/posts/downvote/${postID}`, postReq).then(res => {
        if(res.data.code === 500) {
          alert(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err)
      })
      setLikeCount(likeCount - 1)
      setLiked(false)
      console.log('All fine')
    }
  }

  function sharePost() {
    var copiedURL = `${window.location.host}/post/${postID}`;
    navigator.clipboard.writeText(copiedURL);
    setPromptData('Copied URL into Clipboard');
  }

  function CurrentOption() {
    switch(postOption) {
      case 'image':
        return (
          postData.imageURL ?
            <LazyLoad height={200} offset={50}>
              <img src={postData.imageURL} alt="postImage" onClick={() => history.push(`/post/${postID}`)}/>
            </LazyLoad>
          : <></>
        )
      case 'link':
        return (
          postData.link ?
            <LazyLoad height={200} offset={50}>
              <div className="linkContainer">
                <a href={postData.link} rel="noreferrer" target="_blank">{postData.link}</a>
                <a className="linkPlaceholder" title={`${postData.link}`} href={postData.link} rel="noreferrer" target="_blank">
                  <FontAwesomeIcon icon={faLink} />
                  <div className="linkTinySqr">
                    <FontAwesomeIcon icon={faLink} />
                  </div>
                </a>
              </div>
            </LazyLoad>
          : <></>
        )
      case 'post':
        return (
          <></>
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE}/posts/one/${postID}`)
    .then(result => {
      setPostData(result.data)
      if(postData !== undefined && postData.imageURL) {
        setPostOption('image');
      } else if (postData !== undefined && postData.link) {
        setPostOption('link')
      } else if (postData !== undefined && postData.text) {
        setPostOption('post')
      }
      setLikes(result.data.voted)
      if (user && likes.find((like) => like === user)) {
        setLiked(true);
      } else setLiked(false);
      setLikeCount(result.data.voteCount)
    })
    //setPostOption('link')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postID, liked, likeCount, user]);

  return (
    <div className="Post">
      <div className="postBody">
        <div className="postTop">
          <div className="voteCount">
            {liked ? <button className="liked" onClick={() => downvotePost(postData)}>+</button> : <button className="notLiked" onClick={() => upvotePost(postData)}>+</button>}
            {likeCount ? <p>{likeCount}</p> : <p>0</p>}
          </div>
          <div className="topContainer" onClick={() => history.push(`/post/${postID}`)}>
            <div className="top">
              {postData ? <h4>Posted by {postData.user} on r/{postData.subReddit}</h4> : <></>}
            </div>
            <div className="bottom">
              {postData ? <h3>{postData.title}</h3> : <></>}
            </div>
          </div>
          <div className="optionsMenu">
            <button className="optionsButton" onClick={() => setOptionsMenu(!optionsMenu)} ><FontAwesomeIcon icon={faEllipsisV}/></button>
            {optionsMenu ? <></> : 
              <div className="optionsMenuContent">
                <button onClick={() => deletePost(currentUser.displayName, postID)}>Delete</button>
                <button onClick={sharePost}>Share</button>
                <button>Award</button>
              </div>
            }
          </div>
        </div>
        <div className="postImage">
          <CurrentOption />
        </div>
        <div className="bottomPostContainer">
          <button className="postBottomButtons" onClick={() => history.push(`/post/${postID}`)}>
            <FontAwesomeIcon className="postBottomIcon" icon={faCommentAlt} />
            Comments
          </button>
          <button className="postBottomButtons"  onClick={() => sharePost()}>
            <FontAwesomeIcon className="postBottomIcon" icon={faShareAlt} />
            Share
          </button>
          <button className="postBottomButtons" onClick={() => setAwardData({recipient: postData.user,sender: currentUser.uid,})}>
            <FontAwesomeIcon className="postBottomIcon gold" icon={faTrophy} />
            Award
          </button>
        </div>
      </div>
    </div>
  );
})

export default Post;