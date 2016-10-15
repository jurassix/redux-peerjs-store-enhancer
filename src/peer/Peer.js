import React, {PropTypes} from 'react';

class Peer extends React.Component {
  static propTypes = {
    peerId: PropTypes.string,
    connectedPeerIds: PropTypes.arrayOf(PropTypes.string),
    initPeer: PropTypes.func.isRequired,
    connectToPeer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    peerId: 'not initialized',
    connectedPeerIds: [],
  }

  componentWillMount() {
    this.props.initPeer();
  }

  render() {
    const {peerId, connectedPeerIds} = this.props;
    return (
      <form onSubmit={this.handleConnect}>
        <h4>PeerID is <span>{peerId}</span></h4>
        <label>Connections:
          <ul>
            {connectedPeerIds.map(id => (<li>{id}</li>))}
          </ul>
        </label>
        <label>
          PeerID to connect to:
          <input type="text" ref={(r) => this._input = r} />
        </label>
        <button type="submit">Connect</button>
      </form>
    );
  }

  handleConnect = (e) => {
    e.preventDefault();
    if (this._input.value.trim() === '') return;
    this.props.connectToPeer(this._input.value);
    this._input.value = '';
  }
}

export default Peer;
