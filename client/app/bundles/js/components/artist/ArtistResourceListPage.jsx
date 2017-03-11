
import React from 'react';
import { ResourceForm, ResourceList } from './index';
import { Page } from '../layout';
import { FilterableResourceList } from '../shared';

export default class ArtistResourceListPage extends FilterableResourceList {
  constructor(props) {
    super(props);

    this.resource = 'artists';
    this.state = { artists: props.artists };
  }

  composeResourceList(disable, artists = this.props.artists) {
    return disable ? null : (
      <div className="page-section">
        <ResourceList artists={artists} container="page" />
      </div>
    );
  }

  composeResourceForm(disable) {
    return disable ? null : (
      <div className="page-section">
        <ResourceForm
          container="page"
          filterMask={this.resourcesFilterMask.value}
          handleResourceAdd={this.handleResourceAdd}
        />
      </div>
    );
  }

  render() {
    const isFiltering = this.resourcesFilterMask.value;

    const resourceFilter = this.composeResourceFilter();
    const resourceList = this.composeResourceList(isFiltering);
    const resourceForm = this.composeResourceForm();

    return (
      <Page title={this.resource}>
        {resourceFilter}
        {resourceList}
        {resourceForm}
      </Page>
    );
  }
}
