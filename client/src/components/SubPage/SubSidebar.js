import { Link } from 'react-router-dom';
import React from'react';

function SubSidebar(props) {

  return (
    <div className="SideBar">
      <div className="SideBarPost sideBarCreateOptions">
        <div className="SideBarBanner"><span>{`r/${props.handle}`}</span></div>
        <p>{props.description}</p>
        <div className="createButtonsContainer">
          <Link className="CreateButton" to="/create/post">Create Post</Link>
          <Link className="CreateButton" to="/create/cummunity">Create Cummunity</Link>
        </div>
      </div>
    </div>
  );
}

export default SubSidebar;