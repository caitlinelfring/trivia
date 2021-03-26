import {
  Table,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Scoreboard(props) {
  const { players, round } = props;
  players.sort((a, b) => b.score - a.score);

  const correct = (p) => {
    const _correct = p.answers[round - 1] && p.answers[round - 1].correct;
    return _correct ? "table-success" : "";
  };

  const style = p => {
    return {fontStyle: p.connected ? "" : "italic"};
  };

  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th><FontAwesomeIcon icon={faUserCircle} color="rgb(251, 148, 71)"/></th>
          <th><FontAwesomeIcon icon={faCheckSquare} color="rgb(9, 120, 166)"/></th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i)=> (
          <tr className={correct(p)} style={style(p)} key={i}>
            <td>{p.name}</td>
            <td>{p.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
