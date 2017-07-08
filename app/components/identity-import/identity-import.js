// This import comes through `electron-prebuilt-compile`.
// eslint-disable-next-line import/no-extraneous-dependencies
import electron from 'electron';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  HelpBlock,
} from 'react-bootstrap';
import FormLayout from '../layout/form-layout';
import {
  containsPublicKey,
  importFile,
  ImportError,
} from '../../pgp-tools/identity-importer';

const {dialog} = electron.remote;

export default class IdentityImport extends PureComponent {
  static get propTypes() {
    return {
      handleAddition: PropTypes.func.isRequired,
      handleCancellation: PropTypes.func.isRequired,
    };
  }

  constructor() {
    super();

    this.state = {
      armouredText: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleArmouredTextChange = this.handleArmouredTextChange.bind(this);
    this.handleBrowseClick = this.handleBrowseClick.bind(this);
  }

  isValidKey() {
    return containsPublicKey(this.state.armouredText);
  }

  handleBrowseClick(event) {
    event.preventDefault();

    let key;
    try {
      key = importFile();
    } catch (error) {
      if (error.constructor !== ImportError) {
        throw error;
      }

      dialog.showErrorBox('Key import error', error.message);
    }

    if (key) {
      this.props.handleAddition(key);
    }
  }

  handleArmouredTextChange(event) {
    this.setState({
      armouredText: event.target.value,
    });
  }

  handleSubmit() {
    if (this.isValidKey()) {
      return;
    }

    this.props.handleAddition();
  }

  renderTextareaFeedback() {
    const {armouredText} = this.state;

    if (!armouredText) {
      return null;
    }

    return (
      <FormControl.Feedback />
    );
  }

  renderTextareaHelpBlock() {
    const {armouredText} = this.state;

    if (!armouredText || this.isValidKey()) {
      return null;
    }

    return (
      <HelpBlock>Enter a valid PGP public key block.</HelpBlock>
    );
  }

  render() {
    const {armouredText} = this.state;
    const {handleCancellation} = this.props;

    let formGroupValidationState = null;
    if (this.isValidKey()) {
      formGroupValidationState = 'success';
    } else if (armouredText) {
      formGroupValidationState = 'error';
    }

    return (
      <FormLayout
        id="identity-import"
        onSubmit={this.handleSubmit}
        handleCancellation={handleCancellation}
        heading="Add PGP identity"
        button={(
          <Button
            bsStyle="primary"
            disabled={!this.isValidKey()}
            type="submit"
          >
            Add
          </Button>
        )}
      >
        <h3>
          Import key file
        </h3>

        <p>
          <Button
            bsStyle="primary"
            onClick={this.handleBrowseClick}
          >
            Browse files
          </Button>
        </p>

        <p className="or">
          or
        </p>

        <h3>
          Paste key
        </h3>

        <FormGroup
          controlId="armouredText"
          validationState={formGroupValidationState}
        >
          <ControlLabel>
            Public key block
          </ControlLabel>

          <FormControl
            componentClass="textarea"
            onChange={this.handleArmouredTextChange}
            placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----"
            value={armouredText}
          />

          {this.renderTextareaFeedback()}
          {this.renderTextareaHelpBlock()}
        </FormGroup>
      </FormLayout>
    );
  }
}
