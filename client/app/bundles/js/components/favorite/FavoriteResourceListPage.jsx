import React from 'react';
import { ResourceList } from './index';
import { Page } from '../layout';
import { FilterableResourceList } from '../shared';

export default class FavoriteResourceListPage extends FilterableResourceList {
  constructor(props) {
    super(props);

    this.resource = 'favorites';
    this.state = { favorites: props.favorites };
  }

  composeResourceList(disable, favorites = this.props.favorites) {
    return disable ? null : (
      <div className="page-section">
        <ResourceList favorites={favorites} />
      </div>
    );
  }

  render() {
    const isFiltering = !!this.resourcesFilterMask.value;

    const resourceFilter = this.composeResourceFilter();
    const resourceList = this.composeResourceList(isFiltering);

    if (!this.props.favorites.length) {
      return (
        <Page title={this.resource}>
          Favorite artists, albums, and tracks to show them here!
        </Page>
      );
    }

    return (
      <Page title={this.resource}>
        {resourceFilter}
        {resourceList}
      </Page>
    );
  }
}
