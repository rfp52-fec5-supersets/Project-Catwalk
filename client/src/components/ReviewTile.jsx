import React from 'react';

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
          Date: {review.date}
        </div>
        <div className='review-summary'>
          Summary: {review.summary}
        </div>
        <div className='review-body'>
          Body: {review.body}
          {/* Images: {review.photos} */}
          {/* What if no images */}
        </div>
        {(review.recommend)
        ? 'I recommend this'
        : null}
        <div className='review-username'>
          username: {review.reviewer_name}
        </div>
        {(review.response)
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