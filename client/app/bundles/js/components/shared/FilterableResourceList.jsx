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

  getResourceFilter(resources) {
    if (this.props.disableFilter) return;

    const filteredResources = this.resourcesFilterMask.value ? this.composeResourceList(this.state.filteredResources) : null;

    return (
      <div className="resources-filter">
        <input
          type="search"
          name="filter"
          placeholder={`Filter ${this.resource}`}
          onChange={this.handleFilter}
          className="resources-filter-input"
          ref={(resourcesFilterMask) => { this.resourcesFilterMask = resourcesFilterMask; }}/>
        <ul className="resources-filtered-list">{filteredResources}</ul>
      </div>
    );
  }

  composeResourceList(resources) {
    // Implement in sub classes
  }
};
