import ImagePost from './ImagePost';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCommentAlt, faLink } from '@fortawesome/free-solid-svg-icons';

function Create() {

  const [createOption, setCreateOption] = useState('image')

  function CurrentOption() {
    switch(createOption) {
      case 'image':
        return <ImagePost />
      default:
        return <button>YUR</button>
    }
  }

  return (
    <div class="Form Create">
      <div className="CreateNavBar">
        <button className={`NavBarBtn ${createOption === 'post' ? 'active' : 'inactive'}`} onClick={() => setCreateOption('post')}>
          <FontAwesomeIcon icon={faCommentAlt} className="NavBarBtnIcon" />
          Post
        </button>
        <button className={`NavBarBtn ${createOption === 'image' ? 'active' : 'inactive'}`} onClick={() => setCreateOption('image')}>
          <FontAwesomeIcon icon={faImage} className="NavBarBtnIcon" />
          Image
        </button>
        <button className={`NavBarBtn ${createOption === 'link' ? 'active' : 'inactive'}`} onClick={() => setCreateOption('link')}>
          <FontAwesomeIcon icon={faLink} className="NavBarBtnIcon" />
          Link
        </button>
      </div>
      <div class="inputForm inputCreate">
        <CurrentOption />
      </div>
    </div>
  );
}

export default Create;