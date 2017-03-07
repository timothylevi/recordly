import React, { PropTypes } from 'react';
import { BaseResourceList } from './Base.jsx';
import Artist, { ARTIST_PROP_TYPES } from './Artist.jsx';

const ARTISTS_PROP_TYPES = PropTypes.arrayOf(ARTIST_PROP_TYPES);

class Artists extends BaseResourceList {
  // static propTypes = {
  //   // Configuration
  //   disableNew: PropTypes.bool,
  //   disableArtistEdit: PropTypes.bool,
  //   disableFilter: PropTypes.bool,
  //   disableSelect: PropTypes.bool,
  //
  //   // Data
  //   // artists: ARTISTS_PROP_TYPES,
  //   // artist: ARTIST_PROP_TYPES,
  //   selectedArtists: ARTISTS_PROP_TYPES
  // };

  static defaultProps = {
    disableArtistEdit: false
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      artists: this.mergeArtistState(props.artists, props.selectedArtists),
      filteredResources: []
    };

    this.resource = "artists";

    this.mergeArtistState = this.mergeArtistState.bind(this);
  }

  mergeArtistState(artists, selectedArtists) {
    if (!artists) return [];
    if (!selectedArtists) return artists;

    var artistHash = selectedArtists.reduce(function(hsh, obj, index) {
      obj.selected = true;
      hsh[obj.name] = obj;
      return hsh;
    }, {});

    return artists.map(function(artist) {
      return artistHash.hasOwnProperty(artist.name) ? artistHash[artist.name] : artist;
    });
  }

  composeResourceList(artists) {
    const _this = this;
    if (!artists || !artists.length) return null;

    const artistItems = artists.map(function(artist, index) {
      return <Artist
        artist={artist}
        key={artist.id}
        form={false}
        handleResourceDelete={_this.handleResourceDelete}
        handleResourceSelect={_this.handleResourceSelect}
        disableEdit={_this.props.disableArtistEdit}
        disableSelect={_this.props.disableSelect}
        disableAlbums={_this.props.disableAlbums} />;
    });

    return artistItems;
  }

  getNewArtist(artist) {
    if (this.props.disableNew || this.filterMask.value) return null;

    return <Artist form={true} artist={artist} handleResourceAdd={this.handleResourceAdd} />;
  }

  getSelectedArtistIds() {
    return this.state.artists.filter(function(artist) {
      return artist.selected;
    }).map(function(artist) {
      return artist.id;
    });
  }

  render() {
    const artists = this.filterMask.value ? null : this.composeResourceList(this.state.artists);
    const newArtist = this.getNewArtist(this.props.artist);
    const artistFilter = this.getResourceFilter(this.state.filteredResources);

    return (
      <ul>
        {artistFilter}
        {newArtist}
        {artists}
      </ul>
    );
  }
}

export { Artists as default, ARTISTS_PROP_TYPES };
