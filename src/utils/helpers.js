export const roomIdNumChars = 4;

export const cleanUri = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

export const getWinners = (players) => {
  const sorted = players.sort((a, b) => b.score - a.score);
  const top = sorted[0].score;
  return sorted.filter(p => p.score === top);
};

export const jsonParseSessionStorage = (key, def = {}) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (e) {
    return def;
  }
};
