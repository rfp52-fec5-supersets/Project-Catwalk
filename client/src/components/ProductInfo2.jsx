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
          <div id = "product-overview"><div><b>Description</b></div> {this.props.currentProduct.description}</div>
          <div id = "product-features">
          <b>Specifications</b>
          <ul>
          {this.props.currentProductFeatures.map((feature) => {
          return (
            <li className = "feature">
              <b>{feature.feature}:</b> {feature.value}
            </li>
          )
        })}
          </ul>
          </div>
        </div>
    )
  }
}

export default ProductInfo2;