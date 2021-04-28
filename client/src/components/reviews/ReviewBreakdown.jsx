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
        <RatingsBreakdown filter={this.props.filter} handleClick={this.props.handleClick} averageRating={this.props.averageRating} ratings={this.props.ratings} recommended={this.props.meta.recommended}/>
        <hr class="rounded" style={{border: '2px solid #bbb', borderRadius: '2px'}}/>
        Product Breakdown
        <ProductBreakdown characteristics = {this.props.meta.characteristics}/>
      </div>
    );
  }
}
export default ReviewBreakdown;