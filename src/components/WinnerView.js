export default function WinnerView(props) {
  const { winner } = props;
  const winners = winner.length;
  if (winners === 1) {
    return <h1>{winner.name} won with {winner.score} correct answers</h1>;
  } else {
    return (
      <>
        <h1>It's a {winners} way tie!</h1>
        <p>Our winners are {winners.join(", ")} with {winner[0].score} correct answers</p>
      </>
    );

  }
}
