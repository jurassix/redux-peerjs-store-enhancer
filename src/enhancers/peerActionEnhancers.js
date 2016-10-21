import uuid from 'node-uuid';
import {send} from '../peer/peerAPI';

export const ignorePeerActions = ({type = ''}) => type.indexOf('@@PEER') !== 0;

export const peerMetadataEnhancer = (dispatch, getState, action) => {
  const { peerId } = action['@@PEER_META'];
  if (peerId) {
    return action;
  }
  const {peer} = getState();
  return {
    ...action,
    '@@PEER_META': {
      id: uuid.v4(),
      ts: Date.now(),
      peerId: peer.id,
    },
  };
};

export const peerReplicateActionEnhancer = (dispatch, getState, action) => {
  const {peer} = getState();
  const {peerId} = action['@@PEER_META'];
  if (peer.id === peerId) {
    send(peer)(action)
  }
  return action;
};
