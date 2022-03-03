import "./notfound.scss";
import ErrorPic from "../../Config/images/error.png";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="notFound_container">
      <div className="notFound_SubContainer">
        <div>
          <img src={ErrorPic} alt="Error" />
          <h1>
            404 - <span>Not Found</span>
          </h1>
          <Link to="/">Ir a Home</Link>
        </div>
      </div>
    </div>
  );
}
