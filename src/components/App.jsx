import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import fetchResult from '../services/Api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Notification from './Notification/Notification';

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
    error: null,
    hits: null,
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements[1].value;
    this.setState({
      page: 1,
      response: null,
      hits: null,
      error: null,
    });

    if (query.trim() === '') {
      Notify.failure('Type search query');
      event.target.reset();
      return;
    }
    this.setState({ searchQuery: query });
    event.target.reset();
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
    return;
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      const response = fetchResult(URL, nextQuery, this.state.page)
        .then(response => {
          if (this.state.response) {
            this.setState({
              response: [...this.state.response, ...response.hits],
              status: Status.RESOLVED,
            });
            return;
          }
          this.setState({
            response: [...response.hits],
            status: Status.RESOLVED,
            hits: response.totalHits,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));

      setTimeout(() => {
        window.scrollBy({
          top: 9999,
          behavior: 'smooth',
        });
      }, '500');
      return response;
    }
  }
  render() {
    const { status, response, hits } = this.state;
    const PENDING = status === 'pending';
    const RESPONSE = response && response.length > 0;
    const IMAGE_LIMIT = RESPONSE && response.length >= 500;
    const LOW_IMAGE_COUNT = RESPONSE && hits <= 12;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {RESPONSE && <ImageGallery images={response} />}
        {RESPONSE && !PENDING && !IMAGE_LIMIT && !LOW_IMAGE_COUNT && (
          <Button loadMore={this.loadMore} />
        )}
        {!PENDING && IMAGE_LIMIT && (
          <Notification>Sorry, 500 images limit</Notification>
        )}
        {PENDING && <Loader />}
      </Container>
    );
  }
}
