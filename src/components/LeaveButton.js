import { Button } from "react-bootstrap";
import ReactGA from "react-ga";

const LeaveButton = ({ text, trackingType = null }) => {
  return <Button
    variant="danger"
    className="m-2"
    onClick={() => {
      trackingType && ReactGA.event({
        category: trackingType,
        action: "leave",
      });

      sessionStorage.clear();
      window.location.reload(true);
    }}
  >{text || "Leave"}</Button>;
};

export default LeaveButton;
