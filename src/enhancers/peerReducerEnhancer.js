import {send} from '../peer/peerAPI';

export default function peerReducerEnhancer(rootReducer) {
  return (state, action) => ({
    ...rootReducer(state, action),
    peer: reducePeer(state.peer, action),
  });
}

export const reducePeer = (peer, action) => {
  switch (action.type) {
    case '@@PEER_INIT':
      return action.peer;
    case '@@PEER_OPEN':
    case '@@PEER_CONNECTION':
    case '@@PEER_CONNECTING':
      return {...peer};
    default:
      return peer;
  }
}
