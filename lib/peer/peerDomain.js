"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = peerDomain;
function peerDomain(peer) {
  return {
    get __peer() {
      return peer;
    },
    get id() {
      return peer.id;
    },
    get connections() {
      return peer.connections;
    }
  };
}