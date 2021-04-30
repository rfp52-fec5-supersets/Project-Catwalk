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
    let charaId= [];
    if (this.props.meta.characteristics) {
      characteristics = Object.keys(this.props.meta.characteristics);
      charaId = characteristics.map((chara)=>{return this.props.meta.characteristics[chara].id});
    }
    return (
      <>
        <button id='reviews-add' onClick={this.handleToggle}>Add Review</button>
        {this.state.showModal &&
        <ModalImage onCloseRequest={this.handleToggle}>
          <AddReviewForm product={this.props.product} characteristics = {characteristics} charaId = {charaId} handleClose={this.handleToggle} handleUpdate={this.props.handleUpdate}/>
        </ModalImage>}
      </>
    );
  }
}
export default AddReview;