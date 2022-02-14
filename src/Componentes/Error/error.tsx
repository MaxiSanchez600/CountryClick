import "./error.scss";
import { Danger } from "react-iconly";
import ErrorPic from "../../Config/images/error.png";
export default function Error() {
  return (
    <div className="error_container">
      <div>
        <img src={ErrorPic} alt="Error" />
        <h1>
          Ocurrio un <span>error de red</span>
        </h1>
        <h2>Estas cosas suelen pasar, porfavor proba de nuevo</h2>
      </div>
    </div>
  );
}
