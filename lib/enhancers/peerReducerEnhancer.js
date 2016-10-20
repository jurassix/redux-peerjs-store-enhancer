'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducePeer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = peerReducerEnhancer;

var _peerAPI = require('../peer/peerAPI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function peerReducerEnhancer(rootReducer) {
  return function (state, action) {
    return (0, _extends3.default)({}, rootReducer(state, action), {
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
      return (0, _extends3.default)({}, peer);
    default:
      return peer;
  }
};