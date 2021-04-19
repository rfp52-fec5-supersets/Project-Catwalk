import React from 'react';
import moment from 'moment';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let review = this.props.review;
    console.log(review.photos)
    return (
      <div id='reviews-tile' className='reviews-component'>
        <div className='reviews star-rating'>
          Stars: {review.rating} stars
        </div>
        <div className='review-date'>
          Date: {moment(review.date).format('MMMM DD, YYYY')}
        </div>
        <div className='review-summary'>
          <h4>
            <b>Summary: {review.summary}</b>
          </h4>
        </div>
        <div className='review-body'>
          Body: {review.body}
          {/* Images: {review.photos} */}
          {/* What if no images */}
        </div>
        {(review.photos)
          ? <div className='review-images'>
              Images:
              {review.photos.map((image)=> {
                return (
                <div key={image.id}>
                  {image.url}
                </div>
                );
              })}
            </div>
          : null}
        {(review.recommend)
        ? 'I recommend this'
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