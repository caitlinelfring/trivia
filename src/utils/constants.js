export const roomIdNumChars = 4;

export const errorAlert = (error) => {
  if (!alert(`There has been a networking error; if you find yourself unable to play, please refresh the page.\n${error}`)) {
    window.location.reload();
  }
  console.error(error);
};
