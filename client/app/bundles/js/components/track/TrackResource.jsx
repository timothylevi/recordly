import React, { PropTypes } from 'react';
import { ResourceForm as FavoriteForm } from '../favorite';

export default class TrackResource extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    track_num: PropTypes.number,
    favorite: PropTypes.number,
  };

  static defaultProps = {
    id: '',
    name: '',
    track_num: '',
    favorite: null,
  };

  render() {
    const album = this.props.album.name;
    const artists = this.props.album.artists.map(artist => artist.name).join(", ");

    return (
      <li className="track-item">
        <div className="item-controls">
          <FavoriteForm
            favorite={this.props.favorite}
            favoriteable_id={this.props.id}
            favoriteable_type="Track"
          />
        </div>
        <span className="item-num">{this.props.track_num}</span>
        <span className="item-name">{this.props.name}</span>
        {this.props.container !== "favorite" ? null : (
          <div className="item-associations">
            <span className="item-association">
              <i className="fa fa-music item-association-icon" />
              {album}
            </span>
            <span className="item-association">
              <i className="fa fa-user item-association-icon" />
              {artists}
            </span>
          </div>
        )}
      </li>
    );
  }
}
