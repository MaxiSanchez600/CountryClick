import { useEffect, useContext, useState } from "react";
import { apiFetchGetFeeders } from "../../Helpers/requests";
import { contextFeeders } from "../Context/ReactContext";
import "./FeedersList.scss";
import Info from "./Info/Info";
import Map from "./Map/Map";
import MarkerInfo from "./MarkerInfo/MarkerInfo";
import Error from "../Error/error";
export default function FeedersList() {
  const { setFeedersList, setSelectedFeeder } = useContext(contextFeeders);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const getFeeders = async () => {
    try {
      const feeders = await apiFetchGetFeeders();
      if (feeders.data) {
        setSelectedFeeder(
          feeders.data.data[
            Math.floor(Math.random() * feeders.data.data.length - 1) + 1
          ]
        );
        setFeedersList(feeders.data.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getFeeders();
  }, []);
  return (
    <div className="feederContainer_hero" id="things">
      <h2>Nuestros comederos</h2>
      {loading ? (
        <h1>LOADING</h1>
      ) : error ? (
        <Error></Error>
      ) : (
        <>
          <Map></Map>
          <div className="feedersList_feederInfoContainer" id="feederInfo">
            <MarkerInfo></MarkerInfo>
            <Info></Info>
          </div>
        </>
      )}
    </div>
  );
}
