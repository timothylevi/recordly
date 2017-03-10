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
      <ResourceForm
        formArtists={this.props.artists}
        handleResourceAdd={this.handleResourceAdd}
      />
    );
  }

  composeResourceList(disable, albums = this.props.albums) {
    return disable ? null : (
      <ResourceList albums={albums} formArtists={this.props.artists} />
    );
  }

  render() {
    // TODO: Use state from inside of composeResourceFilter
    const resourceFilter = this.composeResourceFilter();
    const resourceList = this.composeResourceList(this.resourcesFilterMask.value);
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
