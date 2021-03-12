export const roomIdNumChars = 4;

export const errorAlert = (error) => {
  if (!alert(`There has been an error; the page will now refresh.\n${error}`)) {
    window.location.reload();
  }
  console.error(error);
};

export const cleanUri = () => {
  const { protocol, host } = window.location;

  // Running on github
  if (host.includes("github")) {
    const path = host.endsWith('/') ? 'trivia' : '/trivia';
    return `${protocol}//${host}${path}`;
  }
  return `${protocol}//${host}`;
};

export const getWinners = (players) => {
  const sorted = players.sort((a, b) => b.score - a.score);
  const top = sorted[0].score;
  return sorted.filter(p => p.score === top);
};
