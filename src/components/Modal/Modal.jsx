import * as ReactDOM from 'react-dom';
export default function Modal({ image, toggleModal }) {
  return ReactDOM.createPortal(
    <div className="overlay" onClick={toggleModal}>
      <div className="modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>,
    document.getElementById('modal')
  );
}
