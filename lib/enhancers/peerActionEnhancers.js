'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peerReplicateActionEnhancer = exports.peerMetadataEnhancer = exports.ignorePeerActions = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _peerAPI = require('../peer/peerAPI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignorePeerActions = exports.ignorePeerActions = function ignorePeerActions(_ref) {
  var _ref$type = _ref.type;
  var type = _ref$type === undefined ? '' : _ref$type;
  return type.indexOf('@@PEER') !== 0;
};

var peerMetadataEnhancer = exports.peerMetadataEnhancer = function peerMetadataEnhancer(dispatch, getState, action) {
  if (action.peerId) {
    return action;
  }

  var _getState = getState();

  var peer = _getState.peer;

  return (0, _extends3.default)({}, action, {
    '@@PEER_META': {
      id: _nodeUuid2.default.v4(),
      ts: Date.now(),
      peerId: peer.id
    }
  });
};

var peerReplicateActionEnhancer = exports.peerReplicateActionEnhancer = function peerReplicateActionEnhancer(dispatch, getState, action) {
  var _getState2 = getState();

  var peer = _getState2.peer;

  if (peer.id === action.peerId) {
    (0, _peerAPI.send)(peer)(action);
  }
  return action;
};