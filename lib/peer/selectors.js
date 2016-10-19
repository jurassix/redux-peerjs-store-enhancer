'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectConnectedPeerIds = exports.selectPeerId = exports.selectPeer = undefined;

var _reselect = require('reselect');

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectPeer = exports.selectPeer = function selectPeer(state) {
  return state.peer || {};
};

var selectPeerId = exports.selectPeerId = (0, _reselect.createSelector)(selectPeer, function (peer) {
  return peer.id || 'not connected';
});

var selectConnectedPeerIds = exports.selectConnectedPeerIds = (0, _reselect.createSelector)(selectPeer, function (peer) {
  return (0, _uniq2.default)(Object.keys(peer.connections || {}));
});