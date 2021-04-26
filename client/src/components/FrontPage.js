import React from'react';
import Posts from './Posts';
import SideBar from './Elements/SideBar';

function FrontPage() {

  return (
    <div className="FrontPage">
      <Posts/>
      <SideBar/>
    </div>
  );
}

export default FrontPage;