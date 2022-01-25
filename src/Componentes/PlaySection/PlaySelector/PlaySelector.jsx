import React, { useContext } from "react";
import "./playselector.scss";
import { context } from "../Context/ReactContext";
import Message from "../Message/Message";
import Youtube from "../Youtube/Youtube";
import Spotify from "../Spotify/spotify";
export default function PlaySelector() {
  const { selected } = useContext(context);
  return (
    <div className="playselector_container">
      {selected === "MESSAGE" && <Message />}
      {selected === "YOUTUBE" && <Youtube />}
      {selected === "SPOTIFY" && <Spotify />}
    </div>
  );
}
