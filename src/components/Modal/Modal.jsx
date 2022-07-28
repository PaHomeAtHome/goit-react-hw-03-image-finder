import { Component } from 'react';
import { OverlayStyled } from './Overlay';
import { ModalStyled } from './ModalStyled';

import * as ReactDOM from 'react-dom';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  closeModal = e => {
    if (e.target === document.querySelector(`.modal-overlay`)) {
      this.props.closeModalState();
    }
  };

  render() {
    const { image } = this.props;
    return ReactDOM.createPortal(
      <OverlayStyled className="modal-overlay" onClick={this.closeModal}>
        <ModalStyled>
          <img src={image.largeImageURL} alt={image.tags} />
        </ModalStyled>
      </OverlayStyled>,
      document.getElementById('modal')
    );
  }
}
