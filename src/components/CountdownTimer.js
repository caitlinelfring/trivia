import { Button } from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const CountdownTimer = ({ duration = 10, isPlaying = false, onComplete = () => {} }) => {
  return (
    <div className="timer-wrapper m-auto pb-5">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => {
          onComplete();
          return [false, 0];
        }}
      >
        {renderTime}
        {/* {({ remainingTime }) => {
          if (remainingTime === 0) {
            return         <Button>Next</Button>;
          }
          return renderTime({remainingTime});
        }} */}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownTimer;
