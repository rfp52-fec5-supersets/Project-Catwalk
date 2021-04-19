import React from 'react';
import API_KEY from './../config.js'
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import MoreReviews from './MoreReviews.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      // meta: {},
      sortType: 'relevant',
      currentCount: 2
    };
    // sortTypes are either newest, helpful, or relevant
    this.handleMore = this.handleMore.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Component updates when changes to prop or state.
    // can set up so both axios request go asynchronously, or set it up so it goes one at a time.
    // prefer to have it so that this.setState works at the same time.
    // Promise.all.
    // updates component if the props changes. Count as 1000 to ensure gets all reviews.
    if (this.props.product !== prevProps.product || this.state.sortType !== prevState.sortType) {
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
      // promises.push(axios({
      //   method: 'get',
      //   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      //   headers: {'Authorization': API_KEY},
      //   params: {
      //     product_id: `${this.props.product.id}`
      //   }
      // }));
      Promise.all(promises)
        .then((values)=> {
          this.setState({
            reviews: values[0].data.results,
            // meta: values[1].data
          });
        })
        .catch((err)=> {
          console.log('err in trying to update reviews status', err);
        });
    }
  }

  handleMore() {
    let count = this.state.currentCount + 2;
    this.setState({
      currentCount: count
      // currentCount: 0
    });
  }

  handleSort(newSort) {
    // handleChange of ReviewSort, changing sortType.
    this.setState({
      sortType: newSort
    });
  }

  render() {
    let reviewsClass;
    if (this.state.reviews.slice(0, this.state.currentCount).length === 0) {
      reviewsClass = 'grid-container no-reviews';
    } else {
      reviewsClass = 'grid-container reviews';
    }
    return (
      <div id='reviews' className={reviewsClass}>
        <ReviewBreakdown />
        <ReviewSort handleSort = {this.handleSort}/>
        {(this.state.reviews.slice(0, this.state.currentCount).length !== 0)
        ? <ReviewList reviews = {this.state.reviews.slice(0, this.state.currentCount)}/>
        : null}
        {(this.state.currentCount >= this.state.reviews.length || this.state.reviews.slice(0, this.state.currentCount).length === 0)
        ? null
        : <MoreReviews handleClick = {this.handleMore}/>}
        <div id='reviews-add'> Add Review </div>
      </div>
    );
  }
}
export default Reviews;