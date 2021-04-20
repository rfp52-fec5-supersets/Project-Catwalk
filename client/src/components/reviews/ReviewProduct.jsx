// Product Breakdown in ReviewBreakdown parent

import React from 'react';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
  }

  // <span className="characteristic-pointer" style={{ left: `${(characteristic.value - 1) * 100 / 4}%` }}>&#x25BE;</span>

  render() {
    let {characteristics} = this.props;
    let productQualities = null;
    if (characteristics) {
      let qualities = Object.keys(characteristics);
      productQualities = qualities.map((quality)=> {
        let characteristic = characteristics[quality];
        console.log(characteristic);
        return (
          <div key= {characteristic.id} className='product-characteristic' style={{position:'relative', width:'90%'}}>
            <p>
              {quality}
            </p>
            bar with {characteristic.value}
            <br />
            <br />
            <span className="characteristic-pointer" style={{ position: 'absolute', marginLeft:'-5.11px', left: `${(characteristic.value - 1) * 100 / 4}%`, marginTop:'-0.75em'}}>&#x25BE;</span>
            {/* <span className="characteristic-pointer" style={{ float: 'left', marginLeft: `${(characteristic.value - 1) * 100 / 4}%`, marginTop:'0.4em', zIndex:'1'}}>&#x25BE;</span> */}
            {/* transform:'translateX(-5.11px)' */}
            <div style={{backgroundColor: 'gray', width: '100%', height: '.5em'}}>&nbsp;</div>
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