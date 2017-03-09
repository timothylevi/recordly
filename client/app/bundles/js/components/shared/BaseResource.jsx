import React from 'react';
import { registerHandlers } from '../../helpers';

export default class BaseResource extends React.Component {
  constructor(props, _railsContext) {
    super(props)

    registerHandlers.call(this, [
      "handleEdit",
      "handleSelect",
      "handleResourceUpdate",
      "handleResourceCancel"
    ]);
  }

  handleResourceCancel() {
    this.setState({ form: false });
  }

  handleResourceUpdate(data) {
    this.setState({ ...data, form: false });
  }

  handleEdit(event) {
    event.preventDefault();

    this.setState({ form: true });
  }

  handleSelect(event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.handleResourceSelect(this.state.id);
  }
}
