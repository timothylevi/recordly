import React, { PropTypes } from 'react';
import { Resource } from './index';

export default class TrackResourceList extends React.Component {
  static propTypes = { tracks: PropTypes.array };
  static defaultProps = { tracks: [{}] };

  composeTrackItem(track) {
    return (
      <li key={track.id}>
        <Resource {...track} />
      </li>
    );
  }

  render() {
    return (
      <ul className="track-list">
        {this.props.tracks.map(this.composeTrackItem)}
      </ul>
    );
  }
}
