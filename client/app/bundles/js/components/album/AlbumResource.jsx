import React from 'react';
import { ResourceForm } from './index';
import { Resource } from '../shared';
import { ResourceList as TrackList } from '../track';
import { ResourceList as ArtistList } from '../artist';
import { ResourceForm as FavoriteForm } from '../favorite';

export default class AlbumResource extends Resource {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '/images/missing_album.png',
    artists: [],
    tracks: [{}],
  };

  constructor(props) {
    super(props);

    this.resource = 'album';
    this.state = {
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      artists: props.artists,
      tracks: props.tracks,
    };
  }

  composeEditControl(disable) {
    return disable ? null : (
      <button
        className="item-control item-control-edit"
        onClick={this.handleEdit}
        title={`Edit ${this.resource}`}
      >
        <i className="fa fa-pencil-square-o" />
        <span className="no-web">Edit {this.resource}</span>
      </button>
    );
  }

  composeTrackList(disable) {
    return disable ? null : (
      <div className="album-tracks">
        <TrackList tracks={this.props.tracks} />
      </div>
    );
  }

  composeArtistList(disable) {
    return disable ? null : (
      <div className="album-artists">
        <ArtistList artists={this.props.artists} container="album" />
      </div>
    );
  }

  render() {
    if (this.props.deleted) return null;
    if (this.props.hasOwnProperty('filtered') && !this.props.filtered) return null;

    if (this.state.form) {
      return (
        <ResourceForm
          {...this.state}
          formArtists={this.props.formArtists}
          container={this.props.container}
          handleResourceUpdate={this.handleResourceUpdate}
          handleResourceCancel={this.handleResourceCancel}
          handleResourceDelete={this.props.handleResourceDelete}
          ref={(form) => { this.formComponent = form; }}
        />
      );
    }

    const isInFavoritesContainer = this.props.container === 'favorites';
    const isInArtistContainer = this.props.container === 'artist';
    const isSelected = !!this.props.selected;

    const disableEditControl = isInArtistContainer || isInFavoritesContainer;
    const disableTrackList = !isSelected;
    const disableArtistList = isInArtistContainer || !isSelected;

    const className = `album-item ${isSelected ? ' selected' : ''}`;
    const editControl = this.composeEditControl(disableEditControl);
    const trackList = this.composeTrackList(disableTrackList);
    const artistList = this.composeArtistList(disableArtistList);

    const selectText = isSelected ? `Close ${this.resource}` : `View more from this ${this.resource}`;

    return (
      <li key={this.state.id} className={className}>
        <div className="item-row">
          <div className="item-controls">
            {this.props.container === 'page' ? null : (
              <button
                title="Album"
                className="item-control item-control-select static"
                disabled
              >
                <i className="fa fa-music" />
                <span className="no-web">Album</span>
              </button>
            )}
            <FavoriteForm
              favorite={this.props.favorite}
              favoriteable_id={this.state.id}
              favoriteable_type="Album"
            />
            <button
              className="item-control item-control-select"
              onClick={this.handleSelect}
              title={selectText}
            >
              <i className={`fa ${isSelected ? 'fa-outdent' : 'fa-indent'}`} />
              <span className="no-web">{selectText}</span>
            </button>
            {editControl}
          </div>
          <div
            className="item-avatar"
            style={{ backgroundImage: `url('${this.state.avatar}')` }}
          />
          <div className="item-name">
            <img
              className="item-name-background"
              alt={`${this.resource} avatar`}
              src={this.state.avatar}
            />
            <div className="item-name-text">{this.state.name}</div>
            <div className="item-created">
              {this.state.created_at && this.state.created_at.toString()}
            </div>
            <div className="item-updated">
              {this.state.updated_at && this.state.updated_at.toString()}
            </div>
          </div>
        </div>
        <div className="item-row item-associations">
          {trackList}
          {artistList}
        </div>
      </li>
    );
  }
}
