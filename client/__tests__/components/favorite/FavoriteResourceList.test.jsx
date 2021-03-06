describe('FavoriteResourceList', () => { test('renders', () => {}) });
// import React from 'react';
// import { ResourceList } from '../shared';
// import { Resource as ArtistResource } from '../artist';
// import { Resource as AlbumResource } from '../album';
// import { Resource as TrackResource } from '../track';
// import { bindHandlers } from '../../helpers';
//
// export default class FavoriteResourceList extends ResourceList {
//   static defaultProps = { favorites: [] };
//
//   constructor(props) {
//     super(props);
//
//     this.resource = 'favorites';
//     this.state = { favorites: props.favorites };
//     bindHandlers.call(this, ['composeFavoriteItem']);
//   }
//
//   getResource() {
//     if (this.type === 'Artist') return ArtistResource;
//     if (this.type === 'Album') return AlbumResource;
//     if (this.type === 'Track') return TrackResource;
//
//     return null;
//   }
//
//   composeFavoriteItem(favorite, index) {
//     const props = {
//       ...favorite,
//       favorite: favorite.favorite,
//       container: 'favorite',
//       key: `${favorite.type}-${favorite.id}-${index}`,
//       handleResourceAdd: this.handleResourceAdd,
//       handleResourceSelect: this.handleResourceSelect,
//       handleResourceDelete: this.handleResourceDelete,
//     };
//
//     return React.createElement(this.getResource.bind(favorite)(), props);
//   }
//
//   render() {
//     return (
//       <ul className="favorite-list">
//         {this.state.favorites.map(this.composeFavoriteItem)}
//       </ul>
//     );
//   }
// }
