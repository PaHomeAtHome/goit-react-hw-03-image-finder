import { Component } from 'react';

import Modal from 'components/Modal/Modal';
export default class ImageGalleryItem extends Component {
  state = {
    open: false,
  };

  toggleModal = () => {
    this.setState({ open: !this.state.open });
  };

  closeModal = event => {
    console.log(event);
    if (event.key === 'Escape') {
      this.setState({ open: false });
    }
  };

  render() {
    const { webformatURL, tags } = this.props.image;
    return (
      <li className="gallery-item" onKeyDown={this.closeModal} tabIndex="0">
        <img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {this.state.open && (
          <Modal image={this.props.image} toggleModal={this.toggleModal} />
        )}
      </li>
    );
  }
}
