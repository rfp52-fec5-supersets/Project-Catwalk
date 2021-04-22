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
          <table>
          {this.props.currentProductFeatures.map((feature) => {
          return (
            <tr className = "feature-table">
              <td className = "feature-name"><b>{feature.feature}</b></td> <td className = "feature-value">{feature.value}</td>
            </tr>
          )
        })}
          </table>
          </div>
        </div>
    )
  }
}

export default ProductInfo2;