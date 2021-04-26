import React from'react';

function SubBanner(props) {
  return (
    <div className="SubBanner">
      <div className="SubBackGround">
        <img src="https://styles.redditmedia.com/t5_2x2n9/styles/bannerBackgroundImage_mp5e7yw2s7u11.png" alt=""/>
      </div>
      <div className="SubMainBar">
        <img src={props.picture} alt="pic"/>
        <div className="SubBarHandles">
          <h2>{props.name}</h2>
          <p>r/{props.handle}</p>
        </div>
      </div>
    </div>
  );
}

export default SubBanner;