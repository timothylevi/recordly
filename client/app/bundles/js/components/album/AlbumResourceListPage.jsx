import React from 'react';
import { Resource, ResourceForm, ResourceList } from './Album.jsx';
import { Page, FilterableResourceList } from '../shared/Base.jsx';

export default class AlbumResourceListPage extends FilterableResourceList {
  static defaultProps = {
    album: {},
    disableAlbumEdit: false,
    disableNew: false
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      albums: props.albums,
    };

    this.resource = "albums";
  }

  composeNewAlbum() {
    if (this.resourcesFilterMask.value || this.props.disableNew) return null;

    return (
      <ResourceForm
        form={true}
        album={this.props.album}
        artists={this.props.artists}
        handleResourceAdd={this.handleResourceAdd}
        artist_ids={this.props.artist_ids} />
    );
  }

  render() {
    const resourceListFilter = this.getResourceFilter(this.state.filteredResources);
    const resourceNew = this.composeNewAlbum();

    return (
      <Page title={this.resource}>
        <ul className="resources">
          {resourceListFilter}
          <ResourceList albums={this.state.albums} />
          {resourceNew}
        </ul>
      </Page>
    );
  }
}
