import React from 'react';

class ReviewBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div id='reviews-breakdown' className='reviews-component'>
        Review Breakdown
      </div>
    );
  }
}
export default ReviewBreakdown;