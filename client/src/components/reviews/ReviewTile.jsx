import React from 'react';
import moment from 'moment';
import ReviewTileBody from './ReviewTileBody.jsx';
import API_KEY from './../../config.js'
import axios from 'axios';
import StarsDisplay from './../StarsDisplay.jsx';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false
    }
    this.handleReport = this.handleReport.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
  }

  handleReport() {
    // api call to report
    let id = this.props.review.review_id;
    axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/report`,
      headers: {'Authorization': API_KEY},
      params: {
        review_id: id
      }
    })
    .then(()=> {
      this.setState({
        voted: 'voted-no'
      });
    })
    .catch(()=> {
      console.log('err in reporting review');
    });
  }

  handleHelpful() {
    // api call to increment helpful
    let id = this.props.review.review_id;
    axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${id}/helpful`,
      headers: {'Authorization': API_KEY},
      params: {
        review_id: id
      }
    })
    .then(()=> {
      this.setState({
        voted: 'voted-yes'
      });
    })
    .catch(()=> {
      console.log('err in reporting review');
    });
  }

  render() {
    let review = this.props.review;
    let voted = this.state.voted;
    return (
      <div id='reviews-tile' className='reviews-component'>
        <StarsDisplay stars={review.rating} />
        <div className='review-username'>
          username: {review.reviewer_name}
        </div>
        <div className='review-date'>
          Date: {moment(review.date).format('MMMM DD, YYYY')}
        </div>
        <div className='review-summary'>
          {/* Unsure if need to ensure title is 60 chars or less */}
          {/* Also unsure if want to implement line break wraps like in the example */}
          <h4>
            <b>Summary: {review.summary}</b>
          </h4>
        </div>
        <ReviewTileBody body={review.body} photos={review.photos}/>
        {(review.recommend)
        ? <p>
          <span className='reviews-checkmark'>
              &#10003;
          </span>
          &nbsp;I recommend this!
        </p>
        : null}
        {(review.response !== null)
        ? (<div className='review-response'>
            Response From Seller: <br />
            {review.response}
          </div>)
        : null}
        <div className='review-helpfulness'>
          <p>Was this helpful?</p>
          {(voted)
          ? <p>
              <span className={(voted === 'voted-yes') ? 'voted-yes': 'voted'}>Yes ({(voted === 'voted-yes') ? review.helpfulness + 1: review.helpfulness})</span>
              &nbsp;&nbsp;
              <span className={(voted === 'voted-no') ? 'voted-no': 'voted'}>Report</span>
            </p>
          : <p>
              <span onClick={this.handleHelpful}>Yes ({review.helpfulness})</span>
              &nbsp;&nbsp;
              <span onClick={this.handleReport} >Report</span>
            </p>}
        </div>
        <br />
      </div>
    );
  }
}
export default ReviewTile;