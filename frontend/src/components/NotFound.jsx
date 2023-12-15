import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

const NotFound = ({ message }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="text-center">
        <img src="/img/404.svg" alt="404" width="300" />
        <Alert variant="danger" className="mt-3">
          {message || "Page Not Found"}
        </Alert>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
