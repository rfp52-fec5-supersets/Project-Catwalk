// Product Breakdown in ReviewBreakdown parent

import React from 'react';
import CharaBar from './CharaBar.jsx'

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {characteristics} = this.props;
    let productQualities = null;
    if (characteristics) {
      let qualities = Object.keys(characteristics);
      productQualities = qualities.map((quality)=> {
        let characteristic = characteristics[quality];
        return (
          <CharaBar characteristic={characteristic} quality={quality} />
        );
      })
    }
    return (
      <div id='reviews-product-breakdown' className = 'flex-box reviews product-breakdown'>
        <span>Product Breakdown</span>
        {productQualities}
      </div>
    );
  }
}
export default ProductBreakdown;