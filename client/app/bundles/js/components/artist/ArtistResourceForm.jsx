import React from 'react';
import { Resource } from '../shared/Base.jsx';

export default class ArtistResourceForm extends Resource {
  constructor(props) {
    super(props)

    this.state = {
      id: props.id || "",
      name: props.name || "",
      avatar: props.avatar || "",
      errors: props.errors || []
    };
  }

  render() {
    const name = this.state.name;
    const avatar = this.state.avatar;
    const errors = this.composeErrorList(this.state.errors);

    return (
      <form>
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
          <input type="submit" value="Save" onClick={this.handleSubmit} />
          <a onClick={this.handleDelete}>Delete</a>
          <a onClick={this.handleCancel}>Cancel</a>
        </div>
      </form>
    );
  }
}
