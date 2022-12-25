import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
  SerchBar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

class Serchbar extends Component {
  state = {
    query: '',
  };

  handleChange = evt => {
    const { name, value } = evt.currentTarget;

    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { query } = this.state;

    if (query.trim() === '') {
      return toast.warning('Please enter your serch value!');
    }

    this.props.onSubmit(query);

    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <SerchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SerchBar>
    );
  }
}

export default Serchbar;
