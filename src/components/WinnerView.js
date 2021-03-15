import {
  Alert,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";

const getWinners = (players) => {
  const sorted = players.sort((a, b) => b.score - a.score);
  const top = sorted[0].score;
  return sorted.filter(p => p.score === top);
};

const WinnerView = ({ players, isHost = false, questions = [] }) => {
  if (!players || players.length === 0) { return null; }
  const winners = getWinners(players);
  const winnerOne = winners[0];
  const numWinners = winners.length;

  const correctPlayersForQuestion = i => {
    return players.filter(p => {
      const answer = p.answers[i];
      if (!!answer) {
        return answer.correct;
      } else {
        return false;
      }
    }).map(p => p.name).join(", ");
  };

  let answers;
  if (isHost && questions.length > 0) {
    answers = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Correct Players</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{q.question}</td>
              <td>{q._correct}</td>
              <td>{correctPlayersForQuestion(i+1)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  if (winnerOne.score === 0) {
    return (
      <>
        <Alert variant="warning">
          <FontAwesomeIcon icon={faSadTear} />
          <br />
          No one got any questions right.
        </Alert>
        {answers}
      </>
    );
  }
  if (numWinners === 1) {
    return (
      <>
        <h1>
          <strong>{winnerOne.name}</strong> won with <code>{winnerOne.score}</code> correct answers
        </h1>
        { answers }
      </>
    );
  } else {
    return (
      <>
        <h1>It's a {numWinners} way tie!</h1>
        <p>Our winners are <strong>{winners.map(w => w.name).join(", ")}</strong> with <code>{winnerOne.score}</code> correct answers</p>
        {answers}
      </>
    );
  }
};

export default WinnerView;
