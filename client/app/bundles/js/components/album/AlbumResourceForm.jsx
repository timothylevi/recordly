import React from 'react';
import { Resource } from '../shared/Base.jsx';
import { ResourceList as ArtistList } from '../artist/Artist.jsx';
import TrackForm from '../track/Tracks.jsx';

export default class AlbumResourceForm extends Resource {
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

  composeArtistList(artists, format) {
    return (
      <ArtistList
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
    const tracks = <TrackForm album={this.props.album} ref={(form) => this.tracksFormComponent = form}/>;

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
