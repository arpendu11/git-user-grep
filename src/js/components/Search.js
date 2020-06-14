import React from 'react';
import axios from 'axios';
import '../../../assets/styles/sass/Search.scss';
import searchImg from '../../../public/img/undraw_people_search_wctu.svg';
import searchLoader from '../../../public/img/searchLoader.gif';
import Redirector from './Redirector';
import Card from './Card';

const demoAsyncCall = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: true,
      results: {},
      pointer: 0,
      searchLoading: false,
      message: ''
    };
    this.cancel = '';
  }

  componentDidMount() {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  fetchSearchResults = (updatedPageNumber, query) => {
    const pageNo = updatedPageNumber ? '1' : '1';
    const searchUrl = `https://api.github.com/search/users?q=${query}&page=${pageNo}`;
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    axios.get(searchUrl, {
      cancelToken: this.cancel.token
    })
      .then(res => {
        const resultNotFoundMsg = !res.data.items.length
          ? 'There are no more search results ! Please try a new search'
          : '';
        this.setState({
          results: res.data.items,
          message: resultNotFoundMsg,
          searchLoading: false
        });
      })
      .catch(err => {
        if (axios.isCancel(err) || err) {
          this.setState({
            searchLoading: false,
            message: 'Failed to fetch the data'
          });
        }
      });
  }

  onInputChange = (event) => {
    const query = event.target.value;
    this.setState({
      query,
      searchLoading: true,
      message: ''
    }, () => {
      if (query.length > 3) {
        this.fetchSearchResults('1', query);
      } else {
        this.setState({
          searchLoading: false,
          message: 'Add atleast 4 letters to search',
          results: ''
        });
      }
    });
  }

  renderSearchResults = () => {
    const { results, pointer } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          <div>
            <button
              onClick={() => this.togglePrev()}
              disabled={pointer === 0}
            >Prev</button>
            <button
              onClick={() => this.toggleNext()}
              disabled={pointer === results.length - 1}
            >Next</button>
          </div>
          <div className='page'>
            <div className='col'>
              <div className={`cards-slider active-slide-${pointer}`}>
                <div className='cards-slider-wrapper'
                  style={{
                    transform: `translateX(-${pointer * (100 / results.length)}%)`
                  }}
                >
                  {results.map(item => <Card key={item.id} item={item} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  toggleNext = () => {
    this.setState({
      pointer: this.state.pointer + 1
    });
  }

  togglePrev = () => {
    this.setState({
      pointer: this.state.pointer - 1
    });
  }

  render() {
    const {
      query, searchLoading, message, loading
    } = this.state;
    if (loading) {
      return <Redirector />;
    }
    return (
      <div className='Search'>
        <div className='content'>
          <div className='image'>
            <img src={searchImg} />
          </div>
          <label className='search-label' htmlFor='search-input'>
            <input
              type='text'
              name='query'
              value={query}
              id='search-input'
              placeholder='Search Username'
              onChange={this.onInputChange}
            />
            <i className='fa fa-search search-icon' aria-hidden='true' />
          </label>
          {message && <p className='message'>{message}</p>}
          <img src={searchLoader}
            className={`search-loading ${searchLoading ? 'show' : 'hide'}`}
            alt='searchLoader' />
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}
