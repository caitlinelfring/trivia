import { Button, Spinner } from "react-bootstrap";

const StartButton = ({ text = "Start", loadingText = "Waiting for players", isLoading = true, onClick = () => {} }) => {
  const spinner = <>
    <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      /> {loadingText}
    </>;

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? onClick : null}
    >
      {isLoading ? spinner : text}
    </Button>
  );
};

export default StartButton;
