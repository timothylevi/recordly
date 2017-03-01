import React, { PropTypes } from 'react';

export default class Artist extends React.Component {
  static propTypes = {
    // Configuration
    container: PropTypes.string,
    form: PropTypes.bool,

    // Handlers
    handleArtistAdd: PropTypes.func,
    handleArtistDelete: PropTypes.func,
    handleArtistSelect: PropTypes.func,

    // Data
    artist: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      deleted: PropTypes.bool,
      selected: PropTypes.bool,
      created_at: PropTypes.string,
      updated_at: PropTypes.string
    })
  };

  static defaultProps = {
    form: false
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      form: props.form || false,
      id: props.artist.id || "",
      name: props.artist.name || "",
      avatar: props.artist.avatar || ""
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState({ form: false });
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete(event) {
    event.preventDefault();
    const _this = this;

    const form = this.normalizeForm(_this.state);
    $.ajax(this.getRequest('DELETE', form, function(data) {
      _this.props.handleArtistDelete(_this.state.id);
    }));
  }

  handleEdit(event) {
    event.preventDefault();

    this.setState({ form: true });
  }

  handleFileUpload(elName) {
    const _this = this;
    return function(event) {
      const file = _this.form.elements[elName].files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function() {
        _this.setState({
          [elName]: reader.result
        });
      }, false);

      if (file) {
        reader.readAsDataURL(file)
      };
    }
  }

  handleSelect(event) {
    event.preventDefault();

    this.props.handleArtistSelect(this.state.id);
  }

  handleSubmit(event) {
    event.preventDefault();
    const _this = this;

    const form = this.normalizeForm(this.state);
    const type = form.id ? 'PATCH' : 'POST';
    const callback = form.id ? null : function(data) {
      _this.resetForm();
      _this.props.handleArtistAdd(data);
    };

    $.ajax(this.getRequest(type, form, callback));
  }

  normalizeForm(obj) {
    return {
      id: obj.id,
      name: obj.name,
      avatar: obj.avatar
    };
  }

  getErrorList(errors) {
    if (!errors || !errors.length) return null;

    const errorItems = errors.map(function(error, index) {
      return <li key={index}>{error}</li>
    });

    return <ul>{errorItems}</ul>;
  }

  getRequest(type, form, callback) {
    const _this = this;

    const request = {
      type: type,
      success: success,
      error: success,
      dataType: 'json',
      url: form.id ? `/artists/${form.id}`: `/artists`
    };

    if (!form.avatar.includes('data:image')) {
      delete form.avatar;
    }

    function success(data, err) {
      // TODO: Refactor
      if (data.errors.length) {
        data.avatar = _this.state.avatar;
        _this.setState(data);
      } else {
        data.form = false;
        _this.setState(data, function() {
          if (callback) callback(data);
        });
      }

    };

    request.data = { 'artist': form };

    return request;
  }

  resetForm() {
    this.setState({
      id: "",
      name: "",
      avatar: "",
      form: true
    });
  }

  render() {
    if (this.props.artist.deleted) return null;

    const id = this.state.id;
    const name = this.state.name;
    const avatar = this.state.avatar;
    const errors = this.getErrorList(this.state.errors);

    switch (this.state.form) {
      case true:
        return (
          <form ref={(form) => { this.form = form; }}>
            {errors}
            <div>
              <label htmlFor="artist_name">Name</label>
              <input type="text" name="name" value={name} onChange={this.handleChange}/>
            </div>
            <div>
              <div style={{backgroundSize: 'cover', backgroundImage: `url('${avatar}')`, width: "200px", height: "200px" }} />
              <label htmlFor="artist_avatar">Avatar</label>
              <input type="file" name="avatar" onChange={this.handleFileUpload("avatar")}/>
            </div>
            <div>
              <input type="submit" value="Save" onClick={this.handleSubmit} />
              <a onClick={this.handleDelete}>Delete</a>
              <a onClick={this.handleCancel}>Cancel</a>
            </div>
          </form>
        )
        break;

      default:
        return (
          <div>
            <a onClick={this.handleEdit}>Edit</a>
            <a onClick={this.handleSelect}>Select</a>
            Name: {name}
            <div style={{backgroundSize: 'cover', backgroundImage: `url('${avatar}')`, width: "200px", height: "200px" }} />
            { this.props.artist.selected ? "I'm selected!" : null}
          </div>
        );
        break;
    }
  }
}
