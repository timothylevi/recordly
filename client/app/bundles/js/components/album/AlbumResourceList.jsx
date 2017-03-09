import React from 'react';
import { Resource } from './index';
import { ResourceList } from '../shared';

export default class AlbumResourceList extends ResourceList {
  static defaultProps = {
    albums: []
  };

  constructor(props) {
    super(props)

    this.resource = "albums";
  }

  render() {
    function composeAlbumItem(album) {
      return (
        <Resource
          {...album}
          key={album.id}
          container={this.props.container}
          handleResourceAdd={this.handleResourceAdd}
          handleResourceSelect={this.handleResourceSelect}
          handleResourceDelete={this.handleResourceDelete} />
      );
    }

    return (
      <ul className="album-list">
        {this.props.albums.map(composeAlbumItem.bind(this))}
      </ul>
    );
  }
}
