import { useState } from "react";
import "./NavBar.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import EarthNavBar from "../../Config/images/earth (3).png";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const mobileclass: string = "mobilenavbar_navbar";

  return (
    <div>
      {
        <nav
          className={mobileclass}
          style={open ? { left: "0" } : { left: "-100%" }}
        >
          <IoMdClose
            className="closeicon_navbar"
            onClick={() => setOpen(!open)}
          />
          <div>
            <Link className="listitem_navbarmobile" to="/">
              Home
            </Link>
          </div>
        </nav>
      }
      {
        <nav className="navbar_navbar">
          <h3 className="navbarlogo_navbar">por ellos</h3>
          <FiMenu
            className="mobilemenu_navbar"
            onClick={() => setOpen(!open)}
          />
          <div className="navbarelements_navbar">
            <Link className="listitem_navbar" to="/">
              Home
            </Link>
          </div>
        </nav>
      }
    </div>
  );
}
