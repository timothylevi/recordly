import React from 'react';
import { ResourceForm } from '../shared';

export default class ArtistResourceForm extends ResourceForm {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '/images/missing_artist.png',
    errors: [],
  };

  constructor(props) {
    super(props);

    this.resource = 'artist';
    this.state = {
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      errors: props.errors,
    };
  }

  resetForm() {
    this.setState({
      id: '',
      name: '',
      avatar: '',
    });
  }

  buildRequestData() {
    return {
      artist: {
        id: this.state.id,
        name: this.state.name,
        avatar: this.state.avatar,
      },
    };
  }

  render() {
    const isInPage = this.props.container === "page";

    const name = this.state.name;
    const avatar = this.state.avatar;

    return (
      <form className="artist-form" ref={(form) => { this.formComponent = form; }}>
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
          {isInPage ? null : (
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
            style={{ backgroundImage: `url('${avatar}')` }}
            title="Upload avatar"
          >
            <i className="fa fa-upload avatar-preview-icon" />
            <span className="no-web">Upload avatar</span>
          </button>
          <input
            className="avatar-input"
            id={`artist-avatar-${this.state.id}`}
            type="file"
            name="avatar"
            onChange={this.handleFileUpload('avatar')}
          />
        </div>
        <div className="item-name">
          <img className="name-background" src={this.state.avatar} />
          <label className="name-label no-web" htmlFor={`artist-name-${this.state.id}`} placeholder="Name">Name</label>
          <input className="name-input" id={`artist-name-${this.state.id}`} placeholder="Name" type="text" name="name" value={name} onChange={this.handleChange} />
          <input type="submit" style={{ display: 'none' }} onClick={this.handleSubmit} />
        </div>
        {this.composeErrorList(this.state.errors)}
      </form>
    );
  }
}
