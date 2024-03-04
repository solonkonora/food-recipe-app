import React, { useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/home.css";

const Home = () => {

return (
    <>
<div className="main-content">
<div className="division-one">
  <div className="section-one">
    <h2 className="section-title">Unleash the full potential of Delicious Recipes</h2>
    <p className="section-text">"Explore a world of culinary delights with our food recipe app, where every dish is a delectable adventure waiting to be discovered."</p>

    <div className="button">
      <button className="button-state-app">Get the App &rarr;</button>
      <p className="more">More</p>
    </div>

    <div className="nums-texts">
      <div className="num-text">
        <h2 className="section-num">4.8</h2>
        <p className="section-texts">Rating on App store</p>
      </div>
      {/* <div className="num-text">
        <h2 className="section-num">700k</h2>
        <p className="section-texts">Active hours</p>
      </div> */}
    </div>
  </div>

  <div className="section-two">
  <div class="image-container">
  <img src="https://as2.ftcdn.net/v2/jpg/03/01/11/29/1000_F_301112963_CaHDvpGJfHRo3SqDikrWDTHfFfCfRS2U.jpg" alt="example" />
  <img src="https://media.istockphoto.com/id/1383962772/photo/nigerian-food.jpg?s=612x612&w=0&k=20&c=u-_1qwHBoY9Yh3alnsRbix6hxgl3_TXhT9lpEvlhH10=" alt="example" />
</div>
  </div>
</div>
</div>
</>
)   
}

export default Home;