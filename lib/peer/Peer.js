'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Peer = function (_React$Component) {
  (0, _inherits3.default)(Peer, _React$Component);

  function Peer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Peer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Peer.__proto__ || Object.getPrototypeOf(Peer)).call.apply(_ref, [this].concat(args))), _this), _this.handleConnect = function (e) {
      e.preventDefault();
      if (_this._input.value.trim() === '') return;
      _this.props.connectToPeer(_this._input.value);
      _this._input.value = '';
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Peer, [{
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