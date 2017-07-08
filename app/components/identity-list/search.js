import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap';

export default class Search extends PureComponent {
  static get propTypes() {
    return {
      handleSearch: PropTypes.func.isRequired,
    };
  }

  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    }, () => {
      this.props.handleSearch(this.state.value);
    });
  }

  render() {
    const {value} = this.state;

    return (
      <FormControl
        className="search"
        placeholder="Search"
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}
