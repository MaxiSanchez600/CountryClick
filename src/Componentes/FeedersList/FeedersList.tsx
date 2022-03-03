import { useEffect, useContext, useState } from "react";
import { apiFetchGetFeeders } from "../../Helpers/requests";
import { contextFeeders } from "../Context/ReactContext";
import "./FeedersList.scss";
import Map from "./Map/Map";
import MarkerInfo from "./MarkerInfo/MarkerInfo";
import Error from "../Error/error";
import Loading from "../../Config/images/loading.svg";

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
    <div className="feederContainer_container" id="things">
      <div className="feederContainer_subContainer">
        {loading ? (
          <img alt="Loading" src={Loading} />
        ) : error ? (
          <Error></Error>
        ) : (
          <>
            <h1>Nuestros comederos</h1>
            <h2>
              Clickea cada uno en el mapa para ver su informacion y estado
              actual
            </h2>
            <Map></Map>
            <div className="feedersList_feederInfoContainer" id="feederInfo">
              <MarkerInfo></MarkerInfo>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
