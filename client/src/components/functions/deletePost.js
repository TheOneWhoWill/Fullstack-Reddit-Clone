import axios from 'axios';

async function deletePost(voter, id) {

  var postReq = {
    voter: voter
  }

  axios.delete(`http://localhost:2000/posts/delete/${id}`, { data: postReq })
  .then(res => {
    if(res.data.code === 500) {
      alert(res.data.msg)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

export default deletePost;