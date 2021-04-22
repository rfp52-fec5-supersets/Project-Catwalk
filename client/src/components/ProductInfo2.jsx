import React from 'react';

class ProductInfo2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <div id = "product-info-2">
          <div id = "product-overview"><b>Description:</b> {this.props.currentProduct.description}</div>
          <div id = "product-features">
          <b>Specifications:</b>
          {this.props.currentProductFeatures.map((feature) => {
          return (
            <div className = "feature">
              {feature.feature}: {feature.value}
            </div>
          )
        })}
          </div>
        </div>
    )
  }
}

export default ProductInfo2;