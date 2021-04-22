import React from 'react';
import ModalImage from './ModalImage.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

  render() {
    let characteristics = [];
    if (this.props.meta.characteristics) {
      characteristics = Object.keys(this.props.meta.characteristics)
    }
    return (
      <div id='reviews-add'>
        <button onClick={this.handleToggle}>Add Review</button>
        {this.state.showModal &&
        <ModalImage onCloseRequest={this.handleToggle}>
          <AddReviewForm product={this.props.product} characteristics = {characteristics}/>
        </ModalImage>}
      </div>
    );
  }
}
export default AddReview;