import React from 'react';
import { ResourceList } from '../shared';

export default class AlbumResourceList extends ResourceList {
  constructor(props) {
    super(props)

    this.state = {
      albums: this.props.albums
    }

    this.resource = "albums";
  }

  render() {
    function composeAlbumLi(album) {
      const className = "album-li" + (album.selected ? " album-li-selected" : "");
      const albumTracks = album.tracks.length ? (
        <ul>
          {album.tracks.map(function(track) {
            return (
              <li key={track.id}>
                <span className="track-number">{track.track_num}</span>
                <span className="track-name">{track.name}</span>
              </li>
            );
          })}
        </ul>
      ) : null;

      return (
        <li key={album.id} onClick={this.handleResourceSelectWithId(album.id)} className={className}>
          <span className="album-name">{album.name}</span>
          {album.selected ? albumTracks : null}
        </li>
      );
    }

    return (
      <ul>
      {this.props.albums.map(composeAlbumLi.bind(this))}
      </ul>
    );
  }
}
