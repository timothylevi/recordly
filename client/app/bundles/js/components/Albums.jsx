import React, { PropTypes } from 'react';
import { Page, BaseResourceList, FilterableResourceList } from './Base.jsx';
import Album, { AlbumNew, ALBUM_PROP_TYPES } from './Album.jsx';
import { ARTISTS_PROP_TYPES } from './Artists.jsx';

const ALBUMS_PROP_TYPES = PropTypes.arrayOf(ALBUM_PROP_TYPES);

class Albums extends FilterableResourceList {
  static defaultProps = {
    album: {},
    disableAlbumEdit: false,
    disableNew: false
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      albums: props.albums,
    };

    this.resource = "albums";
  }

  composeResourceList(albums) {
    const _this = this;
    if (!albums || !albums.length) return null;

    return albums.map(function(album, index) {
      return (
        <li className="resource-item" key={album.id}>
          <Album
            album={album}
            artists={_this.props.artists}
            disableEdit={_this.props.disableAlbumEdit}
            handleResourceDelete={_this.handleResourceDelete}
            handleResourceSelect={_this.handleResourceSelect} />
        </li>
      );
    });
  }

  composeNewAlbum() {
    if (this.resourcesFilterMask.value || this.props.disableNew) return null;

    return (
      <AlbumNew
        form={true}
        album={this.props.album}
        artists={this.props.artists}
        handleResourceAdd={this.handleResourceAdd}
        artist_ids={this.props.artist_ids} />
    );
  }

  render() {
    const resourceListFilter = this.getResourceFilter(this.state.filteredResources);
    const resourceNew = this.composeNewAlbum();

    return (
      <Page title={this.resource}>
        <ul className="resources">
          {resourceListFilter}
          <AlbumsList albums={this.state.albums} />
          {resourceNew}
        </ul>
      </Page>
    );
  }
}

class AlbumsList extends BaseResourceList {
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

export { Albums as default, AlbumsList, ALBUMS_PROP_TYPES };
