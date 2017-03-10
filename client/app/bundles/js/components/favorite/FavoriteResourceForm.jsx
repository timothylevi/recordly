import React from 'react';
import { ResourceForm } from '../shared';

export default class FavoriteResource extends ResourceForm {
  static defaultProps = {
    favoriteable_id: "",
    favoriteable_type: "",
  };

  constructor(props, _railsContext) {
    super(props);

    this.resource = "favorite";
    this.state = {
      id: props.id,
      type: props.name,
    };

    this.handleFavorite = this.handleFavorite.bind(this);
  }

  handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('favoriting', this.props);
  }

  render() {
    return (
      <div onClick={this.handleFavorite}>favorite</div>
    );
  }
}
