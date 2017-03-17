describe('TrackListForm', () => { test('renders', () => {}) });
// import React from 'react';
// import { ResourceListForm } from '../shared';
// import { bindHandlers } from '../../helpers';
// import { addToList, setNestedFormInputValue } from '../../state-functions';
//
// export default class TrackListForm extends ResourceListForm {
//   static defaultProps = { tracks: [{}] };
//
//   constructor(props) {
//     super(props);
//
//     this.resource = 'tracks';
//     this.state = { tracks: props.tracks };
//
//     bindHandlers.call(this, [
//       'getChangeHandler',
//       'handleAddTrack',
//       'composeTrackInput',
//     ]);
//   }
//
//   getChangeHandler(index) {
//     const me = this;
//     return function handleChange(event) {
//       event.preventDefault();
//       me.setState(setNestedFormInputValue(me.state, me.resource, index, event.target));
//     };
//   }
//
//   getRequestData() {
//     function assignTrackNumbers(track, index) {
//       return {
//         id: track.id,
//         track_num: index + 1,
//         name: track.name,
//       };
//     }
//
//     return this.state[this.resource].map(assignTrackNumbers);
//   }
//
//   resetForm() {
//     this.setState({ tracks: [{ name: '' }] });
//   }
//
//   handleAddTrack(event) {
//     event.preventDefault();
//
//     this.setState(addToList(this.state, this.resource, {}));
//   }
//
//   composeTrackInput(track, index) {
//     return (
//       <li id={`track-${index}`} key={index} className="track-item">
//         <span className="item-num">{index + 1}</span>
//         <input
//           name="name"
//           type="text"
//           className="track-item-name"
//           value={track.name}
//           placeholder="Track title"
//           onChange={this.getChangeHandler(index)}
//         />
//       </li>
//     );
//   }
//
//   composeTrackInputsList() {
//     // TODO: Use a unique key so that when the form resets, the single
//     // input is blank instead of React reusing the track input
//     return (
//       <ul className="track-list">
//         {this.state.tracks.map(this.composeTrackInput)}
//       </ul>
//     );
//   }
//
//   render() {
//     const trackInputs = this.composeTrackInputsList();
//     return (
//       <div className="track-list-form">
//         <h3 className="track-list-form-title">Tracks</h3>
//         <button
//           className="track-list-form-control-add"
//           onClick={this.handleAddTrack}
//           title="Add track"
//         >
//           <i className="fa fa-plus" />
//         </button>
//         {trackInputs}
//       </div>
//     );
//   }
// }
