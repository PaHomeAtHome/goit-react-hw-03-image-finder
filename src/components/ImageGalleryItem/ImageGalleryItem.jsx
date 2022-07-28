export default function ImageGalleryItem({ image, toggleModal, setImage }) {
  const { webformatURL, tags } = image;
  return (
    <li className="gallery-item">
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          toggleModal();
          setImage(image);
        }}
      />
    </li>
  );
}
