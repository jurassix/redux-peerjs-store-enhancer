import Peer from 'peerjs';

const noop = arg => {console.log(arg); return arg;};

export function createPeer(options, onOpen, onConnection, onMessageRecieve, onError) {
  const peer = new Peer({
    debug: 3,
    host: 'localhost',
    port: 9000,
    path: '/',
    ...options,
  });
  error(peer, onError);
  open(peer, onOpen);
  connection(peer, (conn) => {
    onConnection(conn);
    data(conn, onMessageRecieve);
  });
  return peer;
}

export const send = (peer) => (data) => {
  Object.keys(peer.connections)
    .forEach((peerId) => {
      peer.connections[peerId].map(conn => {
        if (conn.open) {
          conn.send(data);
        } else {
          console.error('cannot send, conn not open', conn);
        }
      });
    });
}

function open(peer, onOpen = noop, onError = noop) {
  return new Promise((resolve, reject) => {
    try {
      if (peer.open) {
        return resolve(peer.id);
      }
      peer.on('open', (id) => {
        onOpen(id);
        resolve(id);
      });
    } catch (err) {
      onError(err);
      reject(err);
    }
  });
}
function connection(peer, onConnection = noop) {
  peer.on('connection', onConnection);
}

function data(peer, onData = noop) {
  peer.on('data', onData);
}

function error(peer, onError = noop) {
  peer.on('error', onError);
}

export async function connectToPeer(
  peer,
  remotePeerId,
  onOpen = noop,
  onMessageRecieve = noop,
  onError = noop,
) {
  try {
    if (peer.connections[remotePeerId] === undefined) {
      const peerConn = peer.connect(remotePeerId, {serialization: 'json'});
      error(peerConn, onError);
      await open(peerConn, onOpen);
      data(peerConn, onMessageRecieve);
    } else {
      console.error(`Already connected to remote peer id = ${remotePeerId}`);
    }
  } catch (err) {
    console.error('Client connection failed', err);
  }
}
