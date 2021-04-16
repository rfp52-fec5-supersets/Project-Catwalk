import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.review);
    return (
      <div id='reviews-tile'>
        {JSON.stringify(this.props.review)}
      </div>
    );
  }
}
export default ReviewTile;