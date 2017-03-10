import React from 'react';
import { ResourceForm } from '../shared';
import { ResourceListForm as ArtistListForm } from '../artist';
import { ResourceListForm as TrackListForm } from '../track/';

export default class AlbumResourceForm extends ResourceForm {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '',
    artists: '',
    errors: [],
  };

  constructor(props) {
    super(props);

    this.resource = 'album';
    this.state = {
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      artists: props.artists,
      errors: props.errors,
    };
  }

  resetForm() {
    function resetChildForms() {
      this.artistsFormComponent.resetForm();
      this.tracksFormComponent.resetForm();
    }

    this.setState({
      id: '',
      name: '',
      avatar: '',
      artists: this.props.artists,
    }, resetChildForms);
  }

  buildRequestData(obj) {
    return {
      album: {
        id: obj.id,
        name: obj.name,
        avatar: obj.avatar,
        tracks_attributes: this.tracksFormComponent.getRequestData() || [],
        artist_ids: this.artistsFormComponent.getRequestData() || [],
      },
    };
  }

  composeArtistsField(disable) {
    return disable ? null : (
      <div className="album-artists">
        <h3 className="album-artists-title">
          Artists
        </h3>
        <ArtistListForm
          artists={this.props.artists}
          formArtists={this.props.formArtists}
          ref={form => this.artistsFormComponent = form}
        />
      </div>
    );
  }

  composeTrackFields(disable) {
    return disable ? null : (
      <div className="album-tracks">
        <h3 className="album-tracks-title">Tracks</h3>
        <TrackListForm
          tracks={this.props.tracks}
          ref={form => this.tracksFormComponent = form}
        />
      </div>
    );
  }

  render() {
    const isInArtistContainer = this.props.container === 'artist';
    const artistsField = this.composeArtistsField(isInArtistContainer);
    const trackFields = this.composeTrackFields();

    return (
      <form
        className="album-form"
        onClick={this.handleFormClick}
        ref={(form) => { this.formComponent = form; }}
      >

        {this.composeErrorList(this.state.errors)}

        <div className="album-name">
          <label
            className="album-name-label"
            htmlFor={`album-name-${this.state.id}`}
          >
            Name
          </label>
          <input
            className="album-name-input"
            id={`album-name-${this.state.id}`}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div className="album-avatar">
          <div
            className="album-avatar-preview"
            style={{ backgroundImage: `url('${this.state.avatar}')` }}
          />
          <label
            className="album-avatar-label"
            htmlFor={`album-avatar-${this.state.id}`}
          >
            Avatar
          </label>
          <input
            className="album-avatar-input"
            id={`album-avatar-${this.state.id}`}
            type="file"
            name="avatar"
            onChange={this.handleFileUpload('avatar')}
          />
        </div>
        {artistsField}
        {trackFields}
        <div className="album-controls">
          <input
            className="album-controls-save"
            type="submit"
            value="Save"
            onClick={this.handleSubmit}
          />
          <a className="album-controls-delete" onClick={this.handleDelete}>
            Delete
          </a>
          <a className="album-controls-cancel" onClick={this.handleCancel}>
            Cancel
          </a>
        </div>
      </form>
    );
  }
}
