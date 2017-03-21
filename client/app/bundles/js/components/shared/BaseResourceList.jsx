import React from 'react';
import { bindHandlers } from '../../helpers';
import * as stateFunctions from '../../state-functions';

export default class BaseResourceList extends React.Component {
  constructor(props) {
    super(props);

    bindHandlers.call(this, [
      'handleResourceAdd',
      'handleResourceDelete',
      'handleResourceSelect',
    ]);
  }

  handleResourceAdd(object) {
    this.setState(stateFunctions.addToList(this.state, this.resource, object));
  }

  handleResourceDelete(objId) {
    this.setState(stateFunctions.markDeleted(this.state, this.resource, objId));
  }

  handleResourceSelect(objId) {
    this.setState(stateFunctions.markSelected(this.state, this.resource, objId));
  }

  componentWillReceiveProps(nextProps) {
    const newResources = [];
    const key = this.resource;
    const resources = this.state[this.resource];
    for (let i = 0; i < resources.length; i++) {
      newResources[i] = { ...this.state[key][i], ...nextProps[key][i] };
    }

    this.setState({ [key]: newResources });
  }
}
