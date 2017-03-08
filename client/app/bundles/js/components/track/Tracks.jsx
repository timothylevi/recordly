import React, { PropTypes } from 'react';
import { BaseResource } from '../shared/Base.jsx';

class TracksForm extends BaseResource {
  constructor(props) {
    super(props);

    this.state = {
      album_id: null,
      tracks: props.tracks || []
    }

    this.resource = "track";

    this.handleChangeTrackNumber = this.handleChangeTrackNumber.bind(this);
    this.handleChangeTrackName = this.handleChangeTrackName.bind(this);
  }

  getTrackObjects() {
    function getTrackAttributes(track) {
      const trackAttributes = {
        name: track.name,
        track_num: track.track_num
      };

      if (this.state.album_id) track.album_id = this.stat.album_id;
      return trackAttributes;
    }
    return this.state.tracks.map(getTrackAttributes.bind(this));
  }

  addTrack(event) {
    event.preventDefault();

    const tracks = this.state.tracks;
    const num = this.state.tracks.length + 1;
    tracks.push({
      track_num: num,
      name: "New track"
    });

    this.setState({ tracks });
  }

  handleChangeTrackNumber(event) {
    event.preventDefault();

    const value = event.target.value;
    const id = event.target.id;
    const tracks = this.state.tracks.map(function(track, index) {
      if (track.id === "track-num-" + index) track.track_num = value;

      return track;
    });

    this.setState({ tracks });
  }
  handleChangeTrackName(event) {
    event.preventDefault();

    const value = event.target.value;
    const id = event.target.id;
    const tracks = this.state.tracks.map(function(track, index) {
      if (track.id === "track-name-" + index) track.name = value;

      return track;
    });

    this.setState({ tracks });
  }


  render() {
    function composeTrackInput(track, index) {
      return (
        <div key={index}>
          <input id={"track-num-" + index} type="number" defaultValue={track.track_num} onChange={this.handleChangeTrackNumber} />
          <input id={"track-name-" + index} type="text" defaultValue={track.name} onChange={this.handleChangeTrackName} />
        </div>
      );
    }

    return (
      <div>
        Hello world
        {this.state.tracks.map(composeTrackInput.bind(this))}
        <button onClick={this.addTrack.bind(this)}>Add track</button>
      </div>
    )
  }
}

export { TracksForm as default };
