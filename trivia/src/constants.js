export const roomIdNumChars = 4;
export const peerConfig = {
  host: 'localhost',
  port: 9000,
  path: '/myapp',
  // host: 'peerjs.92k.de',
  // port: 443,
  // secure: true,
  // config: {
  //   'iceServers': [
  //     { url: 'stun:stun.l.google.com:19302' },
  //     { url: 'stun:stun1.l.google.com:19302' },
  //     { url: 'stun:stun2.l.google.com:19302' },
  //     { url: 'stun:stun3.l.google.com:19302' },
  //     { url: 'stun:stun4.l.google.com:19302' }
  //   ]
  // },
  debug: 3,
};

export const errorAlert = (error) => {
  alert("There has been a networking error; if you find yourself unable to play, please refresh the page.\n" + error);
  console.error(error);
};
