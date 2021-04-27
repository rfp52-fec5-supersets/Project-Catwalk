import React from 'react';

class MoreReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <button id='reviews-more' className='reviews-component' onClick={this.props.handleClick}>
          More Reviews
        </button>
      </>
    );
  }
}
export default MoreReviews;