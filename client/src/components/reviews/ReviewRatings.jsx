// Ratings Breakdown in ReviewBreakdown parent

import React from 'react';
import StarsDisplay from './../StarsDisplay';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      recommended: 0
    }
  }

  render() {
    // Breakdown: bars for each star rating, left of bar: star rating #, right of bar: count
    //   hover on bar changes background color
    //   click on star count turns on filter
    // Recommendations: shows percentage of reviews that recommend product
    let total = 0;
    let recommendTrue = 0;
    if (this.props.recommended) {
      let recommended=this.props.recommended;
      recommendTrue = parseInt(recommended.true);
      total = parseInt(recommended.false) + recommendTrue;
    }
    let filter = Object.keys(this.props.filter).filter((star)=> this.props.filter[star]);
    filter = filter.join(', ');
    return (
      <div id='reviews-ratings-breakdown'>
        <div className='ratings-summary'>
          <div className='reviews average-rating flex-box'><b>{this.props.averageRating}</b></div>
          <StarsDisplay key={this.props.averageRating} stars={this.props.averageRating} />
        </div>
        <p className='ratings total-reviews-count'>Total Reviews: {total}</p>
        <div className='ratings-breakdown'>
          {([1,2,3,4,5]).map((star)=> {
            return (
              <div key={star}>
                <span onClick={()=>(this.props.handleClick(star))} className='reviews ratings-and-filter flex-box'>
                  {star} star ratings:
                  <meter value={this.props.ratings[star]} max={total}></meter>
                  {this.props.ratings[star] || 0}
                </span>
              </div>
            );
          })}
        </div>
        {filter &&
        <div className='ratings-filter-view'>
          <p>
            Current Filters: {filter}
          </p>
          <button onClick={()=>(this.props.handleClick('clear'))}>Remove All Filters</button>
        </div>
        }
        <div className='ratings-recommendation'>
          <h4>
            {recommendTrue/total*100}% of reviewers recommend this product.
          </h4>
        </div>
      </div>
    );
  }
}
export default RatingsBreakdown;