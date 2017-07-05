import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'underscore';
import {
  Button,
  Glyphicon,
} from 'react-bootstrap';

export default class FormLayout extends PureComponent {
  static get propTypes() {
    return {
      button: PropTypes.node.isRequired,
      children: PropTypes.node.isRequired,
      handleCancellation: PropTypes.func.isRequired,
      heading: PropTypes.node.isRequired,
    };
  }

  render() {
    const {
      button,
      children,
      handleCancellation,
      heading,
    } = this.props;

    const definedProps = Object.keys(this.constructor.propTypes);
    const extraProps = omit(this.props, ...definedProps);

    return (
      <form
        className="form-layout"
        {...extraProps}
      >
        <header>
          <Button
            onClick={handleCancellation}
          >
            <Glyphicon glyph="chevron-left" />
          </Button>
          <h1>
            {heading}
          </h1>
        </header>

        <main>
          {children}
        </main>

        <footer>
          {button}
        </footer>
      </form>
    );
  }
}
