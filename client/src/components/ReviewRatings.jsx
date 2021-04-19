// Ratings Breakdown in ReviewBreakdown parent

import React from 'react';

class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      recommended: 0
    }
  }

  render() {
    // Ratings summary: Display avg rating with number and star icon, total count of reviews
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
    console.log(this.props.ratings);
    return (
      <div id='reviews-ratings-breakdown'>
        Ratings Breakdown:
        <div className='ratings-summary'>
          <p>Overall Star Rating: {this.props.averageRating}</p>
          <p>Stars here</p>
        </div>
        <div className='ratings-breakdown'>
          {Object.keys(this.props.ratings).map((star)=> {
            return (<p key={star}>
              {star} star ratings: {this.props.ratings[star]}
            </p>);
          })}
        </div>
        <div className='ratings-recommendation'>
          <h4>
            {recommendTrue/total*100}% of reviewers recommend this item.
          </h4>
        </div>
      </div>
    );
  }
}
export default RatingsBreakdown;