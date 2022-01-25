import React from "react";
import "./Hero.scss";
import Earth from "../../Config/images/earthclick.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="HeroContainer_hero">
      <div className="heroCont_hero">
        <div className="LeftContainer_hero">
          <h1>¿Maxi no contesta su celular?</h1>
          <h2>Pingeale la compu</h2>
          <Link to="juga">
            <button className="btn_hero">
              <p>Vamos</p>
            </button>
          </Link>
        </div>

        <div className="RigthContainer_right">
          <img src={Earth} alt="" />
        </div>
      </div>
    </div>
  );
}
