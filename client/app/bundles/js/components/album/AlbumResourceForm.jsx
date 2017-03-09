import React from 'react';
import { Resource, ResourceForm } from '../shared';
import { ResourceList as ArtistList } from '../artist';
// import { TrackList } from '../track/Tracks.jsx';

export default class AlbumResourceForm extends ResourceForm {
  constructor(props) {
    super(props);

    this.resource = "album";
    this.state = {
      id: props.id || "",
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
      artists: this.props.album.artists
    });
  }

  composeArtistList(artists, format) {
    return []//(
  //     <ArtistList
  //       artists={artists}
  //       albumArtists={this.props.album.artists}
  //       className="album-artists"
  //       format={format}
  //       ref={(artists) => this.artistsComponent = artists} />
  //   );
  }

  buildRequestData(obj) {
    return {
      album: {
        id: obj.id,
        name: obj.name,
        avatar: obj.avatar,
        // tracks_attributes: this.props.track_ids || this.tracksFormComponent.getTrackObjects(),
        // artist_ids: this.props.artist_ids || this.artistsComponent.getSelectedArtistIds()
      }
    };
  }

  composeArtistField(artists, disable) {
    return disable ? null : (
      <div className="album-artists">
        <label className="album-artists-label">Artists</label>
        <ArtistList artists={artists} />
      </div>
    );
  }

  render() {
    const artistsField = this.composeArtistField(this.props.artists, this.props.container === "artist")
    // const formArtists = this.composeArtistList(this.props.artists, "ul");
    // const tracks = <TrackForm album={this.props.album} ref={(form) => this.tracksFormComponent = form}/>;

    return (
      <form className="album-form" onClick={this.handleFormClick} ref={(form) => { this.formComponent = form; }}>
        {this.composeErrorList(this.state.errors)}
        <div className="album-name">
          <label className="album-name-label">Name</label>
          <input className="album-name-input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="album-avatar">
          <div className="album-avatar-preview" style={{backgroundImage: `url('${this.state.avatar}')`}} />
          <label className="album-avatar-label" >Avatar</label>
          <input className="album-avatar-input"  type="file" name="avatar" onChange={this.handleFileUpload("avatar")}/>
        </div>
        {artistsField}
        {/*tracks*/}
        <div className="album-controls">
          <input className="album-controls-save" type="submit" value="Save" onClick={this.handleSubmit} />
          <a className="album-controls-delete" onClick={this.handleDelete}>Delete</a>
          <a className="album-controls-cancel" onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    );
  }
};
