import React, { PropTypes } from 'react';
import { BaseResource } from './Base.jsx';
import Artists, { ARTISTS_PROP_TYPES } from './Artists.jsx';

const ALBUM_PROP_TYPES = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  deleted: PropTypes.bool,
  selected: PropTypes.bool,
});

class Album extends BaseResource {
  static propTypes = {
    // // Configuration
    // // container: PropTypes.string,
    // form: PropTypes.bool,
    // disableEdit: PropTypes.bool,
    // disbableSelect: PropTypes.bool,
    //
    // // Handlers
    // handleResourceAdd: PropTypes.func,
    // handleResourceDelete: PropTypes.func,
    // handleResourceSelect: PropTypes.func,
    //
    // // Data
    // album: ALBUM_PROP_TYPES,
    // artists: ARTISTS_PROP_TYPES
  };

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

  resetForm() {
    this.setState({
      id: "",
      name: "",
      avatar: "",
      form: true,
      artists: this.props.album.artists
    });
  }

  getRequestData(obj) {
    console.log(this.props.artist_ids || this.artistsComponent.getSelectedArtistIds());
    return {
      id: obj.id,
      name: obj.name,
      avatar: obj.avatar,
      artist_ids: this.props.artist_ids || this.artistsComponent.getSelectedArtistIds()
    };
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
    const errors = this.composeErrorList(this.state.errors);
    const albumArtists = this.composeArtistList(this.state.artists, "ul");
    const formArtists = this.composeArtistList(this.props.artists, "ul");

    if (this.state.form) {
      return (
        <form ref={(form) => { this.formComponent = form; }}>
          {errors}
          <div>
            <label>Name</label>
            <input type="text" name="name" value={name} onChange={this.handleChange}/>
          </div>
          <div>
            <div style={{backgroundSize: 'cover', backgroundImage: `url('${avatar}')`, width: "200px", height: "200px" }} />
            <label>Avatar</label>
            <input type="file" name="avatar" onChange={this.handleFileUpload("avatar")}/>
          </div>
          <div>
            <label>Artists</label>
            {formArtists}
          </div>
          <div>
            <input type="submit" value="Save" onClick={this.handleSubmit} />
            <a onClick={this.handleDelete}>Delete</a>
            <a onClick={this.handleCancel}>Cancel</a>
          </div>
        </form>
      );
    }

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

export { Album as default, ALBUM_PROP_TYPES };
