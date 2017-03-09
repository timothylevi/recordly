import React from 'react';
import { ResourceForm } from './index';
import { Resource } from '../shared';
import { ResourceList as TrackList } from '../track';
// import { ArtistList } from '../artist/Artists.jsx';

export default class AlbumResource extends Resource {
  static defaultProps = {
    id: "",
    name: "",
    avatar: "",
    artists: []
  };

  constructor(props, _railsContext) {
    super(props);

    this.resource = "album";
    this.state = {
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      artists: props.artists
    };

    // this.artistsComponent = {};
  }

  // composeArtistList(artists, format) {
  //   return (
  //     <Artists
  //       artists={artists}
  //       albumArtists={this.props.album.artists}
  //       artist={{}}
  //       className="album-artists"
  //       format={format}
  //       ref={(artists) => this.artistsComponent = artists} />
  //   );
  // }

  composeEditControl(disable) {
    return disable ? null : <a className="album-item-controls-edit" onClick={this.handleEdit}>Edit</a>;
  }

  composeTrackList(tracks, disable) {
    return disable ? null : <TrackList tracks={tracks} />;
  }

  render() {
    if (this.props.deleted) return null;

    if (this.state.form) {
      return (
        <ResourceForm
          {...this.state}
          container={this.props.container}
          handleResourceUpdate={this.handleResourceUpdate}
          handleResourceCancel={this.handleResourceCancel}
          handleResourceDelete={this.props.handleResourceDelete}
          ref={(form) => { this.formComponent = form; }} />
      );
    }

    const className = "album-item" + (this.props.selected ? " selected" : "");
    const editControl = this.composeEditControl(this.props.container === "artist");
    const trackList = this.composeTrackList(this.props.tracks, !this.props.selected);
    // const albumArtists = this.composeArtistList(this.state.artists, "ul");

    return (
      <li key={this.state.id} onClick={this.handleSelect} className={className}>
        <div className="album-item-controls">
          {editControl}
        </div>
        <div className="album-item-avatar" style={{backgroundImage: `url('${this.state.avatar}')` }}></div>
        <div className="album-item-name">{this.state.name}</div>
        <div className="album-item-created">{this.state.created_at && this.state.created_at.toString()}</div>
        <div className="album-item-updated">{this.state.updated_at && this.state.updated_at.toString()}</div>
        <div className="album-tracks">
          {trackList}
        </div>
      </li>
    );
  }
}
