import React from 'react';
import { registerHandlers } from '../../helpers';

export default class BaseResourceList extends React.Component {
  constructor(props) {
    super(props);

    registerHandlers.call(this, [
      'handleResourceAdd',
      'handleResourceDelete',
      'handleResourceSelect',
    ]);
  }

  handleResourceAdd(object) {
    const resources = this.state[this.resource];
    resources.push(object);

    this.setState({ [this.resource]: resources });
  }

  handleResourceDelete(objId) {
    function getOrDeleteResource(resource) {
      return (resource.id === objId) ?
        { ...resource, deleted: true } :
        resource;
    }

    const resources = this.state[this.resource].map(getOrDeleteResource);
    this.setState({ [this.resource]: resources });
  }

  handleResourceSelect(objId) {
    function getOrSelectResource(resource) {
      return (resource.id === objId) ?
        { ...resource, selected: !resource.selected } :
        resource;
    }

    const resources = this.state[this.resource].map(getOrSelectResource);
    this.setState({ [this.resource]: resources });
  }

  handleResourceSelectWithId(objId) {
    function partialHandleResourceSelect() {
      return this.handleResourceSelect(objId);
    }

    return partialHandleResourceSelect.bind(this);
  }
}
