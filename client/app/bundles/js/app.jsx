import ReactOnRails from 'react-on-rails';

import { ResourceListPage as ArtistPage } from './components/artist/Artist.jsx';
import { ResourceListPage as AlbumPage } from './components/album/Album.jsx';
import Tracks from './components/track/Tracks.jsx';


ReactOnRails.register({
  ArtistPage,
  AlbumPage,
  Tracks,
});
