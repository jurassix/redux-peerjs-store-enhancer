'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducePeer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = peerReducerEnhancer;

var _peerAPI = require('../peer/peerAPI');

function peerReducerEnhancer(rootReducer) {
  return function (state, action) {
    return _extends({}, rootReducer(state, action), {
      peer: reducePeer(state.peer, action)
    });
  };
}

var reducePeer = exports.reducePeer = function reducePeer(peer, action) {
  switch (action.type) {
    case '@@PEER_INIT':
      return action.peer;
    case '@@PEER_OPEN':
    case '@@PEER_CONNECTION':
    case '@@PEER_CONNECTING':
      return _extends({}, peer);
    default:
      return peer;
  }
};