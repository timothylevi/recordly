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
    return (
      <li className="track-item" key={this.props.id}>
        <div className="track-item-controls">
          <FavoriteForm
            favorite={this.props.favorite}
            favoriteable_id={this.props.id}
            favoriteable_type="Track"
          />
        </div>
        <span className="track-item-num">{this.props.track_num}</span>
        <span className="track-item-name">{this.props.name}</span>
      </li>
    );
  }
}
