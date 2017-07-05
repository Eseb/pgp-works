import React, {PureComponent} from 'react';
import {OrderedSet} from 'immutable';
import keyMirror from 'key-mirror';
import IdentityList from './identity-list/identity-list';
import IdentityImport from './identity-import/identity-import';

const AppModes = keyMirror({
  IDENTITY_LIST: null,
  IDENTITY_IMPORT: null,
});

export default class Application extends PureComponent {
  constructor() {
    super();

    this.state = {
      appMode: AppModes.IDENTITY_LIST,
    };

    this.handleAdditionRequest = this.handleAdditionRequest.bind(this);
    this.handleReturnToHome = this.handleReturnToHome.bind(this);
  }

  handleReturnToHome() {
    this.setState({
      appMode: AppModes.IDENTITY_LIST,
    });
  }

  handleAdditionRequest() {
    this.setState({
      appMode: AppModes.IDENTITY_IMPORT,
    });
  }

  handleIdentityAddition(identity) {
    console.log('Tried adding identity', identity);
  }

  renderModeComponent() {
    const {appMode} = this.state;

    switch (appMode) {
      case AppModes.IDENTITY_LIST:
        return (
          <IdentityList
            identities={new OrderedSet()}
            handleAdditionRequest={this.handleAdditionRequest}
          />
        );
      case AppModes.IDENTITY_IMPORT:
        return (
          <IdentityImport
            handleAddition={this.handleIdentityAddition}
            handleCancellation={this.handleReturnToHome}
          />
        );
      default:
        throw new Error(`Tried rendering unknown app mode '${appMode}'`);
    }
  }

  render() {
    return (
      <div className="application">
        {this.renderModeComponent()}
      </div>
    );
  }
}
