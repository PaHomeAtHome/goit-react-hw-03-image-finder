import { ImageGalleryItemStyled } from './ImageGalleryItemStyled';

export default function ImageGalleryItem({ image, toggleModal, setImage }) {
  const { webformatURL, tags } = image;
  return (
    <ImageGalleryItemStyled>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          toggleModal();
          setImage(image);
        }}
      />
    </ImageGalleryItemStyled>
  );
}
