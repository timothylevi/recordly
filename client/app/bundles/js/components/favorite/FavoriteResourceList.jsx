import React from 'react';
// import { Resource } from './index'
import { ResourceList } from '../shared';
import { Resource as ArtistResource } from '../artist';

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
  }

  // getSelectedArtistIds() {
    // return this.state.artists.filter(x => x.selected).map(x => x.id);
  // }

  render() {
    function composeFavoriteItem(favorite) {
      debugger;
      const props = {
        ...favorite,
        key: favorite.id,
        favorited: true,
        handleResourceAdd: this.handleResourceAdd,
        handleResourceSelect: this.handleResourceSelect,
        handleResourceDelete: this.handleResourceDelete
      };

      const resource = React.createElement(this.getResource(favorite.type), props);

      return (
        <li key={favorite.id}>
          {resource}
        </li>
      );
    }

    return (
      <ul className="favorite-list">
        {this.state.favorites.map(composeFavoriteItem.bind(this))}
      </ul>
    );
  }
}
