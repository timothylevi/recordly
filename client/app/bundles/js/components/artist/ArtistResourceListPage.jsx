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
    return disable ? null : <ResourceList artists={artists} />;
  }

  composeResourceForm() {
    return <ResourceForm handleResourceAdd={this.handleResourceAdd} />;
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
