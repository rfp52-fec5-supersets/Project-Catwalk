import React from 'react';

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Write Your Review</h2>
        <h3>About the {this.props.product.name}</h3>
        <p>Overall Star Rating Here</p>
        <p>Do you recommend product?</p>
        <p>Characteristic Section</p>
        <p>Review Summary</p>
        <p>Review Body</p>
        <p>Upload photos</p>
        <p>nickname?</p>
        <p>email?</p>
        <p>Submit Button</p>
      </div>
    );
  }
}
export default AddReviewForm;