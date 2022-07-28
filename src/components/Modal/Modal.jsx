import { Component } from 'react';

import * as ReactDOM from 'react-dom';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  closeModal = e => {
    if (e.target === document.querySelector('.overlay')) {
      this.props.closeModalState();
    }
  };

  render() {
    const { image } = this.props;
    return ReactDOM.createPortal(
      <div className="overlay" onClick={this.closeModal}>
        <div className="modal">
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>,
      document.getElementById('modal')
    );
  }
}
