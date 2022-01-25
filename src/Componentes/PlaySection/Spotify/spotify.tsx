// @ts-nocheck

import "./spotify.scss";
import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { TextField, Button, Stack, Snackbar, Switch } from "@mui/material";
import { MdOutlineArrowBack } from "react-icons/md";
import { context } from "../Context/ReactContext";
import MuiAlert from "@mui/material/Alert";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});

export default function Spotify() {
  const { SetSelected } = useContext(context);
  const [open, setOpen] = useState(false);

  //Baneo
  const date = new Date();
  const [counter, setCounter] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [ban, isBan] = useState(false);

  //Estado
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [inputSong, setInputSong] = useState<string>("");
  const [id, setId] = useState<Option>({
    value: "",
    label: "",
  });
  const [songs, setSongs] = useState<Option[]>([]);

  //Errores
  const [messageError, setMessageError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [idError, setIdError] = useState<boolean>(false);

  //Alert
  const [type, setType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const setAlertInfo = (type: string, newAlertMessage: string) => {
    handleClose();
    setType(type);
    setAlertMessage(newAlertMessage);
    setOpen(true);
  };

  const sendInfo = async () => {
    if (!message) {
      setOpen(false);
      setMessageError(true);
    }
    if (!name) {
      setOpen(false);
      setNameError(true);
    }
    if (!id.value) {
      setOpen(false);
      setIdError(true);
    }
    if (message && name && id.value && !ban) {
      setMessageError(false);
      setNameError(false);
      setIdError(false);
      try {
        const addResponse = await axios(
          `https://api.spotify.com/v1/playlists/2zCI5klHywo0WgkkL3J4Zx/tracks?uris=spotify%3Atrack%3A${id.value}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:
                "Bearer BQASo91kIEVozAxRdEcBLOcnlH0ck8EzOxA_-YQWT5Q1g_dF-qJU10UF1sHmql-ZpAtYBiDMcwVQ-ICyhfPmEuvBymvhU-QY2blEsXQ5AP-ySVlzrLfpbbSjIg9OuRA2ybFYkJl7Wj7HUFtV9eV2xxlGa6PNbg6o1NTcsOdbz9kzawt3_2ZGTq-_-gVALLqdhLzq5Q",
            },
          }
        );
        const response = await axios.post(
          "https://backdespertamaxi.herokuapp.com/spotify",
          {
            name: name,
            message: message,
            label: id.label,
          },
          { timeout: 10000 }
        );
        if (response.data) {
          setCounter(counter + 1);
          setMessage("");
        } else {
          setAlertInfo("error", "Algo fallo, chequea el estado del servidor");
        }
      } catch {
        setAlertInfo("error", "Algo fallo, chequea el estado del servidor");
      }
    } else if (ban) {
      setAlertInfo("error", "Estas baneado por 10 segundos, espera.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setType("");
    setAlertMessage("");
    setOpen(false);
  };
  useEffect(() => {
    if (counter > 5) {
      const time = date.getSeconds() - initialTime;

      if (time < 5) {
        isBan(true);
        setAlertInfo(
          "warning",
          "No spamees, le lageas la pc a Maxi, baneado por 10s."
        );
        setTimeout(function () {
          isBan(false);
        }, 3000);
      } else {
        setAlertInfo(
          "success",
          "¡Agregaste y le dedicaste una cancion a Maxi!"
        );
        setCounter(0);
      }
    } else if (counter > 0) {
      setAlertInfo("success", "¡Agregaste y le dedicaste una cancion a Maxi!");
    }
  }, [counter]);

  useEffect(() => {
    const getTracks = async () => {
      const tracks = await axios.get(
        `https://api.spotify.com/v1/search?q=${inputSong}&type=track`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer BQASo91kIEVozAxRdEcBLOcnlH0ck8EzOxA_-YQWT5Q1g_dF-qJU10UF1sHmql-ZpAtYBiDMcwVQ-ICyhfPmEuvBymvhU-QY2blEsXQ5AP-ySVlzrLfpbbSjIg9OuRA2ybFYkJl7Wj7HUFtV9eV2xxlGa6PNbg6o1NTcsOdbz9kzawt3_2ZGTq-_-gVALLqdhLzq5Q",
          },
        }
      );
      let tracksOption: Option[] = [];
      tracks.data.tracks.items.map((track) => {
        tracksOption.push({ value: track.id, label: track.name });
      });
      setSongs(tracksOption);
    };
    inputSong !== "" ? getTracks() : setSongs([]);
  }, [inputSong]);
  return (
    <div className="message_container">
      <MdOutlineArrowBack
        className="youtube_goback"
        onClick={() => SetSelected("")}
      />

      <h1 className="spotify_title">¡Dedicale una cancion de Spotify!</h1>
      <div className="spotify_inputs">
        <div>
          <TextField
            variant="standard"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <span className="message_error">
              Tenes que completar este <span>campo</span>
            </span>
          )}
        </div>
        <div>
          <TextField
            variant="standard"
            label="Dedicacion"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message_input_alone"
          />
          {messageError && (
            <span className="message_error">
              Tenes que completar este <span>campo</span>
            </span>
          )}
        </div>
      </div>
      <div className="spotify_select">
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Cancion"
          options={songs}
          inputValue={inputSong}
          onInputChange={(input) => setInputSong(input)}
          filterOptions={(options, filter, current_values) => {
            return options;
          }}
          onChange={(option) => setId(option)}
        ></Select>
        {idError && (
          <span className="spotify_error">
            Tenes que completar este <span>campo</span>
          </span>
        )}
        <Button
          className="spotify_button"
          variant="contained"
          onClick={sendInfo}
        >
          Enviar
        </Button>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
