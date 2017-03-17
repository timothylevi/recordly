describe('BaseResource', () => { test('renders', () => {}) });
// import React, { PropTypes } from 'react';
// import { bindHandlers, blankFunction } from '../../helpers';
// import * as stateFunctions from '../../state-functions';
//
// export default class BaseResource extends React.Component {
//   static propTypes = { handleResourceSelect: PropTypes.func };
//   static defaultProps = { handleResourceSelect: blankFunction };
//
//   constructor(props) {
//     super(props);
//
//     bindHandlers.call(this, [
//       'handleSelect',
//       'handleEdit',
//       'handleResourceCancel',
//       'handleResourceUpdate',
//     ]);
//   }
//
//   // Parent
//   handleSelect(event) {
//     event.preventDefault();
//     event.stopPropagation();
//
//     this.props.handleResourceSelect(this.state.id);
//   }
//
//   // Self
//   handleEdit(event) {
//     event.preventDefault();
//     event.stopPropagation();
//
//     this.setState(stateFunctions.setFormOpen(this.state));
//   }
//
//   handleResourceCancel() {
//     this.setState(stateFunctions.setFormClose(this.state));
//   }
//
//   handleResourceUpdate(data) {
//     this.setState(stateFunctions.setFormCloseAndData(this.state, data));
//   }
// }
