import React from 'react';
import { ResourceForm } from './index';
import { Resource } from '../shared';
import { ResourceList as AlbumList } from '../album';

export default class Artist extends Resource {
  static defaultProps = {
    id: "",
    name: "",
    avatar: "",
    updated_at: ""
  };

  constructor(props, _railsContext) {
    super(props);

    this.resource = "artist";
    this.state = {
      form: false,
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      updated_at: props.updatedAt
    };
  }

  composeAlbumList(albums, disable) {
    return disable ? null : <AlbumList albums={albums} container={this.resource}/>;
  }

  render() {
    if (this.props.deleted) return null;

    if (this.state.form) {
      return (
        <ResourceForm
          {...this.state}
          handleResourceUpdate={this.handleResourceUpdate}
          handleResourceCancel={this.handleResourceCancel}
          handleResourceDelete={this.props.handleResourceDelete}
          ref={(form) => { this.formComponent = form; }} />
      );
    }

    const isInAlbumContainer = this.props.container === "album";
    const isSelected = this.props.selected;

    const className = "artist-item" + (isSelected ? " selected" : "");
    const albumList = this.composeAlbumList(this.props.albums, !isSelected || isInAlbumContainer);

    return (
      <li key={this.state.id} onClick={this.handleSelect} className={className}>
        <div className="artist-item-controls">
          <a className="artist-item-controls-edit" onClick={this.handleEdit}>Edit</a>
        </div>
        <div className="artist-item-avatar" style={{backgroundImage: `url('${this.state.avatar}')` }}></div>
        <div className="artist-item-name">{this.state.name}</div>
        <div className="artist-item-created">{this.state.created_at && this.state.created_at.toString()}</div>
        <div className="artist-item-updated">{this.state.updated_at && this.state.updated_at.toString()}</div>
        {albumList}
      </li>
    );
  }
}
