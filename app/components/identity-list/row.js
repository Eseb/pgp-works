import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Identity from '../../storage/identity';

function formatMoment(then) {
  const oneWeekAgo = moment().subtract(1, 'weeks');

  if (then.isBefore(oneWeekAgo)) {
    return then.format('LL');
  }

  return then.fromNow();
}

export default class Row extends PureComponent {
  static get propTypes() {
    return {
      identity: PropTypes.instanceOf(Identity).isRequired,
    };
  }

  render() {
    const {identity} = this.props;

    return (
      <tr>
        <td>
          {identity.user}
        </td>
        <td>
          {formatMoment(identity.created)}
        </td>
        <td>
          {formatMoment(identity.dateAddedToApp)}
        </td>
      </tr>
    );
  }
}
