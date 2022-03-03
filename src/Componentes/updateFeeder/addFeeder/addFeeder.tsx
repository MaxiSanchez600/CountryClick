import "./addFeeder.scss";

import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { ChevronLeft } from "react-iconly";
import { ChangeEvent, useContext, useState } from "react";
import { updateContext } from "../updateContext";
import { apiFetchAddFeeder, uploadPicture } from "../../../Helpers/requests";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useHistory } from "react-router-dom";
import Loading from "../../../Config/images/loading.svg";

import { URL_API_GOOGLE_MAPS } from "../../../Config/env/env";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const containerStyle = {
  maxWidth: "1200px",
  width: "100%",
  height: "500px",
};

export default function AddFeeder() {
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

  let history = useHistory();

  const [descriptionError, setDescriptionError] = useState<string>("");
  const [descriptionStatusError, setDescriptionStatusError] =
    useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [sendError, setSendError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [ubicDescripcion, setUbicDescripcion] = useState<string>();
  const [statusDescripcion, setStatusDescripcion] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();
  const [file, setFile] = useState<File>();

  const { setSelectedOption, selectedFeeder } = useContext(updateContext);

  const onUbicDescriptionChange = (desc: string) => {
    if (descriptionError) {
      desc.length > 20 && desc.length < 80 && setDescriptionError("");
    }
    setUbicDescripcion(desc);
  };

  const onStatusDescriptionChange = (desc: string) => {
    if (statusDescripcion) {
      desc.length > 20 && desc.length < 80 && setDescriptionStatusError("");
    }
    setStatusDescripcion(desc);
  };

  const onSend = async () => {
    if (selectedFeeder) {
      if (address && latLng) {
        if (
          ubicDescripcion &&
          ubicDescripcion.length > 20 &&
          ubicDescripcion.length < 80
        ) {
          if (
            statusDescripcion &&
            statusDescripcion.length > 20 &&
            statusDescripcion.length < 80
          ) {
            if (file && !fileError) {
              setLoading(true);
              setDescriptionError("");
              setDescriptionStatusError("");
              setAddressError("");
              setSendError("");

              try {
                selectedFeeder.description = ubicDescripcion;
                selectedFeeder.FeederReport.description = statusDescripcion;
                selectedFeeder.latitude = latLng.lat.toString();
                selectedFeeder.longitude = latLng.lng.toString();
                selectedFeeder.location = address;

                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "ydczqjtf");
                //data.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");

                const response = await uploadPicture(data);
                selectedFeeder.FeederReport.img = response.data.secure_url;
                await apiFetchAddFeeder(selectedFeeder);
                history.push("/success");
                setLoading(false);
              } catch (e) {
                console.log("ERROR: ", e);
                setSendError(
                  "Hubo un problema de conexion agregando el comedero, intenta de nuevo."
                );
                setLoading(false);
              }
            } else {
              !fileError &&
                setFileError("Debes seleccionar una imagen del comedero.");
            }
          } else {
            setDescriptionStatusError(
              "La descripcion debe ser mas larga a 20 caracteres y menor a 60."
            );
          }
        } else {
          setDescriptionError(
            "La descripcion debe ser mas larga a 20 caracteres y menor a 60."
          );
        }
      } else {
        setAddressError(
          "Tenes que buscar y seleccionar una ubicacion para el comedero."
        );
      }
    } else {
      alert("Unknown Error");
    }
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setAddress(address);
        setLatLng(latLng);
        if (addressError) {
          setAddressError("");
        }
      })
      .catch((error) =>
        alert("Error buscando esa direccion, intentelo nuevamente.")
      );
  };

  const setNewFile = (file: ChangeEvent<HTMLInputElement>) => {
    if (file.target.files && file.target.files?.length > 0) {
      if (file.target.files[0]["type"].split("/")[0] === "image") {
        setFile(file.target.files[0]);
        setFileError("");
      } else {
        setFileError("Solo podes seleccionar archivos que sean imagenes.");
      }
    } else {
      setFileError("Solo podes seleccionar una foto para el comedero.");
    }
  };

  return (
    <div className="addFeeder_container">
      {loading ? (
        <img alt="Loading" src={Loading} />
      ) : (
        <>
          <h1>¡Muchas gracias por poner un nuevo comedero!</h1>
          <p className="addFeeder_locationTitle">
            Busca y selecciona la <span>ubicacion del nuevo comedero</span>
          </p>
          <PlacesAutocomplete
            value={address}
            onChange={(address) => setAddress(address)}
            onSelect={(address) => handleSelect(address)}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Busca la direccion aqui...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#f7f7f7", cursor: "pointer" }
                      : { backgroundColor: "#f7f7f7", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span className={"addFeeder_suggestion"}>
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={latLng ? latLng : center}
              zoom={12}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {latLng && <Marker position={latLng} />}
            </GoogleMap>
          )}
          <p>{addressError}</p>
          <p className="addFeeder_locationTitle">
            Carga una foto donde se vea bien el{" "}
            <span>comedero y donde esta puesto</span>
          </p>
          <label className="custom-file-upload">
            <input type="file" multiple onChange={(e) => setNewFile(e)} />
            <i className="fa fa-cloud-upload" /> Seleccionar Archivo
          </label>
          {file && !fileError && (
            <p className="selectedpicture">Imagen seleccionada</p>
          )}

          <p>{fileError}</p>
          <Textarea
            label="Descripcion de la ubicacion del comedero"
            placeholder="ej: Esta en el arbol mas grande de la plaza de Martinez."
            value={ubicDescripcion}
            onChange={(e) => onUbicDescriptionChange(e.target.value)}
            css={{ marginTop: "2em" }}
          />
          <p>{descriptionError}</p>
          <Textarea
            label="Descripcion del estado del comedero"
            placeholder="ej: Esta lleno con comida, es probable que se acabe rapido, hay muchos perros en la zona."
            value={statusDescripcion}
            onChange={(e) => onStatusDescriptionChange(e.target.value)}
          />
          <p>{descriptionStatusError}</p>
          <Button onClick={() => onSend()} className="addFeeder_button">
            Agregar
          </Button>
          <p>{sendError}</p>
        </>
      )}
    </div>
  );
}
