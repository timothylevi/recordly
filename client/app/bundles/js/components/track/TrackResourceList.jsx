import React from 'react';
import { Resource } from './index';
import { ResourceForm as FavoriteForm } from '../favorite';

export default class TrackResourceList extends React.Component {
  constructor(props) {
    super(props);
  }

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
