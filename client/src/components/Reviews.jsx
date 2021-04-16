import React from 'react';
import API_KEY from './../config.js'
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      meta: {},
      sortType: 'relevant',
      currentCount: 2
    };
    // sortTypes are either newest, helpful, or relevant
  }

  // on more reviews button click, count goes up by two.
  // overall reviews count = meta.recommended.false + .true;
  // if meta.recommended.false + meta.recommended.true < count, remove the count button.
  // updates component if state changes. Maybe check for a specific state change to prevent infinite loop of changing due to state.
  // OR
  // can handle axios request on the button click rather than only on the componentDidUpdate!

  componentDidUpdate(prevProps, prevState) {
    // Component updates when changes to prop or state.
    // can set up so both axios request go asynchronously, or set it up so it goes one at a time.
    // prefer to have it so that this.setState works at the same time.
    // Promise.all.
    // updates component if the props changes. Count as 1000 to ensure gets all reviews.
    if (this.props.product !== prevProps.product) {
      let promises = [];
      promises.push(axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
        headers: {'Authorization': API_KEY},
        params: {
          product_id: `${this.props.product.id}`,
          sort: `${this.state.sortType}`,
          count: 1000
        }
      }));
      promises.push(axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
        headers: {'Authorization': API_KEY},
        params: {
          product_id: `${this.props.product.id}`
        }
      }));
      Promise.all(promises)
        .then((values)=> {
          this.setState({
            reviews: values[0].data.results,
            meta: values[1].data
          });
        })
        .catch((err)=> {
          console.log('err in trying to update reviews status', err);
        });
    }
  }

  render() {
    // entire premise of finding from totalCount is off.
    // maybe try to find all reviews at the beginning? arbitrary count of 1000, in hopes that reviews list is not greater than 1000. If it is, send another axios request that doubles that count.
    // Currently:
    return (
      <div id='reviews' className='grid-container reviews'>
        REVIEWS WRAPPER
        <ReviewBreakdown />
        <ReviewSort />
        <ReviewList reviews = {this.state.reviews.slice(0, this.state.currentCount)}/>
        <div id='reviews-add'> Add Review </div>
      </div>
    );
  }
}
export default Reviews;