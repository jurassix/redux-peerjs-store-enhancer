'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = peerPreloadedStateEnhancer;

var _peerDomain = require('../peer/peerDomain');

var _peerDomain2 = _interopRequireDefault(_peerDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function peerPreloadedStateEnhancer(preloadedState) {
  return _extends({}, preloadedState, {
    peer: (0, _peerDomain2.default)({})
  });
}