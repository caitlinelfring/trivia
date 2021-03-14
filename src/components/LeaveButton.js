import { Button } from "react-bootstrap";

const LeaveButton = ({ text }) => {
  return <Button
    variant="danger"
    className="m-2"
    onClick={() => {
      sessionStorage.clear();
      window.location.reload(true);
    }}
  >{text || "Leave"}</Button>;
};

export default LeaveButton;
