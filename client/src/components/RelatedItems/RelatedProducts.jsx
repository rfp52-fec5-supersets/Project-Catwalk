import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedPhotos: []
    }
    // this.handleCardClick = this.handleCardClick.bind(this);
    // this.handleStarClick = this.handleStarClick.bind(this);
  }

  // handleCardClick(product) {
  //   //RERENDER WITH SELECTED PRODUCT
  //   event.preventDefault();
  //   console.log('product card clicked', product);
  // }
  // handleStarClick(product) {
  //   //IF STAR ACTION BUTTON IS CLICKED
  //   //POP UP MODAL
  //   event.preventDefault();
  //   console.log('star button clicked', product);
  // }

  render() {
    return (
      <div>
        <RelatedProductsCard relatedProduct={this.props.relatedProduct} handleCardClick={this.props.handleCardClick} />
      </div>
    )
  }
}

export default RelatedProducts;