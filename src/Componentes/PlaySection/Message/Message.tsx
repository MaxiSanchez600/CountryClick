// @ts-nocheck

import "./message.scss";
import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { TextField, Button, Stack, Snackbar } from "@mui/material";
import { MdOutlineArrowBack } from "react-icons/md";
import { context } from "../Context/ReactContext";

import MuiAlert from "@mui/material/Alert";
import Web3 from "web3";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="filled" {...props} />;
});

export default function Message() {
  const { SetSelected, account, contract } = useContext(context);

  console.log("ACCOUNT ES =>", account);
  console.log("CONTRACT ES=> ", contract);

  const [open, setOpen] = useState(false);

  //Baneo
  const date = new Date();
  const [counter, setCounter] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [ban, isBan] = useState(false);

  //Estado
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  //Errores
  const [messageError, setMessageError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

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
    console.log("CONTRACT: ", contract);
    const sendMessage = await contract?.sendMessage({
      from: account,
      value: Web3.utils.toWei("1"),
    });
    console.log("CONTRACT METHOD: ", sendMessage);
    if (!message) {
      setOpen(false);
      setMessageError(true);
    }
    if (!name) {
      setOpen(false);
      setNameError(true);
    }
    if (message && name && !ban) {
      setMessageError(false);
      setNameError(false);
      try {
        const response = await axios.post(
          "https://backdespertamaxi.herokuapp.com/open",
          {
            name: name,
            message: message,
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
        setAlertInfo("success", "¡Le enviaste un mensaje a Maxi!");
        setCounter(0);
      }
    } else if (counter > 0) {
      setAlertInfo("success", "¡Le enviaste un mensaje a Maxi!");
    }
  }, [counter]);
  return (
    <div className="message_container">
      <MdOutlineArrowBack
        className="youtube_goback"
        onClick={() => SetSelected("")}
      />
      <h1 className="message_title">¡Enviale tu mensaje!</h1>
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
          <TextField
            variant="standard"
            label="Mensaje"
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
