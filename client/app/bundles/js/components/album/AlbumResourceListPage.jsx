import React from 'react';
import { ResourceForm, ResourceList } from './index';
import { FilterableResourceList } from '../shared';
import { Page } from '../layout';

export default class AlbumResourceListPage extends FilterableResourceList {
  constructor(props, _railsContext) {
    super(props);

    this.resource = "albums";
    this.state = {
      albums: props.albums
    };
  }

  composeResourceForm() {
    return (
      <ResourceForm handleResourceAdd={this.handleResourceAdd} />
    );
  }

  composeResourceList(albums, disable) {
    return disable ? null : <ResourceList albums={albums} />;
  }

  render() {
    const resourceFilter = this.composeResourceFilter(this.state.filteredResources);
    const resourceList = this.composeResourceList(this.props.albums, this.resourcesFilterMask.value);
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
