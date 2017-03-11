import React from 'react';
import { ResourceForm } from '../shared';
import { ResourceListForm as ArtistListForm } from '../artist';
import { ResourceListForm as TrackListForm } from '../track/';

export default class AlbumResourceForm extends ResourceForm {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '/images/missing_album.png',
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
      avatar: this.props.avatar,
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
        <TrackListForm
          tracks={this.props.tracks}
          ref={form => this.tracksFormComponent = form}
        />
      </div>
    );
  }

  render() {
    const isInPage = this.props.container === "page";
    const isInArtistContainer = this.props.container === 'artist';

    const artistsField = this.composeArtistsField(isInArtistContainer);
    const trackFields = this.composeTrackFields();

    return (
      <form
        className="album-form"
        onClick={this.handleFormClick}
        ref={(form) => { this.formComponent = form; }}
      >
        {this.state.id ? null : <h4 className="item-new-title">New {this.resource}</h4>}
        <div className="item-row">
          <div className="item-controls">
            <button
              className="item-control item-control-save"
              type="submit"
              onClick={this.handleSubmit}
              title={`Save ${isInPage ? "new " : ""}${this.resource}`}>
              <i className="fa fa-floppy-o" />
              <span className="no-web">Save</span>
            </button>
            {isInPage ? null : (
              <button
                className="item-control item-control-delete"
                onClick={this.handleDelete}
                title={`Delete ${this.resource}`}>
                <i className="fa fa-trash-o" />
                <span className="no-web">Delete</span>
              </button>
            )}
            <button
              onClick={this.handleUploadLabelClick}
              className="item-control item-control-upload-avatar"
              title="Upload avatar" >
              <i className="fa fa-upload" />
              <span className="no-web">Upload avatar</span>
            </button>
            {!this.state.id ? null : (
              <button
                className="item-control item-control-cancel"
                onClick={this.handleCancel}
                title="Cancel edit">
                <i className="fa fa-times" />
                <span className="no-web">Cancel</span>
              </button>
            )}
          </div>
          <div className="item-avatar">
            <button
              className="avatar-preview"
              onClick={this.handleUploadLabelClick}
              style={{ backgroundImage: `url('${this.state.avatar}')` }}
              title="Upload avatar"
            >
              <i className="fa fa-upload avatar-preview-icon" />
              <span className="no-web">Upload avatar</span>
            </button>
            <input
              className="avatar-input"
              id={`album-avatar-${this.state.id}`}
              type="file"
              name="avatar"
              onChange={this.handleFileUpload('avatar')}
            />
          </div>
          <div className="item-name">
            <img className="name-background" src={this.state.avatar} />
            <label className="name-label no-web" htmlFor={`album-name-${this.state.id}`} placeholder="Name">Name</label>
            <input className="name-input" id={`album-name-${this.state.id}`} placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <input type="submit" style={{ display: 'none' }} onClick={this.handleSubmit} />
          </div>
        </div>
        <div className="item-associations item-row">
          {trackFields}
          {artistsField}
        </div>
        {this.composeErrorList(this.state.errors)}
      </form>
    );
  }
}
