import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter:[]
    }
  }

  render() {

    let ReviewTiles = this.props.reviews.map((review)=> {
      return <ReviewTile key={review.review_id} review={review}/>
    });
    return (
      <div id='reviews-list' className='reviews-component'>
        <p style={{fontWeight: 'bold', fontSize:'bigger'}}>
          ReviewList:
        </p>
        {ReviewTiles}
      </div>
    );
  }
}
export default ReviewList;