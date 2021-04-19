import React from 'react';

class MoreReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='reviews-more' className='reviews-component'>
        <button onClick={this.props.handleClick}>
          More Reviews
        </button>
      </div>
    );
  }
}
export default MoreReviews;