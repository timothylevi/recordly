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
    avatar: '',
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
      <a className="album-item-controls-edit" onClick={this.handleEdit}>
        Edit
      </a>
    );
  }

  composeTrackList(disable) {
    return disable ? null : <TrackList tracks={this.props.tracks} />;
  }

  composeArtistList(disable) {
    return disable ? null : <ArtistList artists={this.props.artists} container="album" />;
  }

  render() {
    if (this.props.deleted) return null;

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

    const isInArtistContainer = this.props.container === 'artist';
    const isSelected = this.props.selected;

    const disableEditControl = isInArtistContainer;
    const disableTrackList = !isSelected;
    const disableArtistList = isInArtistContainer || !isSelected;

    const className = `album-item ${this.props.selected ? ' selected' : ''}`;
    const editControl = this.composeEditControl(disableEditControl);
    const trackList = this.composeTrackList(disableTrackList);
    const artistList = this.composeArtistList(disableArtistList);

    return (
      <li key={this.state.id} onClick={this.handleSelect} className={className}>
        <div className="album-item-controls">
          <FavoriteForm
            favorite={this.props.favorite}
            favoriteable_id={this.state.id}
            favoriteable_type="Album"
          />
          {editControl}
        </div>
        <div
          className="album-item-avatar"
          style={{ backgroundImage: `url('${this.state.avatar}')` }}
        />
        <div className="album-item-name">{this.state.name}</div>
        {/*
        <div className="album-item-created">{this.state.created_at && this.state.created_at.toString()}</div>
        <div className="album-item-updated">{this.state.updated_at && this.state.updated_at.toString()}</div>
        */}
        <div className="album-tracks">
          {artistList}
          {trackList}
        </div>
      </li>
    );
  }
}
