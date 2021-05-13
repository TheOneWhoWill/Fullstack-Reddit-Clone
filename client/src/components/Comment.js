import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from'react';
import deleteComment from './functions/deleteComment';
import { usePrompt } from '../contexts/PromptContext';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Comment(props) {
  const { currentUser } = useAuth();
  const user = currentUser ? currentUser.uid : null;
  const commentID = props.comment._id;
  const [liked, setLiked] = useState(false);
  const { setPromptData } = usePrompt();
  const [show, setShow] = useState(true);
  const [commentData, setCommentData] = useState();
  const [likeCount, setLikeCount] = useState(null);
  const [optionsMenu, setOptionsMenu] = useState(true);
  const [likes, setLikes] = useState(props.comment.voted);

  async function deleteCommentHandler() {
    deleteComment(currentUser.displayName, commentID);
    setShow(false);
  }

  async function upvotePost() {
    var postReq = {
      user
    }
    if(currentUser !== null) {
      axios.post(`${process.env.REACT_APP_BASE}/comments/upvote/${commentID}`, postReq).then(res => {
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
      setPromptData('You Must be Logged In to Vote')
    }
  }

  async function downvotePost() {
    var postReq = {
      user
    }
    if(currentUser !== null) {
      axios.post(`${process.env.REACT_APP_BASE}/comments/downvote/${commentID}`, postReq).then(res => {
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
    } else {
      setPromptData('You Must be Logged In to Vote')
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE}/comments/one/${commentID}`).then(result => {
      setCommentData(result.data)
      setLikes(result.data.voted)
      if (user && likes.find((like) => like === user)) {
        setLiked(true);
      } else setLiked(false);
      setLikeCount(result.data.voteCount)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentID, liked, likeCount, user]);

  return (
    <>
    {show ? 
    <div class="Comment">
      {commentData ? <img className="commentProfile" src={commentData.profilePicture} alt="s"/> : <img className="commentProfile" src="https://avatars.githubusercontent.com/u/49823186?v=4" alt="s"/>}
      <div className="commentRight">
        <div className="commentTop">
          <div className="commentTopLeft">
            <div className="voteCount">
              {liked ? <button className="liked" onClick={() => downvotePost(commentData)}>+</button> : <button className="notLiked" onClick={() => upvotePost(commentData)}>+</button>}
              {likeCount ? <p>{likeCount}</p> : <p>1</p>}
            </div>
            <div className="commentTopContainer">
              {commentData ? <h4>Commented by {commentData.user}</h4> : <></>}
            </div>
          </div>
          <div className="optionsMenu">
            <button className="optionsButton" onClick={() => setOptionsMenu(!optionsMenu)} ><FontAwesomeIcon icon={faEllipsisV}/></button>
            {optionsMenu ? <></> : 
              <div className="optionsMenuContent">
                <button onClick={() => deleteCommentHandler()}>Delete</button>
                <button>Copy Text</button>
                <button>Report</button>
              </div>
            }
          </div>
        </div>
        <div className="commentBottom">
          {commentData ? <p>{commentData.commentText}</p> : <></>}
        </div>
      </div>
    </div> : <></>}
    </>
  );
}

export default Comment;