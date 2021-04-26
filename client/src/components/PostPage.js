import axios from 'axios';
import Comment from './Comment';
import deletePost from './functions/deletePost';
import { useAuth } from '../contexts/AuthContext';
import { usePrompt } from '../contexts/PromptContext';
import { useHistory, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from'react';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostPage = React.memo((props) => {
  const [optionsMenu, setOptionsMenu] = useState(true);
  const [liked, setLiked] = useState(false);
  const { currentUser } = useAuth();
  const [likeCount, setLikeCount] = useState(null);
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(['eee'])
  const { setPromptData } = usePrompt();
  const history = useHistory();
  const user = currentUser ? currentUser.uid : null;
  const postID = useParams().id;
  const commentRef = useRef();

  async function upvotePost() {
    const voter = currentUser.uid;
    var postReq = {
      voter
    }
    axios.post(`http://localhost:2000/posts/upvote/${postID}`, postReq).then(res => {
      if(res.data.code === 500) {
        alert(res.data.msg)
      }
    })
    .catch(err => {
      console.log(err)
    })
    console.log('All fine')
    setLiked(true)
  }

  async function downvotePost() {
    var postReq = {
      voter: currentUser.uid
    }
    axios.post(`http://localhost:2000/posts/downvote/${postID}`, postReq).then(res => {
      if(res.data.code === 500) {
        alert(res.data.msg)
      }
    })
    .catch(err => {
      console.log(err)
    })
    setLiked(false)
    console.log('All fine')
  }

  function sharePost() {
    var copiedURL = `${window.location.host}/post/${postID}`;
    navigator.clipboard.writeText(copiedURL);
    setPromptData('Copied URL into Clipboard');
  }

  async function commentHandler(e) {
    e.preventDefault()

    var currentComment = {
      user: currentUser.displayName,
      voteCount: 1,
      voted: currentUser.uid,
      parentPost: postID,
      profilePicture: currentUser.photoURL,
      commentText: commentRef.current.value,
    }
    commentRef.current.value = '';
    await axios.post('http://localhost:2000/comments/create', currentComment)
    .then(setPromptData('Posted Comment'))
  }

  useEffect(() => {
    axios.get(`http://localhost:2000/comments/from/${postID}`)
      .then((results) => {
        setComments(results.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(`http://localhost:2000/posts/one/${postID}`).then(result => {
      setPostData(result.data)
      setLikes(result.data.voted)
      if (user && likes.find((like) => like === user)) {
        setLiked(true);
      } else setLiked(false);
      setLikeCount(result.data.voteCount)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postID, liked, likeCount, user]);

  return (
    <div className="PostPage">
      <div className="PostPagePost">
        <div className="postBody">
          <div className="postTop">
            <div className="voteCount">
              {liked ? <button className="liked" onClick={() => downvotePost(postData)}>+</button> : <button className="notLiked" onClick={() => upvotePost(postData)}>+</button>}
              {likeCount ? <p>{likeCount}</p> : <p>0</p>}
            </div>
            <div className="topContainer"  onClick={() => history.push(`/post/${postID}`)}>
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
                  <button>Report</button>
                </div>
              }
            </div>
          </div>
          <div className="postImage">
            {postData ? <img src={postData.imageURL} alt="postImage"/> : <></>}
          </div>
        </div>
      </div>
      <div className="postComments">
        <div className="commentForm">
          <textarea ref={commentRef} cols="30" rows="10" placeholder="What are your thoughts?"></textarea>
          <div className="commentFormBottom">
            <button onClick={(e) => commentHandler(e)}>Comment</button>
          </div>
        </div>
        {comments.map(comment => {
          return <Comment comment={comment}/>
        })}
      </div>
    </div>
  );
})

export default PostPage;