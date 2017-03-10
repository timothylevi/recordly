import React from 'react';
import { ResourceForm } from '../shared';

export default class FavoriteResource extends ResourceForm {
  static defaultProps = {
    favorite: null,
    favoriteable_id: '',
    favoriteable_type: '',
  };

  constructor(props) {
    super(props);

    this.resource = 'favorite';
    this.state = {
      id: props.favorite,
      favoriteable_id: props.favoriteable_id,
      favoriteable_type: props.favoriteable_type,
    };

// TODO registerhandlers
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleRequestSuccess = this.handleRequestSuccess.bind(this);
  }

  getRequestData() {
    return { favorite: this.state };
  }

  handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    const saved = !!this.state.id;
    const type = saved ? 'DELETE' : 'POST';
    const form = this.getRequestData();
    const callback = function callback() {};
    const request = this.buildRequestOptions(type, form, saved, callback.bind(this));

    $.ajax(request);
  }

  handleRequestSuccess() {}

  render() {
    return (
      <div onClick={this.handleFavorite}>favorite</div>
    );
  }
}
