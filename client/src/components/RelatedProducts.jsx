import React from 'react';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: []
    }
  }



  render() {
    return (
      <div>
        <h1>RELATED PRODUCTS</h1>
        <RelatedProductsCard />
      </div>

    )
  }
}

export default RelatedProducts;