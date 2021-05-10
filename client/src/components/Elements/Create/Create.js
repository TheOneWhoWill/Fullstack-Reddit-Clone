import URLPost from './URLPost';
import ImagePost from './ImagePost';
import TextCreate from './TextCreate';
import { Redirect } from 'react-router';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCommentAlt, faLink } from '@fortawesome/free-solid-svg-icons';

function Create() {

  const [createOption, setCreateOption] = useState('image')

  function CurrentOption() {
    switch(createOption) {
      case 'image':
        return <ImagePost />
      case 'link':
        return <URLPost />
      case 'post':
        return <TextCreate />
      default:
        return <Redirect to="/create/cummunity"/>
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
      <div class="inputForm">
        <CurrentOption />
      </div>
    </div>
  );
}

export default Create;