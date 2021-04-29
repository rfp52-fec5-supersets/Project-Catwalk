import React from 'react';
import API_KEY from './../../config.js'
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import ReviewSort from './ReviewSort.jsx';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import MoreReviews from './MoreReviews.jsx';
import AddReview from './AddReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      currentReviews: [],
      sortType: 'relevant',
      currentCount: 2,
      // filter is an array to make toggling filters easier
      filter: {1: false, 2: false, 3:false, 4:false, 5:false}
    };
    // sortTypes are either newest, helpful, or relevant
    this.handleMore = this.handleMore.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleReviewsUpdate = this.handleReviewsUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // updates component if the props changes. Count as 1000 to ensure gets all reviews.
    if (this.props.product !== prevProps.product|| this.state.sortType !== prevState.sortType) {
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
          this.setState({
            allReviews: allReviews
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
    if (rating !== 'clear') {
      let toggle = !this.state.filter[rating];
      let filter = this.state.filter;
      filter[rating] = toggle;
      //
      // let filterObj = this.state.filter;
      // let filterKeys = Object.keys(filter).filter((star)=> filter[star]);
      // filterKeys = filterKeys.map((item)=> parseInt(item));
      // if (filterKeys.length === 0) {
      //   filterKeys = [1,2,3,4,5];
      // }
      // let currentReviews = this.state.allReviews.filter((review) => filterKeys.includes(review.rating));
      //
      this.setState({
        filter: filter
        // currentReviews: currentReviews
      });
    } else {
      this.setState({
        filter: {1: false, 2: false, 3:false, 4:false, 5:false}
      })
    }
  }

  handleReviewsUpdate() {
    // updates the reviews list
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      headers: {'Authorization': API_KEY},
      params: {
        product_id: `${this.props.product.id}`,
        sort: `${this.state.sortType}`,
        count: 1000
      }
    }).then((values)=> {
        let allReviews = values.data.results;
        this.setState({
          allReviews: allReviews
        });
      })
      .catch((err)=> {
        console.log('err in trying to update reviews status', err);
      });
  }

  render() {
    // console.log(this.props);
    // maybe do the currentViews here.
    let filterObj = this.state.filter;
    let filter = Object.keys(filterObj).filter((star)=> filterObj[star]);
    filter = filter.map((item)=> parseInt(item));
    if (filter.length === 0) {
      filter = [1,2,3,4,5];
    }
    let currentReviews = this.state.allReviews.filter((review) => filter.includes(review.rating));
    let reviewsClass;
    if (currentReviews.length === 0) {
      reviewsClass = 'grid-container no-reviews';
    } else {
      reviewsClass = 'grid-container reviews';
    }
    return (
      <>
        <div className='reviews'>
          <h2>Ratings and Reviews</h2>
          <div id='reviews' className={reviewsClass}>
            <ReviewBreakdown filter={this.state.filter} averageRating={this.props.averageRating} meta={this.props.reviewMeta} ratings={this.props.ratings} handleClick = {this.handleFilter}/>
            <ReviewSort handleChange = {this.handleSort} currentSort = {this.state.sortType}/>
            {(currentReviews.slice(0, this.state.currentCount).length !== 0)
            ? <ReviewList reviews = {currentReviews.slice(0, this.state.currentCount)}/>
            : null}
            {(this.state.currentCount >= currentReviews.length || currentReviews.slice(0, this.state.currentCount).length === 0)
            ? null
            : <MoreReviews handleClick = {this.handleMore}/>}
            <AddReview handleUpdate = {this.handleReviewsUpdate} product={this.props.product} meta={this.props.reviewMeta}/>
          </div>
        </div>
      </>
    );
  }
}
export default Reviews;