import React from 'react';

export function registerHandlers(handlers) {
  for (var i = 0; i < handlers.length; i++) {
    this[handlers[i]] = this[handlers[i]].bind(this);
  }
}

export class Page extends React.Component {
  render() {
    return (
      <main className={this.props.className + " page"}>
        <h2 className="page-title">{this.props.title}</h2>
        {this.props.children}
      </main>
    );
  }
}

export class BaseResourceList extends React.Component {
  constructor(props) {
    super(props);

    this.filterMask = {};

    registerHandlers.call(this, [
      "handleResourceAdd",
      "handleResourceDelete",
      "handleResourceSelect",
      "handleFilter"
    ]);
  }

  handleResourceAdd(object) {
    const resources = this.state[this.resource];
    resources.push(object);

    this.setState({ [this.resource]: resources });
  }

  handleResourceDelete(objId) {
    const resources = this.state[this.resource].map(function(resource) {
      if (resource.id === objId) resource.deleted = true;

      return resource;
    });

    this.setState({ [this.resource]: resources });
  }

  handleResourceSelect(objId) {
    debugger;
    const resources = this.state[this.resource].map(function(resource) {
      if (resource.id === objId) {
        resource.selected = !resource.selected;
      }

      return resource;
    });

    this.setState({ [this.resource]: resources });
  }

  handleFilter(event) {
    event.preventDefault();
    const filterMask = this.filterMask.value.toLowerCase();
    const resources = this.state[this.resource].filter(function(resource) {
      return resource.name.toLowerCase().includes(filterMask);
    });

    this.setState({ filteredResources: resources });
  }

  getResourceFilter(resources) {
    if (this.props.disableFilter) return;

    const filteredResources = this.filterMask.value ? this.composeResourceList(this.state.filteredResources) : null;

    return (
      <div className="resources-filter">
        <input
          type="search"
          name="filter"
          placeholder={`Filter ${this.resource}`}
          onChange={this.handleFilter}
          className="resources-filter-input"
          ref={(filterMask) => { this.filterMask = filterMask; }}/>
        <ul className="resources-filtered-list">{filteredResources}</ul>
      </div>
    );
  }

  composeResourceList(resources) {
    // Implement in sub classes
  }

};

export class BaseResource extends React.Component {
  constructor(props, _railsContext) {
    super(props)

    registerHandlers.call(this, [
      "handleCancel",
      "handleChange",
      "handleDelete",
      "handleEdit",
      "handleFileUpload",
      "handleSelect",
      "handleSubmit"
    ]);
  }

  handleCancel(event) {
    event.preventDefault();

    if (this.state.id) {
      this.setState({ form: false });
    } else {
      this.resetForm();
    }
  }

  handleChange(event) {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete(event) {
    event.preventDefault();

    function callback(data) {
      this.props.handleResourceDelete(this.state.id);
    }
    const form = this.getRequestData(this.state);
    const request = this.getRequestOptions('delete', form, callback.bind(this));

    $.ajax(request);
  }

  handleEdit(event) {
    event.preventDefault();

    this.setState({ form: true });
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

  handleSelect(event) {
    event.preventDefault();

    this.props.handleResourceSelect(this.state.id);
  }

  handleSubmit(event) {
    event.preventDefault();

    function create(data) {
      this.resetForm();
      this.props.handleResourceAdd(data);
    };
    function update(data) {};

    const form = this.getRequestData(this.state);
    const type = form.id ? 'PATCH' : 'POST';
    const callback = form.id ? update : create;
    const request = this.getRequestOptions(type, form, callback.bind(this));

    $.ajax(request);
  }

  getRequestOptions(type, form, callback) {
    // TODO: Error handleing from server
    const resource = this.resource;
    const resources = resource + "s";

    const request = {
      type: type,
      success: success.bind(this),
      error: success.bind(this),
      dataType: 'json',
      url: form.id ? `/${resources}/${form.id}`: `/${resources}`
    };

    if (form.avatar && !form.avatar.includes('data:image')) {
      delete form.avatar;
    }

    function success(data, err) {
      // TODO: Refactor
      if (data.errors.length) {
        data.avatar = this.state.avatar;
        this.setState(data);
      } else {
        data.form = false;
        this.setState(data, function() {
          if (callback) callback(data);
        });
      }
    };

    request.data = { [resource]: form };

    return request;
  }

  composeErrorList(errors) {
    if (!errors || !errors.length) return null;

    const errorItems = errors.map(function(error, index) {
      return <li key={index}>{error}</li>
    });

    return <ul>{errorItems}</ul>;
  }

}
