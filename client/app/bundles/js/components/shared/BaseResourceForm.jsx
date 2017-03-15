import React, { PropTypes } from 'react';
import { bindHandlers, blankFunction } from '../../helpers';
import * as stateFunctions from '../../state-functions';

export default class BaseResource extends React.Component {
  static propTypes = {
    handleResourceCancel: PropTypes.func,
    handleResourceDelete: PropTypes.func,
    handleResourceAdd: PropTypes.func,
    handleResourceUpdate: PropTypes.func,
  };

  static defaultProps = {
    handleResourceCancel: blankFunction,
    handleResourceDelete: blankFunction,
    handleResourceAdd: blankFunction,
    handleResourceUpdate: blankFunction,
  };

  static getHandleRequestSuccess(callback) {
    function handleSuccess(data) {
      function callCallback() { if (callback) callback(data); }
      this.setState(stateFunctions.setErrorsOrData(this.state, data), callCallback);
    }

    return handleSuccess;
  }

  constructor(props) {
    super(props);

    bindHandlers.call(this, [
      'handleCancel',
      'handleChange',
      'handleDelete',
      'handleFileUpload',
      'handleSubmit',
      'handleUploadLabelClick',
    ]);
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

    this.setState(stateFunctions.setFormInputValue(this.state, event.target));
  }

  handleDelete(event) {
    event.preventDefault();
    event.stopPropagation();

    function callback() {
      this.props.handleResourceDelete(this.state.id);
    }

    const saved = true;
    const form = this.buildRequestData();
    const request = this.buildRequestOptions('delete', form, saved, callback.bind(this));

    $.ajax(request);
  }

  handleFileUpload(elName) {
    function fileUploadHandler() {
      const reader = new FileReader();
      const file = this.formComponent.elements[elName].files[0];

      function onLoad() {
        const target = { name: elName, value: reader.result };
        this.setState(stateFunctions.setFormInputValue(this.state, target));
      }

      reader.addEventListener('load', onLoad.bind(this), false);
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
    }

    function update(data) {
      this.props.handleResourceUpdate(data);
    }

    const form = this.buildRequestData(this.state);
    const saved = !!form[this.resource].id;
    const type = saved ? 'PATCH' : 'POST';
    const callback = saved ? update : create;
    const request = this.buildRequestOptions(type, form, saved, callback.bind(this));

    $.ajax(request);
  }


  handleUploadLabelClick(event) {
    event.preventDefault();

    $(`#${this.resource}-avatar-${this.state.id}`).trigger('click');
  }

  composeErrorList(errors) {
    if (!errors || !errors.length) return null;

    function composeErrorItem(error, index) {
      return (
        <li className="error-item" key={index}>
          {error}
        </li>
      );
    }

    return (
      <ul className="error-list">
        {errors.map(composeErrorItem.bind(this))}
      </ul>
    );
  }

  buildRequestOptions(type, form, saved, callback) {
    // TODO: Error handling from server and work on callback
    const resource = this.resource;

    const request = {
      type,
      success: this.getHandleRequestSuccess(callback).bind(this),
      error: this.getHandleRequestSuccess(callback).bind(this),
      dataType: 'json',
      contentType: 'application/json',
      url: saved ? `/${resource}s/${form[resource].id}` : `/${resource}s`,
    };

    if (form[resource].avatar && !form[resource].avatar.includes('data:image')) {
      delete form[resource].avatar;
    }

    request.data = JSON.stringify(form);

    return request;
  }
}
