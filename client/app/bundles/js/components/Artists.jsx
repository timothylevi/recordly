import React, { PropTypes } from 'react';
import Artist from './Artist.jsx';

export default class Artists extends React.Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    })),
    artist: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    })
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      artists: props.artists,
      selectedArtist: {},
      filteredArtists: []
    };

    this.filterMask = {};

    this.handleArtistAdd = this.handleArtistAdd.bind(this);
    this.handleArtistDelete = this.handleArtistDelete.bind(this);
    this.handleArtistSelect = this.handleArtistSelect.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  // Not event handlers, just handling business from them
  handleArtistAdd(artist) {
    const artists = this.state.artists;
    artists.push(artist);

    this.setState({ artists });
  }

  handleArtistDelete(artistId) {
    const artists = this.state.artists.map(function(artist) {
      if (artist.id === artistId) artist.deleted = true;

      return artist;
    });

    this.setState({ artists });
  }

  handleArtistSelect(artistId) {
    const artists = this.state.artists.map(function(artist) {
      artist.selected = artist.id === artistId;

      return artist;
    });

    this.setState({ artists });
  }

  handleFilter(event) {
    event.preventDefault();

    const filterMask = this.filterMask.value.toLowerCase();
    const artists = this.state.artists.filter(function(artist) {
      return artist.name.toLowerCase().includes(filterMask);
    });

    debugger;
    this.setState({ filteredArtists: artists });
  }

  getArtistList(artists) {
    const _this = this;
    if (!artists || !artists.length) return null;

    const artistItems = artists.map(function(artist, index) {
      return <Artist
        form={false}
        artist={artist}
        key={artist.id + index}
        handleArtistDelete={_this.handleArtistDelete}
        handleArtistSelect={_this.handleArtistSelect} />;
    });

    return artistItems;
  }

  getNewArtist(artist) {
    return <Artist form={true} artist={artist} handleArtistAdd={this.handleArtistAdd}/>;
  }

  render() {
    const artists = this.filterMask.value ? null : this.getArtistList(this.state.artists);
    const newArtist = this.filterMask.value ? null : this.getNewArtist(this.props.artist);
    const filteredArtists = this.filterMask.value ? this.getArtistList(this.state.filteredArtists) : null;

    return (
      <ul>
        <input
          type="search"
          name="filter"
          placeholder="Filter artists"
          onChange={this.handleFilter}
          ref={(filterMask) => { this.filterMask = filterMask; }}/>
        {filteredArtists}
        {newArtist}
        {artists}
      </ul>
    );
  }
}
