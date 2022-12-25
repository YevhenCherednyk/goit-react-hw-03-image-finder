import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import API from 'services/API';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

const API_KEY = '31186773-8484a0bc913959b467e4295b5';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    const prevPage = prevState.page;
    const prevQuery = prevState.query;

    if (!query) {
      return;
    }

    if (page !== prevPage || query !== prevQuery) {
      this.setState({ status: 'pending' });

      try {
        const url = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const { hits, totalHits } = await API.findImages(url);

        if (!hits.length) {
          return toast.info('nothing was found for the entered value');
        }

        this.setState({
          images: [...images, ...hits],
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ status: 'resolved' });
      }
    }
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      totalPages: 1,
      status: 'idle',
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  countTotakPages(totalImg) {
    this.setState({ totalPages: Math.ceil(totalImg / 12) });
  }

  render() {
    const { status, images, page, totalPages } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        <Button onClick={this.loadMore} />
        <ToastContainer theme="colored" autoClose={3000} />
      </AppContainer>
    );
  }
}

export default App;
