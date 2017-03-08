import React from 'react';
import { ResourceForm } from './Artist.jsx';
import { Resource } from '../shared/Base.jsx';
import { ResourceList as AlbumsList } from '../album/Album.jsx';

export default class Artist extends Resource {
  static defaultProps = {
    form: false,
    disableArtistEdit: false,
    disableArtists: false,
    disableEdit: false
   };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      id: props.artist.id || "",
      name: props.artist.name || "",
      avatar: props.artist.avatar || ""
    };

    this.resource = "artist";

    // Refs
    this.formComponent = {};
  }

  resetForm() {
    this.setState({
      id: "",
      name: "",
      avatar: "",
    });
  }

  getRequestData(obj) {
    return {
      artist: {
        id: obj.id,
        name: obj.name,
        avatar: obj.avatar
      }
    };
  }

  render() {
    if (this.props.artist.deleted) return null;

    if (this.props.format === "li") {
      const className = "artist-li " + (this.props.artist.selected ? "artist-li-selected" : "") ;
      return (
        <li onClick={this.props.handleResourceSelect} className={className}>
          {this.state.name}
        </li>
      );
    }

    const id = this.state.id;
    const name = this.state.name;
    const avatar = this.state.avatar;
    const albums = (
      <AlbumsList albums={this.props.artist.albums} />
    );

    if (this.state.form && !this.props.disableEdit) {
      return (
        <ResourceForm {...this.state} ref={(form) => { this.formComponent = form; }} />
      );
    }

    return (
      <div className="resource-artist">
        <div style={{backgroundSize: 'cover', backgroundImage: `url('${avatar}')`, width: "200px", height: "200px" }} />
        Name: {name}
        { this.props.disableArtistEdit ? null : <a onClick={this.handleEdit}>Edit</a> }
        { this.props.disableSelect ? null : <a onClick={this.handleSelect}>Select</a> }
        {/* TODO: Show albums and tracks here by config */}
        { this.props.artist.selected ? 'Selected' : null }
        { this.props.artist.selected && !this.props.disableAlbums ? albums : null}
      </div>
    );
  }
}
