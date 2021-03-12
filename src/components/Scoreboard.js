import {
  Table,
} from "react-bootstrap";
export default function Scoreboard(props) {
  const { players, round } = props;
  players.sort((a, b) => b.score - a.score);

  const correct = (p) => {
    const _correct = p.answers[round - 1] && p.answers[round - 1].correct;
    return _correct ? "table-success" : "";
  };

  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>Score</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i)=> (
          <tr className={correct(p)} key={i}>
            <td>{p.score}</td>
            <td>{p.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
