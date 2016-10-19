'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = peerStoreEnhancer;

var _redux = require('redux');

var _reduxActionEnhancerMiddleware = require('redux-action-enhancer-middleware');

var _reduxActionEnhancerMiddleware2 = _interopRequireDefault(_reduxActionEnhancerMiddleware);

var _peerReducerEnhancer = require('./peerReducerEnhancer');

var _peerReducerEnhancer2 = _interopRequireDefault(_peerReducerEnhancer);

var _peerPreloadedStateEnhancer = require('./peerPreloadedStateEnhancer');

var _peerPreloadedStateEnhancer2 = _interopRequireDefault(_peerPreloadedStateEnhancer);

var _peerActionEnhancers = require('./peerActionEnhancers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function peerStoreEnhancer() {
  return function (createStore) {
    return function (reducer, preloadedState) {
      var enhancedReducer = (0, _peerReducerEnhancer2.default)(reducer);
      var enhancedPreloadedState = (0, _peerPreloadedStateEnhancer2.default)(preloadedState);
      var peerEnhancer = (0, _redux.applyMiddleware)((0, _reduxActionEnhancerMiddleware2.default)({
        filter: _peerActionEnhancers.ignorePeerActions,
        enhancer: _peerActionEnhancers.peerMetadataEnhancer
      }), (0, _reduxActionEnhancerMiddleware2.default)({
        filter: _peerActionEnhancers.ignorePeerActions,
        enhancer: _peerActionEnhancers.peerReplicateActionEnhancer
      }));

      // the following line breaks redux-devtools; hypothesis is the above applyMiddleware calls from inside a store enhancer
      // return createStore(enhancedReducer, enhancedPreloadedState, peerEnhancer);

      // this works for all cases
      return peerEnhancer(createStore)(enhancedReducer, enhancedPreloadedState);
    };
  };
}