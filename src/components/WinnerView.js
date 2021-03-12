import {
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

const getWinners = (players) => {
  const sorted = players.sort((a, b) => b.score - a.score);
  const top = sorted[0].score;
  return sorted.filter(p => p.score === top);
};

export default function WinnerView(props) {
  const { players } = props;
  const winners = getWinners(players);
  const winnerOne = winners[0];
  const numWinners = winners.length;
  if (winnerOne.score === 0) {
    return <Alert variant="warning"><FontAwesomeIcon icon={faSadTear} /><br />No one got any questions right.</Alert>;
  }
  if (numWinners === 1) {
    return <h1><strong>{winnerOne.name}</strong> won with <code>{winnerOne.score}</code> correct answers</h1>;
  } else {
    return (
      <>
        <h1>It's a {numWinners} way tie!</h1>
        <p>Our winners are <strong>{winners.map(w => w.name).join(", ")}</strong> with <code>{winnerOne.score}</code> correct answers</p>
      </>
    );

  }
}
