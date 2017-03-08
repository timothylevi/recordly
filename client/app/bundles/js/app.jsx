import ReactOnRails from 'react-on-rails';

import Artist from './components/artist/Artist.jsx';
import Artists from './components/artist/Artists.jsx';
import Album from './components/album/Album.jsx';
import Albums from './components/album/Albums.jsx';
import Tracks from './components/track/Tracks.jsx';


ReactOnRails.register({
  Artist,
  Artists,
  Album,
  Albums,
  Tracks
});
