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
    return (
      <div id='reviews-add'>
        <button onClick={this.handleToggle}>Add Review</button>
        {this.state.showModal &&
        <ModalImage onCloseRequest={this.handleToggle}>
          <AddReviewForm />
        </ModalImage>}
      </div>
    );
  }
}
export default AddReview;