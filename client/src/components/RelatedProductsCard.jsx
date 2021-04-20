import React from 'react';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return <ul>
      {this.props.relatedProduct.category}
      {this.props.relatedProduct.name}
      {this.props.relatedProduct.price}
      {this.props.relatedProduct.rating}
    </ul>
  }
}

export default RelatedProductsCard;