'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessage = exports.connectToPeer = exports.initPeer = undefined;

var _peerAPI = require('./peerAPI');

var _peerDomain = require('./peerDomain');

var _peerDomain2 = _interopRequireDefault(_peerDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initPeer = exports.initPeer = function initPeer(peerOptions) {
  return function (dispatch, getState) {
    return dispatch({
      type: '@@PEER_INIT',
      peer: (0, _peerDomain2.default)((0, _peerAPI.createPeer)(peerOptions, function (id) {
        return dispatch({ type: '@@PEER_OPEN', id: id });
      }, function (conn) {
        return dispatch({ type: '@@PEER_CONNECTION', conn: conn });
      }, function (action) {
        var _getState = getState();

        var peer = _getState.peer;

        var peerInfo = action['@@PEER_META'];
        if (peerInfo.peerId === peer.id) {
          return;
        }
        dispatch({ type: '@@PEER_DATA_RECEIVE', action: action });
        dispatch(action);
      }, function (err) {
        return dispatch({ type: '@@PEER_ERROR', err: err });
      }))
    });
  };
};

var connectToPeer = exports.connectToPeer = function connectToPeer(remotePeerId) {
  return function (dispatch, getState) {
    var _getState2 = getState();

    var peer = _getState2.peer;

    dispatch({ type: '@@PEER_CONNECTING', peer: peer, remotePeerId: remotePeerId });
    (0, _peerAPI.connectToPeer)(peer.__peer, remotePeerId, function (id) {
      return dispatch({ type: '@@PEER_OPEN', id: id });
    }, function (action) {
      var _getState3 = getState();

      var peer = _getState3.peer;

      var peerInfo = action['@@PEER_META'];
      if (peerInfo.peerId === peer.id) {
        return;
      }
      dispatch({ type: '@@PEER_DATA_RECEIVE', action: action });
      dispatch(action);
    }, function (err) {
      return dispatch({ type: '@@PEER_ERROR', err: err });
    });
  };
};

var sendMessage = exports.sendMessage = function sendMessage(message) {
  return function (dispatch, getState) {
    var _getState4 = getState();

    var peer = _getState4.peer;

    (0, _peerAPI.send)(peer.__peer)(message);
  };
};