'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _Peer = require('./Peer');

var _Peer2 = _interopRequireDefault(_Peer);

var _selectors = require('./selectors');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = { initPeer: _actions.initPeer, connectToPeer: _actions.connectToPeer };
var mapStateToProps = function mapStateToProps(state) {
  return {
    peerId: (0, _selectors.selectPeerId)(state),
    connectedPeerIds: (0, _selectors.selectConnectedPeerIds)(state)
  };
};

var PeerContainer = (0, _reactRedux.connect)(mapStateToProps, actions)(_Peer2.default);

exports.default = PeerContainer;