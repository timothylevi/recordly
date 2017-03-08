import React from 'react';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className={this.props.className + " page"}>
        <h2 className="page-title">{this.props.title}</h2>
        {this.props.children}
      </main>
    );
  }
}
