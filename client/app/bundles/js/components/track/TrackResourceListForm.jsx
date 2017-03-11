import React from 'react';
import { ResourceListForm } from '../shared';
import { registerHandlers } from '../../helpers';

export default class TrackListForm extends ResourceListForm {
  static defaultProps = { tracks: [{}] };

  constructor(props) {
    super(props);

    this.resource = 'tracks';
    this.state = { tracks: props.tracks };

    registerHandlers.call(this, [
      'getChangeHandler',
      'handleAddTrack',
    ]);
  }

  getChangeHandler(index) {
    return function handleChange(event) {
      event.preventDefault();

      const tracks = this.state[this.resource];
      tracks[index][event.target.name] = event.target.value;

      this.setState({ tracks });
    };
  }

  getRequestData() {
    function assignTrackNumbers(track, index) {
      return {
        id: track.id,
        track_num: index + 1,
        name: track.name
      };
    }

    return this.state[this.resource].map(assignTrackNumbers);
  }

  resetForm() {
    this.setState({ tracks: [{ name: '' }] });
  }

  handleAddTrack(event) {
    event.preventDefault();

    const tracks = this.state[this.resource];
    tracks.push({});

    this.setState({ tracks });
  }

  composeTrackInputsList() {
    // TODO: Use a unique key so that when the form resets, the single
    // input is blank instead of React reusing the track input
    function composeTrackInput(track, index) {
      return (
        <li id={`track-${index}`} key={index} className="track-item">
          <span className="item-num">{index + 1}</span>
          <input
            name="name"
            type="text"
            className="track-item-name"
            value={track.name}
            placeholder="Track title"
            onChange={this.getChangeHandler(index).bind(this)}
          />
        </li>
      );
    }

    return (
      <ul className="track-list">
        {this.state.tracks.map(composeTrackInput.bind(this))}
      </ul>
    );
  }

  render() {
    const trackInputs = this.composeTrackInputsList();
    return (
      <div className="track-list-form">
        <h3 className="track-list-form-title">Tracks</h3>
        <a
          className="track-list-form-control-add"
          onClick={this.handleAddTrack}
          title="Add track"
          >
          <i className="fa fa-plus" />
        </a>
        {trackInputs}
      </div>
    );
  }
}
