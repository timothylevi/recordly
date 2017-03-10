import React from 'react';
import { ResourceForm } from '../shared';

export default class ArtistResourceForm extends ResourceForm {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '',
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
    const name = this.state.name;
    const avatar = this.state.avatar;

    return (
      <form className="artist-form" ref={(form) => { this.formComponent = form; }}>
        {this.composeErrorList(this.state.errors)}
        <div className="artist-name">
          <label className="artist-name-label" htmlFor={`artist-name-${this.state.id}`}>Name</label>
          <input className="artist-name-input" id={`artist-name-${this.state.id}`} type="text" name="name" value={name} onChange={this.handleChange} />
        </div>
        <div className="artist-avatar">
          <div className="artist-avatar-preview" style={{ backgroundImage: `url('${avatar}')` }} />
          <label className="artist-avatar-label" htmlFor={`artist-avatar-${this.state.id}`}>Avatar</label>
          <input className="artist-avatar-input" id={`artist-avatar-${this.state.id}`} type="file" name="avatar" onChange={this.handleFileUpload('avatar')} />
        </div>
        <div className="artist-controls">
          <input className="artist-controls-save" type="submit" value="Save" onClick={this.handleSubmit} />
          <a className="artist-controls-delete" onClick={this.handleDelete}>Delete</a>
          <a className="artist-controls-cancel" onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    );
  }
}
