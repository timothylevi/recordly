import React from 'react';
import { ResourceForm } from './index';
import { Resource } from '../shared';
import { ResourceList as AlbumList } from '../album';
import { ResourceForm as FavoriteForm } from '../favorite';

export default class Artist extends Resource {
  static defaultProps = {
    id: '',
    name: '',
    avatar: '',
    updated_at: '',
  };

  constructor(props) {
    super(props);

    this.resource = 'artist';
    this.state = {
      form: false,
      id: props.id,
      name: props.name,
      avatar: props.avatar,
      updated_at: props.updatedAt,
    };
  }

  composeAlbumList(albums, disable) {
    return disable ? null : (
      <AlbumList
        albums={albums}
        container={this.resource}
      />
    );
  }

  render() {
    if (this.props.deleted) return null;

    if (this.state.form) {
      return (
        <div className="item-row">
          <ResourceForm
            {...this.state}
            handleResourceUpdate={this.handleResourceUpdate}
            handleResourceCancel={this.handleResourceCancel}
            handleResourceDelete={this.props.handleResourceDelete}
            ref={(form) => { this.formComponent = form; }}
          />
        </div>
      );
    }

    const isInAlbumContainer = this.props.container === 'album';
    const isSelected = this.props.selected;

    const className = `artist-item ${isSelected ? ' selected' : ''}`;
    const albumList = this.composeAlbumList(this.props.albums, !isSelected || isInAlbumContainer);
    const selectText = isSelected ? `Close ${this.resource}` : `View more from this ${this.resource}`;

    return (
      <li key={this.state.id} className={className}>
        <div className="item-row">
          <div className="item-controls">
            <FavoriteForm favorite={this.props.favorite} favoriteable_id={this.state.id} favoriteable_type="Artist" />
            {isInAlbumContainer ? null : (
              <button
                className="item-control item-control-select"
                onClick={this.handleSelect}
                title={selectText}>
                <i className={`fa ${isSelected ? 'fa-outdent' : 'fa-indent'}`} />
                <span className="no-web">{selectText}</span>
              </button>
            )}
            {isInAlbumContainer ? null : (
              <button
                className="item-control item-control-edit"
                onClick={this.handleEdit}
                title={`Edit ${this.resource}`}>
                <i className="fa fa-pencil-square-o" />
                <span className="no-web">Edit {this.resource}</span>
              </button>
            )}
          </div>
          <div className="item-avatar" style={{ backgroundImage: `url('${this.state.avatar}')` }} />
          <div className="item-name">
            <img className="item-name-background" src={this.state.avatar} />
            <div className="item-name-text">{this.state.name}</div>
            <div className="item-created">{this.state.created_at && this.state.created_at.toString()}</div>
            <div className="item-updated">{this.state.updated_at && this.state.updated_at.toString()}</div>
          </div>
        </div>
        {albumList}
      </li>
    );
  }
}
