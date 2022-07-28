import { Component } from 'react';
import { ImageGalleryStyled } from './ImageGalleryStyled';

import Modal from 'components/Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
export default class ImageGallery extends Component {
  state = {
    isModalOpen: false,
    currentImage: null,
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  closeModal = event => {
    if (event.key === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  setImage = image => {
    this.setState({ currentImage: image });
  };

  closeModalState = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { currentImage } = this.state;
    return (
      <ImageGalleryStyled className="gallery">
        {this.props.images.map(image => (
          <ImageGalleryItem
            image={image}
            toggleModal={this.toggleModal}
            setImage={this.setImage}
            key={image.id}
          />
        ))}
        {this.state.isModalOpen && (
          <Modal
            image={currentImage}
            closeModal={this.closeModal}
            closeModalState={this.closeModalState}
          />
        )}
      </ImageGalleryStyled>
    );
  }
}
