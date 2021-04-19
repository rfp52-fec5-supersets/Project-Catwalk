// Product Breakdown in ReviewBreakdown parent

import React from 'react';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    let characteristics = this.props.characteristics;
    let productQualities = null;
    if (characteristics) {
      let qualities = Object.keys(characteristics);
      productQualities = qualities.map((quality)=> {
        return (
          <div key= {characteristics[quality].id} className='product-characteristic'>
            <p>
              {quality}
            </p>
            bar with {characteristics[quality].value}
          </div>
        );
      })
    }
    return (
      <div id='reviews-product-breakdown'>
        Product Breakdown
        {productQualities}
      </div>
    );
  }
}
export default ProductBreakdown;