import React from 'react';
import ProductBreakdown from './ReviewProduct.jsx';
import RatingsBreakdown from './ReviewRatings.jsx';

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // ratings breakdown needs: avg rating, individual star ratings, and recommendations
    // product breakdown needs: characteristics
    return (
      <div id='reviews-breakdown' className='reviews-component'>
        Review Breakdown
        <RatingsBreakdown averageRating={this.props.averageRating} ratings={this.props.ratings} recommended={this.props.meta.recommended}/>
        <ProductBreakdown characteristics = {this.props.meta.characteristics}/>
      </div>
    );
  }
}
export default ReviewBreakdown;