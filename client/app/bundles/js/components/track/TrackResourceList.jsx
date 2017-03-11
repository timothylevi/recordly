import React, { PropTypes } from 'react';
import { Resource } from './index';

export default class TrackResourceList extends React.Component {
  static propTypes = { tracks: PropTypes.array };
  static defaultProps = { tracks: [{}] };

  composeTrackItem(track) {
    return <Resource key={track.id} {...track} />;
  }

  render() {
    return (
      <ul className="track-list">
        {this.props.tracks.map(this.composeTrackItem)}
      </ul>
    );
  }
}
