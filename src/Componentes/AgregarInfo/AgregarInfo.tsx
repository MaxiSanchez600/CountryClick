import React, { useState } from "react";
import "./agregarinfo.scss";
import { Button } from "@nextui-org/react";
import { Input, Textarea } from "@nextui-org/react";

export default function AgregarInfo() {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [mailError, setMailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [descError, setDescError] = useState<string>("");

  const onSend = () => {
    if (!checkErrors()) {
    }
  };

  const checkErrors = (): boolean => {
    // Check Name errors
    if (name.length < 5 || !name) {
      setNameError("El nombre y apellido debe ser mayor a 5 caracteres.");
      return true;
    } else {
      setNameError("");
    }

    // Check Phone errors
    if (!/^\d+$/.test(phone)) {
      setPhoneError("Debes ingresar un numero valido.");
      return true;
    } else {
      setPhoneError("");
    }

    // Check Mail errors
    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(mail)) {
      setMailError("Debes ingresar un email valido.");
      return true;
    } else {
      setMailError("");
    }

    // Check Desc errors
    if (desc.length < 20) {
      setDescError("El motivo debe ser mayor a 20 caracteres");
      return true;
    } else {
      setDescError("");
    }

    return false;
  };
  return (
    <div className="HeroContainer_ainfo">
      <div className="heroCont_ainfo">
        <div className="LeftContainer_ainfo">
          <h1>¡Tu propio comedero de por ellos que figure en la web!</h1>
          <h2>
            Si sabes donde pueden haber muchos perros en la calle, vivis en una
            zona con muchos o simplemente queres poner un comedero de por ellos
            cerca de tu casa, podemos enviarte uno a donde estes con las
            instrucciones para setearlo por primera vez y que ya quede
            registrado como uno de nuestros comederos.
          </h2>
        </div>
        <div className="RigthContainer_right_ainfo">
          {/* <div className="up_right_ainfo">
            <div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Nombre"
                placeholder="Pabl..."
              />
              {nameError && <p>{nameError}</p>}
            </div>
            <div>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                label="Celular"
                placeholder="11415793..."
              />
              {phoneError && <p>{phoneError}</p>}
            </div>
            <div>
              <Input
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                label="Email"
                placeholder="pablosanchez@gmail..."
              />
              {mailError && <p>{mailError}</p>}
            </div>
          </div>
          <div className="down_right_ainfo">
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              label="Contanos para que queres el comedero"
              placeholder="Lo quiero para poner en una plaza cerca de casa donde hay muchos..."
            />
            {descError && <p>{descError}</p>}
            <Button onClick={() => onSend()} color="primary">
              Enviar
            </Button>
          </div> */}
          <div className="wp_right_ainfo">
            <h3>
              <a
                href="https://wa.link/kyeuqh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactate con nosotros por nuestras redes sociales o por
                directamente por WhatsApp haciendo <span>clikeando aqui</span>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
