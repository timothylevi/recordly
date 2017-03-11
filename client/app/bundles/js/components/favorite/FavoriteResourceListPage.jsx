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
    const resourceFilter = this.composeResourceFilter();
    const resourceList = this.composeResourceList(this.resourcesFilterMask.value);

    return (
      <Page title={this.resource}>
        {resourceFilter}
        {resourceList}
      </Page>
    );
  }
}
