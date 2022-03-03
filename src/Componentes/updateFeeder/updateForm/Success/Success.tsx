import { Link } from "react-router-dom";
import "./success.scss";

export default function Success() {
  return (
    <div className="success_container">
      <div>
        <h1>¡El comedero fue actualizado!</h1>
        <h2>Muchas gracias por aportar, de verdad.</h2>
        <p>
          Mientras mas personas actualizen y reporten los comederos, mas
          animales van a ser felices. Esto solo funciona si todos aportamos.
        </p>
        <Link to="/">Volver a Home</Link>
      </div>
    </div>
  );
}
