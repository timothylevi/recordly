import React from 'react';
// import { ResourceForm, ResourceList } from './index';
import { Page } from '../layout';
import { FilterableResourceList } from '../shared';

export default class FavoriteResourceListPage extends FilterableResourceList {
  constructor(props, _railsContext) {
    super(props);

    this.resource = "favorites";
    this.state = {
      favorites: props.favorites
    };
  }

  // composeResourceList(artists, disable) {
    // return disable ? null : <ResourceList artists={artists} />;
  // }

  // composeResourceForm() {
    // return <ResourceForm handleResourceAdd={this.handleResourceAdd} />;
  // }

  render() {
    debugger;
    // const resourceFilter = this.composeResourceFilter(this.state.filteredResources);
    // const resourceList = this.composeResourceList(this.props.artists, this.resourcesFilterMask.value);
    // const resourceForm = this.composeResourceForm();

    // return (
      // <Page title={this.resource}>
        // {resourceFilter}
        // {resourceList}
        // {resourceForm}
      // </Page>
    // );
  }
}
