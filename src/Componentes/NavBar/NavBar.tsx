import { useContext, useEffect, useState } from "react";
import "./NavBar.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { context } from "../PlaySection/Context/ReactContext";
import Status from "../Status/Status";
import axios from "axios";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { online, SetOnline } = useContext(context);
  const getHealth = async () => {
    const response = await axios.get(
      "https://backdespertamaxi.herokuapp.com/health"
    );
    if (response.data) {
      SetOnline(true);
    }
  };
  useEffect(() => {
    getHealth();
  }, []);

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
            <Link
              className="listitem_navbarmobile"
              to="/"
              onClick={() => setOpen(!open)}
            >
              Home
            </Link>
            <Link
              className="listitem_navbarmobile"
              to="/juga"
              onClick={() => setOpen(!open)}
            >
              Pingea
            </Link>
            <Link
              className="listitem_navbarmobile"
              to="/status"
              onClick={() => setOpen(!open)}
            >
              Estado del servidor
            </Link>
          </div>
        </nav>
      }
      {
        <nav className="navbar_navbar">
          <Link className="navbarlogo_navbar" to="/">
            despertamaxi
          </Link>
          <FiMenu
            className="mobilemenu_navbar"
            onClick={() => setOpen(!open)}
          />
          <div className="navbarelements_navbar">
            <Link className="listitem_navbar" to="/">
              Home
            </Link>
            <Link className="listitem_navbar" to="/juga">
              Pingea
            </Link>
            <Status status={online} />
          </div>
        </nav>
      }
    </div>
  );
}
