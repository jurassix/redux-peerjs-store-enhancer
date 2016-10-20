import {applyMiddleware} from 'redux';
import actionEnhancerMiddleware from 'redux-action-enhancer-middleware';
import peerReducerEnhancer from './enhancers/peerReducerEnhancer';
import peerPreloadedStateEnhancer from './enhancers/peerPreloadedStateEnhancer';
import {ignorePeerActions, peerMetadataEnhancer, peerReplicateActionEnhancer} from './enhancers/peerActionEnhancers';

export default function peerStoreEnhancer() {
  return (createStore) => (reducer, preloadedState) => {
    const enhancedReducer = peerReducerEnhancer(reducer);
    const enhancedPreloadedState = peerPreloadedStateEnhancer(preloadedState);
    const peerEnhancer =
      applyMiddleware(
        actionEnhancerMiddleware({
          filter: ignorePeerActions,
          enhancer: peerMetadataEnhancer,
        }),
        actionEnhancerMiddleware({
          filter: ignorePeerActions,
          enhancer: peerReplicateActionEnhancer,
        })
      );

    return peerEnhancer(createStore)(enhancedReducer, enhancedPreloadedState);
  }
}
