import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FeedersWithReport } from "../../Config/typescript/interfaces";
import { apiFetchGetFeederByIp } from "../../Helpers/requests";
import { updateContext } from "./updateContext";
import "./updateFeeder.scss";
import UpdateForm from "./updateForm/updateForm";
import Error from "../Error/error";
import Loading from "../../Config/images/loading.svg";

interface paramData {
  id: string;
}

export default function UpdateFeeder() {
  const { id } = useParams<paramData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { selectedFeeder, setSelectedFeeder } = useContext(updateContext);

  const getFeeder = async () => {
    try {
      const response = await apiFetchGetFeederByIp(id);
      if (response.data) {
        setSelectedFeeder(response.data.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getFeeder();
  }, []);
  return (
    <div className="updateFeeder_container">
      <div className="updateFeeder_subContainer">
        {loading ? (
          <img alt="Loading" src={Loading} />
        ) : selectedFeeder ? (
          selectedFeeder.isOn ? (
            <UpdateForm></UpdateForm>
          ) : (
            <h1>Form de Creacion</h1>
          )
        ) : error ? (
          <Error></Error>
        ) : (
          <h1 className="updateFeeder_noFeederH1">
            No existen bebederos con ese{" "}
            <span className="updateFeeder_noFeederSpan">codigo</span>
          </h1>
        )}
      </div>
    </div>
  );
}
