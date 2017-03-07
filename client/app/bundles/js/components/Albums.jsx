import React, { PropTypes } from 'react';
import { BaseResourceList } from './Base.jsx';
import Album, { ALBUM_PROP_TYPES } from './Album.jsx';
import { ARTISTS_PROP_TYPES } from './Artists.jsx';

const ALBUMS_PROP_TYPES = PropTypes.arrayOf(ALBUM_PROP_TYPES);

class Albums extends BaseResourceList {
  static propTypes = {
    // // Configuration
    // disableNew: PropTypes.bool,
    // disableEdit: PropTypes.bool,
    // disableFilter: PropTypes.bool,
    // disableSelect: PropTypes.bool,
    //
    // // Data
    // artists: ARTISTS_PROP_TYPES,
    // // albums: ALBUMS_PROP_TYPES,
    // album: ALBUM_PROP_TYPES
  };

  static defaultProps = {
    album: {}
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      albums: props.albums,
    };

    this.resource = "albums";

    this.filterMask = {};
  }

  composeResourceList(albums) {
    const _this = this;
    if (!albums || !albums.length) return null;

    return albums.map(function(album, index) {
      return (
        <Album
          album={album}
          artists={_this.props.artists}
          key={index}
          handleResourceDelete={_this.handleResourceDelete}
          handleResourceSelect={_this.handleResourceSelect} />
        );
    });
  }

  getNewAlbum() {
    if (this.filterMask.value || this.props.disableNew) return null;

    return (
      <div>
        <Album
          form={true}
          album={this.props.album}
          artists={this.props.artists}
          handleResourceAdd={this.handleResourceAdd} />
      </div>
    );
  }

  render() {
    const albums = this.filterMask.value ? null : this.composeResourceList(this.state.albums);
    const newAlbum = this.getNewAlbum();
    const filteredResources = this.getResourceFilter(this.state.filteredResources);

    return (
      <ul>
        {filteredResources}
        {albums}
        {newAlbum}
      </ul>
    );
  }
}

export { Albums as default, ALBUMS_PROP_TYPES };
