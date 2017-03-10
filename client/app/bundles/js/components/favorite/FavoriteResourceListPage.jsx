import React from 'react';
import { ResourceList } from './index';
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
    // const resourceFilter = this.composeResourceFilter(this.state.filteredResources);
    const resourceList = <ResourceList favorites={this.props.favorites} />
    // const resourceForm = this.composeResourceForm();

    return (
      <Page title={this.resource}>
        {resourceList}
      </Page>
    );
  }
}
