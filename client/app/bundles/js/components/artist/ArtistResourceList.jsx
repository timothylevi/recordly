import React from 'react';
import { Resource } from './index'
import { ResourceList } from '../shared';

export default class ArtistResourceList extends ResourceList {
  static defaultProps = {
    artists: []
  };

  constructor(props) {
    super(props)

    this.resource = "artists";
    this.state = { artists: props.artists };
  }

  getSelectedArtistIds() {
    return this.state.artists.filter(x => x.selected).map(x => x.id);
  }

  render() {
    function composeArtistItem(artist) {
      return (
        <Resource
          {...artist}
          key={artist.id}
          handleResourceAdd={this.handleResourceAdd}
          handleResourceSelect={this.handleResourceSelect}
          handleResourceDelete={this.handleResourceDelete} />
      );
    }

    return (
      <ul className="artist-list">
        {this.props.artists.map(composeArtistItem.bind(this))}
      </ul>
    );
  }
}