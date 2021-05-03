import React, { useState } from'react';
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Cummunity(props) {
  return (
    <li>
      <FontAwesomeIcon icon={faSortUp} />
      <img src={props.img} alt=""/>
      <h4>{props.subHandle}</h4>
    </li>
  )
}

function All() {
  return (
    <div class="All">
      <div className="AllBanner">
        <div className="AllBannerChild">
          <h1>Our Top Growing Communities</h1>
          <p>Browse Reddit's top growing communities. Find the top communities in your favorite category.</p>
        </div>
      </div>
      <div className="growingCummunities">
        <div className="growingTop">
          <span>Today's Top Growing Communities</span>
          <span>Rank Change</span>
        </div>
        <ol className="growingList">
          <Cummunity
            img="https://avatars.githubusercontent.com/u/49823186?v=4"
            subHandle="r/TR"
          />
        </ol>
      </div>
    </div>
  );
}

export default All;