import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Set} from 'immutable';
import Row from './row';

export default class Table extends PureComponent {
  static get propTypes() {
    return {
      identities: PropTypes.instanceOf(Set).isRequired,
      filter: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      filter: '',
    };
  }

  render() {
    const {
      filter,
      identities,
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>
              User
            </th>
            <th>
              Created
            </th>
            <th>
              Added to app
            </th>
          </tr>
        </thead>
        <tbody>
          {
            identities.filter(
              id => id.user.includes(filter),
            ).map(id => (
              <Row
                key={id}
                identity={id}
              />
            ))
          }
        </tbody>
      </table>
    );
  }
}
