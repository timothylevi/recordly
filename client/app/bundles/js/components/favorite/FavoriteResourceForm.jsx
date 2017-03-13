import React from 'react';
import { ResourceForm } from '../shared';
import { bindHandlers, blankFunction } from '../../helpers';

export default class FavoriteResourceForm extends ResourceForm {
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

    bindHandlers.call(this, [
      'handleFavorite',
    ]);
  }

  static getHandleRequestSuccess() {
    return blankFunction;
  }


  getRequestData() {
    return { favorite: this.state };
  }

  handleFavorite(event) {
    event.preventDefault();
    event.stopPropagation();

    function update() {
      this.setState({ id: null });
    }

    const saved = !!this.state.id;
    const type = saved ? 'DELETE' : 'POST';
    const form = this.getRequestData();
    const callback = saved ? update : blankFunction;
    const request = this.buildRequestOptions(type, form, saved, callback.bind(this));

    $.ajax(request);
  }

  render() {
    const isFavorited = !!this.state.id;

    const resource = this.props.favoriteable_type.toLowerCase();
    const favoriteText = isFavorited ? `Unfavorite ${resource}` : `Favorite ${resource}`;

    return (
      <button
        title={favoriteText}
        className={`item-control item-control-favorite ${isFavorited ? 'favorited' : ''}`}
        onClick={this.handleFavorite}
      >
        <i className={`fa fa-heart${isFavorited ? '' : '-o'}`} />
        <span className="no-web">{favoriteText}</span>
      </button>
    );
  }
}
