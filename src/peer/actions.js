import {createPeer, connectToPeer as connect, send} from './peerAPI';
import peerDomain from './peerDomain';

export const initPeer = (peerOptions) => (dispatch, getState) => dispatch({
  type: '@@PEER_INIT',
  peer: peerDomain(createPeer(
    peerOptions,
    (id) => dispatch({type: '@@PEER_OPEN', id}),
    (conn) => dispatch({type: '@@PEER_CONNECTION', conn}),
    (action) => {
      const {peer} = getState();
      const peerInfo = action['@@PEER_META'];
      if (peerInfo.peerId === peer.id) {
        return;
      }
      dispatch({type: '@@PEER_DATA_RECEIVE', action});
      dispatch(action);
    },
    (err) => dispatch({type: '@@PEER_ERROR', err}),
  )),
});

export const connectToPeer = (remotePeerId) => (dispatch, getState) => {
  const {peer} = getState();
  dispatch({type: '@@PEER_CONNECTING', peer, remotePeerId});
  connect(
    peer.__peer,
    remotePeerId,
    (id) => dispatch({type: '@@PEER_OPEN', id}),
    (action) => {
      const {peer} = getState();
      const peerInfo = action['@@PEER_META'];
      if (peerInfo.peerId === peer.id) {
        return;
      }
      dispatch({type: '@@PEER_DATA_RECEIVE', action});
      dispatch(action);
    },
    (err) => dispatch({type: '@@PEER_ERROR', err}),
  );
};

export const sendMessage = (message) => (dispatch, getState) => {
  const {peer} = getState();
  send(peer.__peer)(message);
};
