import React from 'react';
import { Resource } from './index';
import { ResourceList } from '../shared';
import { bindHandlers } from '../../helpers';

export default class ArtistResourceList extends ResourceList {
  static defaultProps = {
    artists: [],
  };

  constructor(props) {
    super(props);

    this.resource = 'artists';
    this.state = { artists: props.artists };
    bindHandlers.call(this, ['composeArtistItem']);
  }

  composeArtistItem(artist) {
    return (
      <Resource
        {...artist}
        key={artist.id}
        container={this.props.container}
        handleResourceSelect={this.handleResourceSelect}
        handleResourceDelete={this.handleResourceDelete}
      />
    );
  }

  render() {
    return (
      <ul className="artist-list">
        {this.props.artists.map(this.composeArtistItem)}
      </ul>
    );
  }
}
