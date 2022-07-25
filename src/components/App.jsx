import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import fetchResult from '../services/Api';

const URL = `https://pixabay.com/api/`;

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    status: Status.IDLE,
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements[1].value;

    if (query.trim() === '') {
      Notify.failure('Type search query');
      event.target.reset();
      return;
    }
    this.setState({ searchQuery: query });
    event.target.reset();
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });

      fetchResult(URL, nextQuery, this.state.page)
        .then(response => this.setState({ response, status: Status.RESOLVED }))
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery />
      </Container>
    );
  }
}
