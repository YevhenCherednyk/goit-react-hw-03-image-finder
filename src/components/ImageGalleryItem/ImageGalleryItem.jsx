import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { id, tags, webformatURL, largeImageURL } = this.props;
    const { showModal } = this.state;
    return (
      <GalleryItem id={id}>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.openModal}
        />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={tags}></img>
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
