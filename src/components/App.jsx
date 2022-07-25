import { Component } from 'react';
import Container from './Container/Container';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  render() {
    return <Container></Container>;
  }
}
