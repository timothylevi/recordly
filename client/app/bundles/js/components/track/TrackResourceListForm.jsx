import React from 'react';
import { ResourceListForm } from '../shared';
import { registerHandlers } from '../../helpers';

export default class TrackListForm extends ResourceListForm {
  static defaultProps = {
    tracks: [{}]
  };

  constructor(props) {
    super(props);

    this.resource = "tracks";
    this.state = {
      tracks: props.tracks
    };

    registerHandlers.call(this, [
      "getChangeHandler",
      "handleAddTrack"
    ]);
  }

  getChangeHandler(index) {
    return function handleChange(event) {
      event.preventDefault();

      const tracks = this.state[this.resource];
      tracks[index][event.target.name] = event.target.value;

      this.setState({ tracks });
    }
  }

  getRequestData() {
    function assignTrackNumbers(track, index) {
      track.track_num = index + 1;
      return track;
    }

    return this.state[this.resource].map(assignTrackNumbers);
  }

  resetForm() {
    this.setState({
      tracks: [{}]
    });
  }

  handleAddTrack(event) {
    event.preventDefault();

    const tracks = this.state[this.resource];
    tracks.push({});

    this.setState({ tracks });
  }

  composeTrackInputsList(tracks) {
    function composeTrackInput(track, index) {
      return (
        <li id={`track-${index}`} key={index} className="track-item">
          <input
            name="name"
            type="text"
            className="track-item-name"
            onChange={this.getChangeHandler(index).bind(this)} />
        </li>
      );
    }

    return (
      <ol className="track-list">
        {tracks.map(composeTrackInput.bind(this))}
      </ol>
    );
  }

  render() {
    const trackInputs = this.composeTrackInputsList(this.state.tracks);
    return (
      <div className="track-list-form">
        {trackInputs}
        <a onClick={this.handleAddTrack}>Add track</a>
      </div>
    );
  }
}
