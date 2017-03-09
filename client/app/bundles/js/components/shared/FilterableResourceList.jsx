import React from 'react';
import BaseResourceList from './BaseResourceList';
import { registerHandlers } from '../../helpers';

export default class FilterableResourceList extends BaseResourceList {
  constructor(props) {
    super(props);

    this.resourcesFilterMask = {};

    this.state = {
      resourcesFilteredList: []
    };

    registerHandlers.call(this, [
      "handleFilter"
    ]);
  }

  handleFilter(event) {
    event.preventDefault();
    const resourcesFilterMask = this.resourcesFilterMask.value.toLowerCase();
    const resources = this.state[this.resource].filter(function(resource) {
      return resource.name.toLowerCase().includes(resourcesFilterMask);
    });
    this.setState({ filteredResources: resources });
  }

  composeResourceFilter(resources) {
    if (this.props.disableFilter) return;

    const filteredResources = this.composeResourceList(this.state.filteredResources, !this.resourcesFilterMask.value);

    return (
      <div className="resources-filter">
        <input
          type="search"
          placeholder={`Search ${this.resource}`}
          onChange={this.handleFilter}
          className="resources-filter-mask"
          ref={(resourcesFilterMask) => { this.resourcesFilterMask = resourcesFilterMask; }}/>
        {filteredResources}
      </div>
    );
  }

  composeResourceList(resources) {
    // Implement in sub classes
  }
};
