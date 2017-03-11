import React from 'react';
import { Resource } from './index';
import { ResourceList } from '../shared';

export default class ArtistResourceList extends ResourceList {
  static defaultProps = {
    artists: [],
  };

  constructor(props) {
    super(props);

    this.resource = 'artists';
    this.state = { artists: props.artists };
  }

  render() {
    function composeArtistItem(artist) {
      return (
        <Resource
          {...artist}
          key={artist.id}
          container={this.props.container}
          handleResourceAdd={this.handleResourceAdd}
          handleResourceSelect={this.handleResourceSelect}
          handleResourceDelete={this.handleResourceDelete}
        />
      );
    }

    return (
      <ul className="artist-list">
        {this.state.artists.map(composeArtistItem.bind(this))}
      </ul>
    );
  }
}
