import { Alert } from "react-bootstrap";

const ErrorAlert = ({ error, variant = "danger" }) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        Refresh to retry or click "Leave" to return home.
      </p>
      <hr />
      <p className="mb-0">
        {`${error}`}
      </p>
    </Alert>
  );
};

export default ErrorAlert;
