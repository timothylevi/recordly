import React from 'react';
import { ResourceList } from '../shared/Base.jsx';

export default class ArtistResourceList extends ResourceList {
  constructor(props) {
    super(props)

    this.state = {
      artists: props.artists
    }

    this.resource = "artists";
  }

  getSelectedArtistIds() {
    return this.state.artists.filter(function(artist) {
      return artist.selected;
    }).map(function(artist) {
      return artist.id;
    });
  }

  render() {
    function composeArtistLi(artist) {
      const className = "artist-li" + (artist.selected ? " artist-li-selected" : "");

      return (
        <li key={artist.id} onClick={this.handleResourceSelectWithId(artist.id)} className={className}>
          <span className="artist-name">{artist.name}</span>
        </li>
      );
    }

    return (
      <ul>
        {this.props.artists.map(composeArtistLi.bind(this))}
      </ul>
    );
  }
}
