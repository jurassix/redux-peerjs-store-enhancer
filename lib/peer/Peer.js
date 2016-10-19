'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Peer = function (_React$Component) {
  _inherits(Peer, _React$Component);

  function Peer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Peer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Peer.__proto__ || Object.getPrototypeOf(Peer)).call.apply(_ref, [this].concat(args))), _this), _this.handleConnect = function (e) {
      e.preventDefault();
      if (_this._input.value.trim() === '') return;
      _this.props.connectToPeer(_this._input.value);
      _this._input.value = '';
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Peer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.initPeer();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var peerId = _props.peerId;
      var connectedPeerIds = _props.connectedPeerIds;

      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleConnect },
        _react2.default.createElement(
          'h4',
          null,
          'PeerID is ',
          _react2.default.createElement(
            'span',
            null,
            peerId
          )
        ),
        _react2.default.createElement(
          'label',
          null,
          'Connections:',
          _react2.default.createElement(
            'ul',
            null,
            connectedPeerIds.map(function (id) {
              return _react2.default.createElement(
                'li',
                null,
                id
              );
            })
          )
        ),
        _react2.default.createElement(
          'label',
          null,
          'PeerID to connect to:',
          _react2.default.createElement('input', { type: 'text', ref: function ref(r) {
              return _this2._input = r;
            } })
        ),
        _react2.default.createElement(
          'button',
          { type: 'submit' },
          'Connect'
        )
      );
    }
  }]);

  return Peer;
}(_react2.default.Component);

Peer.propTypes = {
  peerId: _react.PropTypes.string,
  connectedPeerIds: _react.PropTypes.arrayOf(_react.PropTypes.string),
  initPeer: _react.PropTypes.func.isRequired,
  connectToPeer: _react.PropTypes.func.isRequired
};
Peer.defaultProps = {
  peerId: 'not initialized',
  connectedPeerIds: []
};
exports.default = Peer;