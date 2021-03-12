export default function WinnerView(props) {
  const { winners } = props;
  const numWinners = winners.length;
  if (numWinners === 1) {
    const winner = winners[0];
    return <h1><strong>{winner.name}</strong> won with <code>{winner.score}</code> correct answers</h1>;
  } else {
    return (
      <>
        <h1>It's a {numWinners} way tie!</h1>
        <p>Our winners are {winners.join(", ")} with {winners[0].score} correct answers</p>
      </>
    );

  }
}
