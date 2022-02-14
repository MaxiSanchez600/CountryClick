import React, { useContext, useEffect, useState } from "react";
import "./Map.scss";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { URL_API_GOOGLE_MAPS } from "../../../Config/env/env";
import { contextFeeders } from "../../Context/ReactContext";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FeedersWithReport } from "../../../Config/typescript/interfaces";

const containerStyle = {
  maxWidth: "1200px",
  width: "100%",
  height: "500px",
};

export default function Map() {
  const { feedersList, setSelectedFeeder, selectedFeeder } =
    useContext(contextFeeders);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: URL_API_GOOGLE_MAPS,
  });

  const [center, setCenter] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: -34.603684,
    lng: -58.381559,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerClick = (feeder: FeedersWithReport) => {
    setCenter({
      lat: parseFloat(feeder.latitude),
      lng: parseFloat(feeder.longitude),
    });
    setSelectedFeeder(feeder);
  };

  useEffect(() => {
    selectedFeeder &&
      setCenter({
        lat: parseFloat(selectedFeeder.latitude),
        lng: parseFloat(selectedFeeder.longitude),
      });
  }, [selectedFeeder]);

  return (
    <div className="map_Container" id="things">
      <div className="map_mapContainer">
        {isLoaded && feedersList ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {feedersList.map((feeder) => {
              return (
                <AnchorLink href="#feederInfo">
                  <Marker
                    position={{
                      lat: parseFloat(feeder.latitude),
                      lng: parseFloat(feeder.longitude),
                    }}
                    onClick={() => onMarkerClick(feeder)}
                    opacity={0.5}
                  ></Marker>
                </AnchorLink>
              );
            })}
            <></>
          </GoogleMap>
        ) : (
          <>Setear un Loading Gif</>
        )}
      </div>
    </div>
  );
}
