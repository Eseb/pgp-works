import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Set} from 'immutable';
import {
  Button,
  ButtonGroup,
  Glyphicon,
} from 'react-bootstrap';
import Search from './search';
import Table from './table';

export default class IdentityList extends PureComponent {
  static get propTypes() {
    return {
      handleAdditionRequest: PropTypes.func.isRequired,
      identities: PropTypes.instanceOf(Set).isRequired,
    };
  }

  constructor() {
    super();

    this.state = {
      searchQuery: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    this.setState({
      searchQuery: query,
    });
  }

  render() {
    const {
      handleAdditionRequest,
      identities,
    } = this.props;

    const {searchQuery} = this.state;

    return (
      <section id="identity-list">
        <header>
          <div>
            <ButtonGroup>
              <Button onClick={handleAdditionRequest}>
                <Glyphicon glyph="import" />
                {' '}
                Import
              </Button>

              <Button>
                <Glyphicon glyph="plus" />
                {' '}
                Create
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button>
                <Glyphicon glyph="lock" />
                {' '}
                Encrypt
              </Button>

              <Button>
                <Glyphicon glyph="eye-open" />
                {' '}
                Decrypt
              </Button>
            </ButtonGroup>
          </div>
          <Search
            handleSearch={this.handleSearch}
          />
        </header>

        <Table
          identities={identities}
          filter={searchQuery}
        />
      </section>
    );
  }
}
