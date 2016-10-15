import peerDomain from '../peer/peerDomain';

export default function peerPreloadedStateEnhancer(preloadedState) {
  return {
    ...preloadedState,
    peer: peerDomain({}),
  };
}
