import React, { PropTypes } from 'react';
import { Resource } from './index';

export default class TrackResourceList extends React.Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  };

  static defaultProps = { tracks: [{}] };

  static composeTrackItem(track) {
    return <Resource key={track.id} {...track} />;
  }

  render() {
    return (
      <ul className="track-list">
        {this.props.tracks.map(this.constructor.composeTrackItem)}
      </ul>
    );
  }
}
