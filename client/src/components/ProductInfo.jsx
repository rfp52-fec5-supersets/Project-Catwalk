import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {}
    };
  }

  render() {
    return (
      <div className = "product-info">Product Info</div>
    )
  }
}

export default ProductInfo;