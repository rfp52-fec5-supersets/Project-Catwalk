import React from 'react';
import AddStarRating from './AddStarRating.jsx'

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starRating: 0
    }
    this.handleStar = this.handleStar.bind(this);
    this.handleRecommended = this.handleRecommended.bind(this);
  }

  handleStar(starCount) {
    // When AddStarRating Component receives a click, it returns the star Count of the star.
    // 1-5
    this.setState({
      starRating: starCount
    })
  }

  handleRecommended(e) {
    this.setState({
      recommended: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Write Your Review</h2>
        <h3>About the {this.props.product.name}</h3>
        <AddStarRating starCount={this.state.starRating} handleClick = {this.handleStar}></AddStarRating>
        <p>Do you recommend product?</p>
        <div className='add-review recommended-form'>
          <input type='radio' name='recommend' value={true} id='add-review-recommended-yes' required='required' checked={this.state.recommended === 'true'} onChange={this.handleRecommended}></input>
          <label htmlFor='add-review-recommended-yes'>Yes</label>
          <input type='radio' name='recommend' value={false} id='add-review-recommended-no' required='required' checked={this.state.recommended === 'false'} onChange={this.handleRecommended}></input>
          <label htmlFor='add-review-recommended-no'>No</label>
        </div>
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