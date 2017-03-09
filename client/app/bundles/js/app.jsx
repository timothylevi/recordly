import ReactOnRails from 'react-on-rails';

import { ResourceListPage as ArtistPage } from './components/artist';
import { ResourceListPage as AlbumPage } from './components/album';
import { ResourceListPage as FavoritePage } from './components/favorite'
// import Tracks from './components/track/Tracks.jsx';

ReactOnRails.register({
  ArtistPage,
  AlbumPage,
  FavoritePage,
  // Tracks,
});
