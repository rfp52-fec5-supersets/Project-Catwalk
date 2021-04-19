import React from 'react';
import moment from 'moment';
import ReviewTileBody from './ReviewTileBody.jsx';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let review = this.props.review;
    return (
      <div id='reviews-tile' className='reviews-component'>
        <div className='reviews star-rating'>
          Stars: {review.rating} stars
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
        ? 'I recommend this, checkmark icon'
        : null}
        <div className='review-username'>
          username: {review.reviewer_name}
        </div>
        {(review.response !== null)
        ? (<div className='review-response'>
            Response: {review.response}
          </div>)
        : null}
        <div className='review-helpfulness'>
          Helpfulness: {review.helpfulness}
        </div>
        <br />
      </div>
    );
  }
}
export default ReviewTile;