import React from "react";
import "./Hero.scss";
import Earth from "../../Config/images/earthclick.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Button } from "@nextui-org/react";
export default function Hero() {
  return (
    <div className="HeroContainer_hero">
      <div className="heroCont_hero">
        <div className="LeftContainer_hero">
          <h1>Comederos para animales en situacion de calle</h1>
          <h2>
            <span>¿Esta vacio? ¿Lo llenaste con comida?</span> Scanea el QR de
            cualquier comedero y actualiza su estado en tiempo real.
          </h2>
          <AnchorLink href="#things">
            <Button color="primary">Comederos</Button>
          </AnchorLink>
        </div>
        <div className="RigthContainer_right">
          <img src={Earth} alt="" />
        </div>
      </div>
    </div>
  );
}
