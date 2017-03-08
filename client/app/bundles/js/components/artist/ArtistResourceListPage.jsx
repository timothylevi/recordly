import React from 'react';
import { Resource } from './Artist.jsx';
import { Page, FilterableResourceList } from '../shared/Base.jsx';

export default class ArtistResourceListPage extends FilterableResourceList {
  static defaultProps = {
    albumArtists: []
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      artists: this.mergeArtistState(props.artists, props.selectedArtists)
    };

    this.resource = "artists";

    this.mergeArtistState = this.mergeArtistState.bind(this);
  }

  componentDidMount() {
    this.props.albumArtists.map(x => x.id).map(this.handleResourceSelect);
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

  composeResourceList(artists, classes) {
    const _this = this;
    if (!artists || !artists.length) return null;

    const artistItems = artists.map(function(artist, index) {
      return (
        <li className="resource-item" key={artist.id}>
          <Resource
            artist={artist}
            form={false}
            handleResourceDelete={_this.handleResourceDelete}
            handleResourceSelect={_this.handleResourceSelect}
            disableEdit={_this.props.disableArtistEdit}
            disableSelect={_this.props.disableSelect}
            disableAlbums={_this.props.disableAlbums} />
        </li>
      );
    });

    return artistItems;
  }

  composeNewArtist(artist) {
    if (this.props.disableNew || this.resourcesFilterMask.value) return null;

    return <Resource form={true} artist={artist} handleResourceAdd={this.handleResourceAdd} />;
  }

  render() {
    const _this = this;

    const resourceFilter = this.getResourceFilter(this.state.filteredResources);
    const resourceList = this.resourcesFilterMask.value ? null : this.composeResourceList(this.state[this.resource]);
    const resourceNew = this.composeNewArtist(this.props.artist);

    return (
      <Page title={this.resource} className={this.props.className}>
        <div className="resources">
          {resourceFilter}
          <ul className="resources-list">{resourceList}</ul>
          {resourceNew}
        </div>
      </Page>
    );
  }
}
