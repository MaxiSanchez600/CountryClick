import "./Footer.scss";
import React from "react";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
export default function Footer() {
  return (
    <div className="ConteinerFooter_footer">
      <div className="SubContainer_footer">
        <div>
          <AiFillLinkedin className="SocialIcon_Footer" />
          <AiFillFacebook className="SocialIcon_Footer" />
          <AiFillInstagram className="SocialIcon_Footer" />
        </div>
        <h3>Copyright 2021 All rights reserved - Designed by Max</h3>
      </div>
    </div>
  );
}
