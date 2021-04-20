import React from 'react';
import API_KEY from './../../config.js'
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import MoreReviews from './MoreReviews.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      currentReviews: [],
      // meta: {},
      sortType: 'relevant',
      currentCount: 2,
      // filter is an array to make toggling filters easier
      filter: {1: false, 2: false, 3:false, 4:false, 5:false}
    };
    // sortTypes are either newest, helpful, or relevant
    this.handleMore = this.handleMore.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Component updates when changes to prop or state.
    // can set up so both axios request go asynchronously, or set it up so it goes one at a time.
    // prefer to have it so that this.setState works at the same time.
    // Promise.all.
    // updates component if the props changes. Count as 1000 to ensure gets all reviews.
    if (this.props.product !== prevProps.product
      || this.state.sortType !== prevState.sortType
      || this.state.filter !== prevState.filter) {
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
          let allReviews = values[0].data.results;
          let filterObj = this.state.filter;
          let filter = Object.keys(filterObj).filter((star)=> filterObj[star]);
          if (filter.length === 0) {
            filter = [1,2,3,4,5];
          }
          let currentReviews = allReviews.filter((review) => filter.includes(review.rating));
          this.setState({
            allReviews: allReviews,
            currentReviews: currentReviews
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

  handleSort(e) {
    // handleChange of ReviewSort, changing sortType.
    this.setState({
      sortType: e.target.value
    });
  }

  handleFilter(rating) {
    let toggle = !this.state.filter[rating];
    let filter = this.state.filter;
    filter[rating] = toggle;
    this.setState({
      filter: filter
    });
  }

  render() {
    let reviewsClass;
    if (this.state.allReviews.slice(0, this.state.currentCount).length === 0) {
      reviewsClass = 'grid-container no-reviews';
    } else {
      reviewsClass = 'grid-container reviews';
    }
    // maybe do the currentViews here.
    let filterObj = this.state.filter;
    let filter = Object.keys(filterObj).filter((star)=> filterObj[star]);
    filter = filter.map((item)=> parseInt(item));
    console.log('filter', filter);
    if (filter.length === 0) {
      filter = [1,2,3,4,5];
    }
    let currentReviews = this.state.allReviews.filter((review) => filter.includes(review.rating));
    console.log(currentReviews);
    return (
      <>
        <h2>Ratings and Reviews</h2>
        <div id='reviews' className={reviewsClass}>
          <ReviewBreakdown averageRating={this.props.averageRating} meta={this.props.reviewMeta} ratings={this.props.ratings} handleClick = {this.handleFilter}/>
          <ReviewSort handleChange = {this.handleSort} currentSort = {this.state.sortType}/>
          {(currentReviews.slice(0, this.state.currentCount).length !== 0)
          ? <ReviewList reviews = {currentReviews.slice(0, this.state.currentCount)}/>
          : null}
          {(this.state.currentCount >= currentReviews.length || currentReviews.slice(0, this.state.currentCount).length === 0)
          ? null
          : <MoreReviews handleClick = {this.handleMore}/>}
          <div id='reviews-add'> Add Review </div>
        </div>
      </>
    );
  }
}
export default Reviews;