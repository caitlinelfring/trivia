export const roomIdNumChars = 4;

export const errorAlert = (error) => {
  if (!alert(`There has been a networking error; if you find yourself unable to play, please refresh the page.\n${error}`)) {
    window.location.reload();
  }
  console.error(error);
};

export const cleanUri = () => {
  const { protocol, host } = window.location;
  const cleanHost = host.endsWith('/') ? host.slice(0, -1) : host;

  // Running on github
  if (host.includes("github")) {
    return `${protocol}//${cleanHost}/trivia`
  }
  return `${protocol}//${cleanHost}`
}

export const winner = (players) => {
  return players.sort((a, b) => b.score - a.score)[0];
}
