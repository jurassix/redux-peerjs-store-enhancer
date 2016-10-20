'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = peerPreloadedStateEnhancer;

var _peerDomain = require('../peer/peerDomain');

var _peerDomain2 = _interopRequireDefault(_peerDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function peerPreloadedStateEnhancer(preloadedState) {
  return (0, _extends3.default)({}, preloadedState, {
    peer: (0, _peerDomain2.default)({})
  });
}