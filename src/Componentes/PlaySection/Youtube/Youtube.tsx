// @ts-nocheck

import "./youtube.scss";
import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { TextField, Button, Stack, Snackbar, Switch } from "@mui/material";
import { MdOutlineArrowBack } from "react-icons/md";
import { context } from "../Context/ReactContext";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});

export default function Youtube() {
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
  const [link, isLink] = useState<boolean>(false);

  //Errores
  const [messageError, setMessageError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  //Alert
  const [type, setType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //Regex
  const ytRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  //Label
  const label = { inputProps: { "aria-label": "Switch demo" } };

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
    if (message && name && !ban) {
      if (link && !message.match(ytRegex)) {
        setOpen(false);
        setAlertInfo("error", "Eso no es un video de Youtube.");
      } else {
        setMessageError(false);
        setNameError(false);
        try {
          const response = await axios.post(
            "https://backdespertamaxi.herokuapp.com/youtube",
            {
              name: name,
              message: message,
              link: link,
            },
            { timeout: 10000 }
          );
          console.log(response);
          if (response.data) {
            setCounter(counter + 1);
            setMessage("");
          } else {
            setAlertInfo("error", "Algo fallo, chequea el estado del servidor");
          }
        } catch {
          setAlertInfo("error", "Algo fallo, chequea el estado del servidor");
        }
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
        setAlertInfo("success", "¡Le enviaste un video a Maxi!");
        setCounter(0);
      }
    } else if (counter > 0) {
      setAlertInfo("success", "¡Le enviaste un video a Maxi!");
    }
  }, [counter]);
  return (
    <div className="message_container">
      <MdOutlineArrowBack
        className="youtube_goback"
        onClick={() => SetSelected("")}
      />

      <h1 className="message_title">¡Abrile un video de Youtube!</h1>
      <div className="message_inputs">
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
          <Switch {...label} defaultChecked onChange={() => isLink(!link)} />
          <label>
            {link ? "Enviar link de Youtube" : "Buscar video por nombre"}
          </label>
          <TextField
            variant="standard"
            label={link ? "Link" : "Nombre"}
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
        <Button
          className="message_button"
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
