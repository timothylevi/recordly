import React from 'react';
import { registerHandlers } from '../../helpers';

export default class BaseResource extends React.Component {
  constructor(props, _railsContext) {
    super(props)

    registerHandlers.call(this, [
      "handleCancel",
      "handleChange",
      "handleDelete",
      "handleFileUpload",
      "handleSubmit"
    ]);
  }

  composeErrorList(errors) {
    if (!errors || !errors.length) return null;

    function composeErrorItem(error, index) {
      return <li className={this.resource + "-error-item"} key={index}>{error}</li>
    }

    return (
      <ul className={this.resource + "-error-list"}>
        {errors.map(composeErrorItem.bind(this))}
      </ul>
    );
  }

  handleCancel(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.id) {
      this.props.handleResourceCancel();
    } else {
      this.resetForm();
    }
  }

  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete(event) {
    event.preventDefault();
    event.stopPropagation();

    function callback(data) {
      this.props.handleResourceDelete(this.state.id);
    }
    const form = this.buildRequestData(this.state);
    const saved = true;
    const request = this.buildRequestOptions('delete', form, saved, callback.bind(this));

    $.ajax(request);
  }

  handleFileUpload(elName) {
    function fileUploadHandler(event) {
      const reader = new FileReader();
      const file = this.formComponent.elements[elName].files[0];

      function onLoad() {
        this.setState({ [elName]: reader.result });
      }

      reader.addEventListener("load", onLoad.bind(this), false);
      if (file) reader.readAsDataURL(file);
    }

    return fileUploadHandler.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    function create(data) {
      this.resetForm();
      this.props.handleResourceAdd(data);
    };
    function update(data) {
      this.props.handleResourceUpdate(data);
    };

    const form = this.buildRequestData(this.state);
    const saved = !!form[this.resource].id
    const type = saved ? 'PATCH' : 'POST';
    const callback = saved ? update : create;
    const request = this.buildRequestOptions(type, form, saved, callback.bind(this));

    $.ajax(request);
  }

  handleFormClick(event) {
    event.stopPropagation();
  }

  buildRequestOptions(type, form, saved, callback) {
    // TODO: Error handling from server
    const resource = this.resource;

    const request = {
      type: type,
      success: success.bind(this),
      error: success.bind(this),
      dataType: 'json',
      contentType: 'application/json',
      url: saved ? `/${resource}s/${form[resource].id}`: `/${resource}s`
    };

    if (form[resource].avatar && !form[resource].avatar.includes('data:image')) {
      delete form[resource].avatar;
    }

    function success(data, err) {
      // TODO: Refactor
      if (data.errors.length) {
        this.setState({...data, avatar: this.state.avatar});
      } else {
        this.setState({...data}, function() {
          if (callback) callback(data);
        });
      }
    };

    request.data = JSON.stringify(form);

    return request;
  }
}
