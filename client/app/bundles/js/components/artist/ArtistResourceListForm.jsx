import React from 'react';
import { ResourceListForm } from '../shared';
import { registerHandlers } from '../../helpers';

export default class ArtistResourceListForm extends ResourceListForm {
  static defaultProps = {
    artists: [],
    formArtists: [],
  }

  constructor(props) {
    super(props);

    this.resource = 'artists';
    this.state = { artists: this.mergeSelected(props.artists, props.formArtists) };

    registerHandlers.call(this, ['handleSelect']);
  }

  handleSelect(event) {
    event.preventDefault();

    const objId = parseInt(event.currentTarget.id, 10);

    function selectCurrentResource(resource) {
      return {
        ...resource,
        selected: objId === resource.id ? !resource.selected : resource.selected,
      };
    }

    const resources = this.state[this.resource].map(selectCurrentResource);

    this.setState({ [this.resource]: resources });
  }

  getRequestData() {
    return this.state[this.resource]
      .filter(resource => resource.selected)
      .map(resource => resource.id);
  }

  resetForm() {
    function deselectArtist(artist) {
      return { ...artist, selected: false };
    }
    const resetResources = this.state[this.resource].map(deselectArtist);

    this.setState({ artists: resetResources });
  }

  composeArtistList(artists) {
    function composeArtistItem(artist) {
      const className = `artist-item ${artist.selected ? ' selected' : ''}`;
      return (
        <li id={artist.id} key={artist.id} onClick={this.handleSelect} className={className}>
          <div className="artist-item-avatar" style={{ backgroundImage: `url('${artist.avatar}')` }}>
            <div className="checkmark-container">
              <i className="fa fa-check-circle checkmark" />
            </div>
          </div>
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
        <h3 className="album-artists-title">Artists</h3>
        {artistList}
      </div>
    );
  }
}
