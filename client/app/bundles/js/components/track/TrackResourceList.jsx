import React from 'react';

export default class TrackResourceList extends React.Component {
  constructor(props) {
    super(props);
  }

  composeTrackItem(track) {
    return (
      <li className="track-item" key={track.id}>
        <span className="track-item-num">{track.track_num}</span>
        <span className="track-item-name">{track.name}</span>
      </li>
    )
  }

  render() {
    return (
      <ul className="track-list">
        {this.props.tracks.map(this.composeTrackItem)}
      </ul>
    );
  }
}
