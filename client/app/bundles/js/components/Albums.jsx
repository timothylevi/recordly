import React, { PropTypes } from 'react';
import { Page, BaseResourceList } from './Base.jsx';
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

    this.filterMask = {};
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
    if (this.filterMask.value || this.props.disableNew) return null;

    return (
      <Album
        form={true}
        album={this.props.album}
        artists={this.props.artists}
        handleResourceAdd={this.handleResourceAdd}
        artist_ids={this.props.artist_ids} />
    );
  }

  render() {
    const resourceListFilter = null;//this.getResourceFilter(this.state.filteredResources);
    const resourceList = this.filterMask.value ? null : this.composeResourceList(this.state[this.resource]);
    const resourceNew = this.composeNewAlbum();

    return (
      <Page title={this.resource}>
        <ul className="resources">
          {resourceListFilter}
          <ul className="resources-list">{resourceList}</ul>
          {resourceNew}
        </ul>
      </Page>
    );
  }
}

export { Albums as default, ALBUMS_PROP_TYPES };
