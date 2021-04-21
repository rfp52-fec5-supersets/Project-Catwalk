import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedPhotos: []
    }
  }

  handleCardClick(event) {

  }

  render() {
    return (
      <div>
        <h1>RELATED PRODUCTS</h1>
        {this.props.relatedProducts.map(product => {
          return <RelatedProductsCard relatedProduct={product} currentPhotos={this.props.currentPhotos} onClick={this.handleCardClick} />
        })}
      </div>
    )
  }
}

export default RelatedProducts;