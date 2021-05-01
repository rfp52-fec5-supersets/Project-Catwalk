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
    let averageRating = Math.round(this.props.averageRating * 10) / 10;
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
          <div className='reviews average-rating flex-box'>
            <b>{averageRating}</b>
            &nbsp;
            <StarsDisplay key={this.props.averageRating} stars={averageRating} />
          </div>
        </div>
        <p className='ratings total-reviews-count'>Total Reviews: {total}</p>
        <div className='ratings-breakdown'>
          {([1,2,3,4,5]).map((star)=> {
            return (
              <div key={star}>
                <span onClick={()=>(this.props.handleClick(star))} className='reviews ratings-and-filter flex-box'>
                  {star} star ratings: &nbsp;
                  <meter value={this.props.ratings[star]} max={total}></meter> &nbsp;
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
          <p>
            {Math.round(recommendTrue/total*100)}% of reviewers recommend this product.
          </p>
        </div>
      </div>
    );
  }
}
export default RatingsBreakdown;