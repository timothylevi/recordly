import React, { PropTypes } from 'react';
import { BaseResource } from './Base.jsx';
import Albums, { ALBUMS_PROP_TYPES } from './Albums.jsx';

const ARTIST_PROP_TYPES = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  deleted: PropTypes.bool,
  selected: PropTypes.bool
});

class Artist extends BaseResource {
  static propTypes = {
    // Configuration
    // container: PropTypes.string,
    // form: PropTypes.bool,
    // disableArtistEdit: PropTypes.bool,
    // disbableSelect: PropTypes.bool,
    //
    // // Handlers
    // handleResourceAdd: PropTypes.func,
    // handleResourceDelete: PropTypes.func,
    // handleResourceSelect: PropTypes.func,

    // Data
    // artist: ARTIST_PROP_TYPES,
    // albums: ALBUMS_PROP_TYPES
  };

  static defaultProps = {
    form: false,
    disableArtistEdit: false,
    disableArtists: false,
    disableEdit: false
   };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      // Config
      form: props.form || false,

      // Data
      id: props.artist.id || "",
      name: props.artist.name || "",
      avatar: props.artist.avatar || ""
    };

    this.resource = "artist";

    // Refs
    this.formComponent = {};
  }

  resetForm() {
    this.setState({
      id: "",
      name: "",
      avatar: "",
      form: true
    });
  }

  getRequestData(obj) {
    return {
      id: obj.id,
      name: obj.name,
      avatar: obj.avatar
    };
  }

  render() {
    if (this.props.artist.deleted) return null;

    const id = this.state.id;
    const name = this.state.name;
    const avatar = this.state.avatar;
    const errors = this.composeErrorList(this.state.errors);
    const albums = (
      <Albums
        disableArtists={this.props.disableArtists}
        albums={this.props.artist.albums}
        album={{}}
        artist_ids={[this.state.id]}
      />
    );

    if (this.state.form) debugger;

    if (this.state.form && !this.props.disableEdit) {
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
            <input type="submit" value="Save" onClick={this.handleSubmit} />
            <a onClick={this.handleDelete}>Delete</a>
            <a onClick={this.handleCancel}>Cancel</a>
          </div>
        </form>
      );
    }

    return (
      <div>
        <div style={{backgroundSize: 'cover', backgroundImage: `url('${avatar}')`, width: "200px", height: "200px" }} />
        Name: {name}
        { this.props.disableArtistEdit ? null : <a onClick={this.handleEdit}>Edit</a> }
        { this.props.disableSelect ? null : <a onClick={this.handleSelect}>Select</a> }
        {/* TODO: Show albums and tracks here by config */}
        { this.props.artist.selected ? 'Selected' : null }
        { this.props.artist.selected && !this.props.disableAlbums ? albums : null}
      </div>
    );
  }
}

export { Artist as default, ARTIST_PROP_TYPES };
