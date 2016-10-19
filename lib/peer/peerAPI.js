'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectToPeer = exports.send = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var connectToPeer = exports.connectToPeer = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(peer, remotePeerId) {
    var onOpen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    var onMessageRecieve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    var onError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : noop;
    var peerConn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!(peer.connections[remotePeerId] === undefined)) {
              _context.next = 9;
              break;
            }

            peerConn = peer.connect(remotePeerId, { serialization: 'json' });

            error(peerConn, onError);
            _context.next = 6;
            return open(peerConn, onOpen);

          case 6:
            data(peerConn, onMessageRecieve);
            _context.next = 10;
            break;

          case 9:
            console.error('Already connected to remote peer id = ' + remotePeerId);

          case 10:
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);

            console.error('Client connection failed', _context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function connectToPeer(_x6, _x7, _x8, _x9, _x10) {
    return _ref.apply(this, arguments);
  };
}();

exports.createPeer = createPeer;

var _peerjs = require('peerjs');

var _peerjs2 = _interopRequireDefault(_peerjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var noop = function noop(arg) {
  console.log(arg);return arg;
};

function createPeer(options, onOpen, onConnection, onMessageRecieve, onError) {
  var peer = new _peerjs2.default(_extends({
    debug: 3,
    host: 'localhost',
    port: 9000,
    path: '/'
  }, options));
  error(peer, onError);
  open(peer, onOpen);
  connection(peer, function (conn) {
    onConnection(conn);
    data(conn, onMessageRecieve);
  });
  return peer;
}

var send = exports.send = function send(peer) {
  return function (data) {
    Object.keys(peer.connections).forEach(function (peerId) {
      peer.connections[peerId].map(function (conn) {
        if (conn.open) {
          conn.send(data);
        } else {
          console.error('cannot send, conn not open', conn);
        }
      });
    });
  };
};

function open(peer) {
  var onOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  return new Promise(function (resolve, reject) {
    try {
      if (peer.open) {
        return resolve(peer.id);
      }
      peer.on('open', function (id) {
        onOpen(id);
        resolve(id);
      });
    } catch (err) {
      onError(err);
      reject(err);
    }
  });
}
function connection(peer) {
  var onConnection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  peer.on('connection', onConnection);
}

function data(peer) {
  var onData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  peer.on('data', onData);
}

function error(peer) {
  var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  peer.on('error', onError);
}