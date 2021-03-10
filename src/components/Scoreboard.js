import {
  Table,
} from "react-bootstrap"
export default function Scoreboard(props) {
  const { players } = props;
  players.sort((a, b) => b.score - a.score);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Score</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p, i)=> (
          <tr key={i}>
            <td>{p.score}</td>
            <td>{p.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
