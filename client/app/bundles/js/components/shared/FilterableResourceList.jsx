import React from 'react';
import BaseResourceList from './BaseResourceList';
import { registerHandlers } from '../../helpers';

export default class FilterableResourceList extends BaseResourceList {
  constructor(props) {
    super(props);

    this.resourcesFilterMask = {};

    this.state = { resourcesFilteredList: [] };
    registerHandlers.call(this, ['handleFilter']);
  }

  handleFilter(event) {
    event.preventDefault();

    const resourcesFilterMask = this.resourcesFilterMask.value.toLowerCase();
    function nameIncludesFilterMask(resource) {
      return resource.name.toLowerCase().includes(resourcesFilterMask);
    }

    this.setState({
      filteredResources: this.state[this.resource].filter(nameIncludesFilterMask),
    });
  }

  composeResourceFilter(disable) {
    if (disable) return null;

    function setResourcesFilterMask(resourcesFilterMask) {
      this.resourcesFilterMask = resourcesFilterMask;
    }

    const resources = this.state.filteredResources;
    const filteredResources = this.composeResourceList(!this.resourcesFilterMask.value, resources);

    return (
      <div className="resources-filter">
        <input
          type="search"
          placeholder={`Search ${this.resource} by name or title`}
          onChange={this.handleFilter}
          className="resources-filter-mask"
          ref={setResourcesFilterMask.bind(this)}
        />
        {filteredResources}
      </div>
    );
  }
}
