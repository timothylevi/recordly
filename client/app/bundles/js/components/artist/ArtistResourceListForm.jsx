import React from 'react';
import { ResourceListForm } from '../shared';
import { registerHandlers } from '../../helpers';

export default class ArtistResourceListForm extends ResourceListForm {
  static defauultProps = {
    artists: [],
    formArtists: []
  }

  constructor(props) {
    super(props);

    this.resource = "artists";
    this.state = {
      artists: this.mergeSelected(props.artists, props.formArtists)
    };

    registerHandlers.call(this, [
      "handleSelect"
    ]);
  }

  handleSelect(event) {
    event.preventDefault();

    const objId = parseInt(event.currentTarget.id, 10);
    const resources = this.state[this.resource].map(function(resource) {
      if (resource.id === objId) {
        resource.selected = !resource.selected;
      }

      return resource;
    });

    this.setState({ [this.resource]: resources });
  }

  getRequestData() {
    return this.state[this.resource]
      .filter(resource => resource.selected)
      .map(resource => resource.id);
  }

  resetForm() {
    function deselectArtist(artist) {
      artist.selected = false;
      return artist;
    }
    const resetResources = this.state[this.resource].map(deselectArtist);

    this.setState({
      artists: resetResources
    });
  }

  composeArtistList(artists) {
    function composeArtistItem(artist) {
      const className = "artist-item" + (artist.selected ? " selected" : "");
      return (
        <li id={artist.id} key={artist.id} onClick={this.handleSelect} className={className}>
          <div className="artist-item-avatar" style={{backgroundImage: `url('${artist.avatar}')` }}></div>
          <div className="artist-item-name">{artist.name}</div>
        </li>
      );
    }

    return (
      <ul className="artist-list-form">
        {artists.map(composeArtistItem.bind(this))}
      </ul>
    );
  }

  render() {
    const artistList = this.composeArtistList(this.state.artists);
    return (
      <div>
        {artistList}
      </div>
    );
  }
}
