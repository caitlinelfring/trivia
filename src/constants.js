export const roomIdNumChars = 4;

export const errorAlert = (error) => {
  if (!alert(`There has been a networking error; if you find yourself unable to play, please refresh the page.\n${error}`)) {
    window.location.reload();
  }
  console.error(error);
};

let _peerConfig = {
  host: 'localhost',
  port: 9000,
  path: '/myapp',
  debug: 3,
};
if (process.env.NODE_ENV === "production") {
  // TODO: host my own
  _peerConfig = {
    host: 'peerjs.92k.de',
    port: 443,
    secure: true,
    config: {
      'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'stun:stun2.l.google.com:19302' },
        { url: 'stun:stun3.l.google.com:19302' },
        { url: 'stun:stun4.l.google.com:19302' }
      ]
    },
    debug: 3,
  };
}
export const peerConfig = _peerConfig;
