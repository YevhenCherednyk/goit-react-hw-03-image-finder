import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from 'services/API';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import { AppContainer } from './App.styled';

const API_KEY = '31186773-8484a0bc913959b467e4295b5';
const IMG_PER_PAGE = 12;

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: null,
    totalPages: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    const prevPage = prevState.page;
    const prevQuery = prevState.query;

    // if (!query) {
    //   this.setState({ images: [] });
    //   return;
    // }

    if (page !== prevPage || query !== prevQuery) {
      this.setState({ status: 'pending' });

      try {
        const url = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${IMG_PER_PAGE}`;
        const { hits, totalHits } = await API.findImages(url);
        const totalPages = Math.ceil(totalHits / IMG_PER_PAGE);

        if (!hits.length) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (page === 1) {
          toast.info(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }

        this.setState({
          images: [...images, ...hits],
          totalHits,
          totalPages,
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
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, images, page, totalPages } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {images.length && page !== totalPages && (
          <Button onClick={this.loadMore} />
        )}

        <ToastContainer theme="colored" autoClose={3000} />
      </AppContainer>
    );
  }
}

export default App;
