import React, { useContext } from "react";
import "./MarkerInfo.scss";
import { contextFeeders } from "../../Context/ReactContext";

export default function MarkerInfo() {
  const { selectedFeeder } = useContext(contextFeeders);

  return (
    <div className="markerInfo_Container">
      <img
        src="https://nanolog.vteximg.com.br/arquivos/ids/164255-1000-1000/comedero-2.jpg?v=637311973167100000"
        alt="Imagen del comedero"
      ></img>
      {selectedFeeder?.location}
      {selectedFeeder?.FeederReport.description}
      {selectedFeeder?.FeederReport.status}
    </div>
  );
}
