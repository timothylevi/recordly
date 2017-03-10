import React from 'react';

export default class BaseResourceListForm extends React.Component {
  mergeSelected(selectedResources, resources) {
    if (!resources) return [];
    if (!selectedResources) return resources;

    function addResourceToHash(hsh, obj) {
      obj.selected = true;
      hsh[obj.id] = obj;
      return hsh;
    }

    function getLatestResource(resource) {
      return this[resource.id] ? this[resource.id] : resource;
    }

    const resourcesHash = selectedResources.reduce(addResourceToHash, {});
    return resources.map(getLatestResource.bind(resourcesHash));
  }
}
