import React, { PropTypes } from 'react';
import { BaseResource } from '../shared/Base.jsx';
import Artists, { ArtistsList, ARTISTS_PROP_TYPES } from '../artist/Artists.jsx';
import TracksForm from '../track/Tracks.jsx';

const ALBUM_PROP_TYPES = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  deleted: PropTypes.bool,
  selected: PropTypes.bool,
});

class AlbumNew extends BaseResource {
  constructor(props) {
    super(props);

    this.formComponent = {};
    this.resource = "album";

    this.state = {
      id: "",
      name: props.name || "",
      avatar: props.avatar || "",
      artists: props.artists || "",
      errors: props.errors || []
    }
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

  composeErrorList(errors) {
    if (!errors || !errors.length) return null;

    const errorItems = errors.map(function(error, index) {
      return <li key={index}>{error}</li>
    });

    return <ul>{errorItems}</ul>;
  }

  composeArtistList(artists, format) {
    return (
      <ArtistsList
        artists={artists}
        albumArtists={this.props.album.artists}
        className="album-artists"
        format={format}
        ref={(artists) => this.artistsComponent = artists} />
    );
  }

  getRequestData(obj) {
    return {
      album: {
        id: obj.id,
        name: obj.name,
        avatar: obj.avatar,
        tracks_attributes: this.props.track_ids || this.tracksFormComponent.getTrackObjects(),
        artist_ids: this.props.artist_ids || this.artistsComponent.getSelectedArtistIds()
      }
    };
  }

  render() {
    const errors = this.composeErrorList(this.state.errors);
    const formArtists = this.composeArtistList(this.props.artists, "ul");
    const tracks = <TracksForm album={this.props.album} ref={(form) => this.tracksFormComponent = form}/>;

    return (
      <form ref={(form) => { this.formComponent = form; }}>
        {errors}
        <div>
          <label>Name</label>
          <input type="text" name="name" value={this.props.name} onChange={this.handleChange}/>
        </div>
        <div>
          <div style={{backgroundSize: 'cover', backgroundImage: `url('${this.state.avatar}')`, width: "200px", height: "200px" }} />
          <label>Avatar</label>
          <input type="file" name="avatar" onChange={this.handleFileUpload("avatar")}/>
        </div>
        <div>
          <label>Artists</label>
          {formArtists}
        </div>
        {tracks}
        <div>
          <input type="submit" value="Save" onClick={this.handleSubmit} />
          <a onClick={this.handleDelete}>Delete</a>
          <a onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    );
  }
};

class Album extends BaseResource {
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

export { Album as default, AlbumNew, ALBUM_PROP_TYPES };
