import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className="gallery">
        <ImageGalleryItem />
      </ul>
    );
  }
}
