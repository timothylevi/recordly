import React from 'react';
import { ResourceForm } from '../shared';
import { ResourceListForm as ArtistListForm } from '../artist';
import { ResourceListForm as TrackListForm } from '../track/';

export default class AlbumResourceForm extends ResourceForm {
  static defaultProps = {
    id: "",
    name: "",
    avatar: "",
    artists: "",
    errors: []
  };

  constructor(props) {
    super(props);

    this.resource = "album";
    this.state = {
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      artists: props.artists,
      errors: props.errors
    }
  }

  resetForm() {
    this.setState({
      id: "",
      name: "",
      avatar: "",
      artists: this.props.artists
    }, function() {
      this.artistsFormComponent.resetForm();
      this.tracksFormComponent.resetForm();
    });
  }

  buildRequestData(obj) {
    return {
      album: {
        id: obj.id,
        name: obj.name,
        avatar: obj.avatar,
        tracks_attributes: this.tracksFormComponent.getRequestData() || [],
        artist_ids: this.artistsFormComponent.getRequestData() || []
      }
    };
  }

  composeArtistsField(artists, disable) {
    return disable ? null : (
      <div className="album-artists">
        <label className="album-artists-label">Artists</label>
        <ArtistListForm artists={artists} ref={(form) => this.artistsFormComponent = form} />
      </div>
    );
  }

  composeTrackFields(tracks, disable) {
    return disable ? null : (
      <div className="album-tracks">
        <label className="album-tracks-label">Tracks</label>
        <TrackListForm ref={(form) => this.tracksFormComponent = form} />
      </div>
    );
  }

  render() {
    const artistsField = this.composeArtistsField(this.props.artists, this.props.container === "artist")
    const trackFields = this.composeTrackFields();

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
        {trackFields}
        <div className="album-controls">
          <input className="album-controls-save" type="submit" value="Save" onClick={this.handleSubmit} />
          <a className="album-controls-delete" onClick={this.handleDelete}>Delete</a>
          <a className="album-controls-cancel" onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    );
  }
};
