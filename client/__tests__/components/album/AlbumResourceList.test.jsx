describe('AlbumResourceList', () => { test('renders', () => {}) });
// import React from 'react';
// import { Resource } from './index';
// import { ResourceList } from '../shared';
// import { bindHandlers } from '../../helpers';
//
// export default class AlbumResourceList extends ResourceList {
//   static defaultProps = { albums: [] };
//
//   constructor(props) {
//     super(props);
//
//     this.resource = 'albums';
//     this.state = { albums: props.albums };
//     bindHandlers.call(this, ['composeAlbumItem']);
//   }
//
//   composeAlbumItem(album) {
//     return (
//       <Resource
//         {...album}
//         key={album.id}
//         formArtists={this.props.formArtists}
//         container={this.props.container}
//         handleResourceAdd={this.handleResourceAdd}
//         handleResourceSelect={this.handleResourceSelect}
//         handleResourceDelete={this.handleResourceDelete}
//       />
//     );
//   }
//
//   render() {
//     return (
//       <ul className="album-list">
//         {this.state.albums.map(this.composeAlbumItem)}
//       </ul>
//     );
//   }
// }
