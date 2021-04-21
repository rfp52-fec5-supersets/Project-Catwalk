import React from 'react';
import AddStarRating from './AddStarRating.jsx'

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0
    }
    this.handleStar = this.handleStar.bind(this);
  }

  handleStar(starCount) {
    // When AddStarRating Component receives a click, it returns the star Count of the star.
    // 1-5
    this.setState({
      starRating: starCount
    })
  }

  render() {
    return (
      <div>
        <h2>Write Your Review</h2>
        <h3>About the {this.props.product.name}</h3>
        <p>Overall Star Rating Here</p>
        <AddStarRating starCount={this.state.starRating} handleClick = {this.handleStar}></AddStarRating>
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