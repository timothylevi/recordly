import React from 'react';
import { ResourceForm } from '../shared';

export default class FavoriteResource extends ResourceForm {
  static defaultProps = {
    favorite: null,
    favoriteable_id: "",
    favoriteable_type: ""
  };

  constructor(props, _railsContext) {
    super(props);

    this.resource = "favorite";
    this.state = {
      id: props.favorite,
      favoriteable_id: props.favoriteable_id,
      favoriteable_type: props.favoriteable_type
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  getRequestData() {
    return { favorite: this.state };
  }

  handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    const saved = !!this.state.id;
    const type = saved ? "DELETE" : "POST";
    const form = this.getRequestData();
    const callback = function() {console.log("something happened");}
    const request = this.buildRequestOptions(type, form, saved, callback.bind(this));

    $.ajax(request);
  }

  render() {
    return (
      <div onClick={this.handleFavorite}>favorite</div>
    );
  }
}
