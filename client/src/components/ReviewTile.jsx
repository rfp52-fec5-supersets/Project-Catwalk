import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='reviews-tile' className='reviews-component'>
        {JSON.stringify(this.props.review)}
      </div>
    );
  }
}
export default ReviewTile;