import React from 'react';
import { registerHandlers } from '../../helpers';

export default class BaseResourceListForm extends React.Component {
  constructor(props) {
    super(props)
  }

  mergeSelected(selectedResources, resources) {
    if (!resources) return [];
    if (!selectedResources) return resources;

    function addResourceToHash(hsh, obj) {
      obj.selected = true;
      hsh[obj.id] = obj;
      return hsh;
    }

    function getLatestResource(resource) {
      return this.hasOwnProperty(resource.id) ? this[resource.id] : resource;
    }

    const resourcesHash = selectedResources.reduce(addResourceToHash, {});
    return resources.map(getLatestResource.bind(resourcesHash));
  }
}
