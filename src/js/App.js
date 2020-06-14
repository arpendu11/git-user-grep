import React from 'react';
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
import IntroPage from './components/IntroPage';
import Loader from './components/Loader';
import history from './components/history';
import Search from './components/Search';

const demoAsyncCall = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    }
    return (
      <Router history={history}>
        <Switch>
          <Route path='/search' component={Search} />
          <Route path='/' component={IntroPage} />
        </Switch>
      </Router>
    );
  }
}
