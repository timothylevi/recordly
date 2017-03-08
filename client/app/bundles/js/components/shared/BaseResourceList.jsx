import React from 'react';
import { registerHandlers } from '../../helpers';

export default class BaseResourceList extends React.Component {
  constructor(props) {
    super(props);

    registerHandlers.call(this, [
      "handleResourceAdd",
      "handleResourceDelete",
      "handleResourceSelect"
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
    const resources = this.state[this.resource].map(function(resource) {
      if (resource.id === objId) {
        resource.selected = !resource.selected;
      }

      return resource;
    });

    this.setState({ [this.resource]: resources });
  }

  handleResourceSelectWithId(objId) {
    function partialHandleResourceSelect(event) {
      return this.handleResourceSelect(objId);
    }

    return partialHandleResourceSelect.bind(this);
  }
};
