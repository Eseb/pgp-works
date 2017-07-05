import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {OrderedSet} from 'immutable';
import {Button} from 'react-bootstrap';

export default class IdentityList extends PureComponent {
  static get propTypes() {
    return {
      handleAdditionRequest: PropTypes.func.isRequired,
      identities: PropTypes.instanceOf(OrderedSet).isRequired,
    };
  }

  render() {
    const {
      handleAdditionRequest,
      identities,
    } = this.props;

    return (
      <Button
        onClick={handleAdditionRequest}
      >
        Add PGP identity ({identities.size})
      </Button>
    );
  }
}
