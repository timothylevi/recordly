import React from 'react';
import { ResourceList } from '../shared';
import { Resource as ArtistResource } from '../artist';
import { Resource as AlbumResource } from '../album';
// import { Resource as TrackResource } from '../track';

export default class FavoriteResourceList extends ResourceList {
  static defaultProps = {
    favorites: []
  };

  constructor(props) {
    super(props)

    this.resource = "favorites";
    this.state = { favorites: props.favorites };
  }

  getResource(type) {
    if (type === "Artist") return ArtistResource;
    if (type === "Album") return AlbumResource;
    // if (type === "Track") return TrackResource;
  }

  composeFavoriteItem(favorite, index) {
    const props = {
      ...favorite,
      favorite: favorite.favorite,
      handleResourceAdd: this.handleResourceAdd,
      handleResourceSelect: this.handleResourceSelect,
      handleResourceDelete: this.handleResourceDelete
    };

    const resource = React.createElement(this.getResource(favorite.type), props);

    return (
      <li key={`${favorite.type}-${favorite.id}-${index}`}>
        {resource}
      </li>
    );
  }

  render() {
    return (
      <ul className="favorite-list">
        {this.state.favorites.map(this.composeFavoriteItem.bind(this))}
      </ul>
    );
  }
}
