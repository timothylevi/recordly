import React from 'react';
import { ResourceForm, ResourceList } from './index';
import { FilterableResourceList } from '../shared';
import { Page } from '../layout';

export default class AlbumResourceListPage extends FilterableResourceList {
  static defaultProps = { albums: [] };

  constructor(props) {
    super(props);

    this.resource = 'albums';
    this.state = { albums: props.albums };
  }

  composeResourceForm() {
    return (
      <div className="page-section">
        <ResourceForm
          container="page"
          formArtists={this.props.artists}
          handleResourceAdd={this.handleResourceAdd}
        />
      </div>
    );
  }

  composeResourceList(disable, albums = this.props.albums) {
    return disable ? null : (
      <div className="page-section">
        <ResourceList albums={albums} container="page" formArtists={this.props.artists} />
      </div>
    );
  }

  render() {
    const isFiltering = !!this.resourcesFilterMask.value;

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
