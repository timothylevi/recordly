import React, { PropTypes } from 'react';

export default class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    title: '',
    children: [],
  };

  render() {
    return (
      <main className={`${this.props.title}-page page`}>
        <h2 className="page-title">{this.props.title}</h2>
        {this.props.children}
      </main>
    );
  }
}
