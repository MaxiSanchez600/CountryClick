import React, { useContext, useEffect } from "react";
import Status from "../Status/Status";
import Message from "./Message/Message";
import { context } from "./Context/ReactContext";
import { AiFillYoutube, AiFillMessage } from "react-icons/ai";
import { FaSpotify } from "react-icons/fa";
import axios from "axios";
import "./playsections.scss";
import PlaySelector from "./PlaySelector/PlaySelector";

declare var window: any;

export default function PlaySection() {
  const { online, selected, SetSelected, SetAccount } = useContext(context);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: string[]) => {
          SetAccount(result[0]);
        });
    } else {
      alert("No tenes Metamask instalado mi rey");
    }
  };

  return selected ? (
    <PlaySelector />
  ) : (
    <div className="playsection_conteiner">
      <h1>Evolucionamos! Ahora podes enviar mensajes pagando con cripto</h1>
      <button onClick={() => connectWalletHandler()}>Conectar Metamask</button>
      <div className="playsection_plays">
        <div
          className="playsection_button"
          onClick={() => SetSelected("MESSAGE")}
        >
          <AiFillMessage className="playsection_icon" />
          <span>
            Enviale un <span>mensaje</span>
          </span>
        </div>
        <div
          className="playsection_button"
          onClick={() => SetSelected("YOUTUBE")}
        >
          <AiFillYoutube className="playsection_icon" />
          <span>
            Abrile un video de <span>YouTube</span>
          </span>
        </div>
        <div
          className="playsection_button"
          onClick={() => SetSelected("SPOTIFY")}
        >
          <FaSpotify className="playsection_icon_spotify" />
          <span>
            Agrega canciones a la playlist de <span>Spotify</span>
          </span>
        </div>
      </div>
      {!online && (
        <h2 className="playsection_error">
          Lamentablemente el servidor se encuentra{" "}
          <span className="playsection_error_span">offline</span>
        </h2>
      )}
    </div>
  );
}
