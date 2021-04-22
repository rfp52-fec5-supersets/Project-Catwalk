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
          <div id = "product-overview"><div><b>Description:</b></div> {this.props.currentProduct.description}</div>
          <div id = "product-features">
          <b>Specifications:</b>
          <table><tbody>
          {this.props.currentProductFeatures.map((feature, index) => {
          return (
            <tr className = "feature-table" key = {index}><td className = "feature-name" key = {index}><b>{feature.feature}</b></td><td className = "feature-value">{feature.value}</td></tr>
          )
        })}
          </tbody></table>
          </div>
        </div>
    )
  }
}

export default ProductInfo2;