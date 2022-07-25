import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  render() {
    return (
      <Container>
        <Searchbar />
        <ImageGallery />
      </Container>
    );
  }
}
