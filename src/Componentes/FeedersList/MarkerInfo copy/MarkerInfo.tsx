import React, { useContext } from "react";
import "./MarkerInfo.scss";
import { contextFeeders } from "../../Context/ReactContext";

export default function MarkerInfo() {
  const { selectedFeeder } = useContext(contextFeeders);

  return (
    <div className="markerInfo_Container">
      {selectedFeeder?.location}
      {selectedFeeder?.FeederReport.description}
      {selectedFeeder?.FeederReport.status}
    </div>
  );
}
