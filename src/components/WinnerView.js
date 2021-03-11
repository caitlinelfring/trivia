export default function WinnerView(props) {
  const { winner } = props;
  return <h1>{winner.name} won with {winner.score} correct answers</h1>
}
