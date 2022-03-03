import React from "react";
import FeedersList from "../FeedersList/FeedersList";
import Hero from "../Hero/Hero";
import How from "../How/How";
import Video from "../Video/Video";
import "./main.scss";

export default function Main() {
  return (
    <div className="background_main">
      <Hero></Hero>
      <FeedersList></FeedersList>
      <How></How>
      <Video></Video>
    </div>
  );
}
