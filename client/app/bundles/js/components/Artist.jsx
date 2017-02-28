import React, { PropTypes } from 'react';

export default class Artist extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      name: this.props.name
    };
  }

  render() {
    return (
      <div>
        Name: {this.state.name}
      </div>
    );
  }
}
