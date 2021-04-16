import React from 'react';
import API_KEY from './../config.js'
import axios from 'axios';
import ReviewList from './ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      meta: {},
      sortType: 'relevant'
    };
    // sortTypes are either newest, helpful, or relevant
  }

  componentDidUpdate(prevProps) {
    // Component updates when changes to prop or state.
    // can set up so both axios request go asynchronously, or set it up so it goes one at a time.
    // prefer to have it so that this.setState works at the same time.
    // Promise.all.
    if (this.props.product !== prevProps.product) {
      let promises = [];
      promises.push(axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
        headers: {'Authorization': API_KEY},
        params: {
          product_id: `${this.props.product.id}`,
          sort: `${this.state.sortType}`
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
    return (
      <div id='reviews'>
        REVIEWS WRAPPER
        <div> Breakdown </div>
        <ReviewList reviews = {this.state.reviews}/>
        <div> Review Tile </div>
        <div> Add Review </div>
      </div>
    );
  }
}
export default Reviews;