import { Component } from 'react';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Notify } from 'notiflix';
import fetchResult from '../services/Api';
import Button from './Button/Button';
import Loader from './Loader/Loader';

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
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements[1].value;
    this.setState({ page: 1 });
    this.setState({ response: null });

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
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
      return response;
    }
  }
  render() {
    const { status, response } = this.state;
    const PENDING = status === 'pending';
    const RESPONSE = response && response.length > 0;
    // if (RESPONSE) {
    //   const IMAGES_LIMIT = response.length >= 500;
    //   return IMAGES_LIMIT;
    // }
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {RESPONSE && <ImageGallery images={this.state.response} />}
        {RESPONSE && !PENDING && !response.length >= 500 && (
          <Button loadMore={this.loadMore} />
        )}
        {PENDING && <Loader />}
      </Container>
    );
  }
}
