import React from 'react';
import { Resource } from '../shared';
// import { ArtistList } from '../artist/Artists.jsx';

export default class AlbumResource extends Resource {
  static defaultProps = { form: false };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      // Config
      form: props.form || false,

      // Data
      id: props.album.id || "",
      name: props.album.name || "",
      avatar: props.album.avatar || "",
      artists: props.album.artists || []
    };

    this.resource = "album";
    this.formComponent = {};
    this.artistsComponent = {};
  }

  composeArtistList(artists, format) {
    return (
      <Artists
        artists={artists}
        albumArtists={this.props.album.artists}
        artist={{}}
        className="album-artists"
        format={format}
        ref={(artists) => this.artistsComponent = artists} />
    );
  }

  render() {
    if (this.props.album.deleted) return null;

    const id = this.state.id;
    const name = this.state.name;
    const avatar = this.state.avatar;
    const albumArtists = this.composeArtistList(this.state.artists, "ul");

    return (
      <div className={"resource-album " + (this.props.album.selected ? "resource-selected" : null) }>
        <div className="album-avatar" style={{backgroundImage: `url('${avatar}')`}} />
        <h3 className="album-name">{name}</h3>
        {albumArtists}
        <ul className="album-actions">
          { this.props.disableEdit ? null : <li className="album-action"><a onClick={this.handleEdit}>Edit</a></li> }
          { this.props.disableSelect ? null : <li className="album-action"><a onClick={this.handleSelect}>Select</a></li> }
        </ul>
      </div>
    );
  }
}
