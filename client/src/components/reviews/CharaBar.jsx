// Product Breakdown in ReviewBreakdown parent

import React from 'react';

class CharaBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let characteristic = this.props.characteristic;
    let quality = this.props.quality;
    let leftMessage = 'Poor';
    let middleMessage = 'Medium';
    let rightMessage = 'Best';
    if ((['Size','Width','Length'].includes(quality))) {
      middleMessage = 'Perfect';
    }
    if (quality === 'Size') {
      leftMessage = 'Too Small';
      rightMessage = 'Too Big';
    } else if (quality === 'Width') {
      leftMessage = 'Too Narrow';
      rightMessage = 'Too Wide';
    } else if (quality === 'Length') {
      leftMessage = 'Too Short';
      rightMessage = 'Too Long';
    }
    return (
      <div key= {characteristic.id} className='reviews product-characteristic'>
        {/* style={{position:'relative', width:'90%'}} */}
        <p style={{textAlign:'center'}}>
          <em>{quality}</em>
        </p>
        {/* keep the style in-line to use characteristic.value as variable */}
        <span className="reviews characteristic-pointer" style={{position: 'absolute', marginLeft:'-5.11px', left: `${(characteristic.value - 1) * 100 / 4}%`, marginTop:'-0.75em'}}>&#x25BE;</span>
        {/* transform:'translateX(-5.11px)' */}
        <div className="reviews characteristic-bar flex-box">
          <div className="reviews characteristic-bar-part">&nbsp;</div>
          <div className="reviews characteristic-bar-part">&nbsp;</div>
          <div className="reviews characteristic-bar-part">&nbsp;</div>
        </div>
        {/*  style={{backgroundColor: 'gray', width: '33%', height: '.5em'}} */}
        <div className="reviews characteristic-message flex-box">
          <span>{leftMessage}</span>
          <span>{middleMessage}</span>
          <span>{rightMessage}</span>
        </div>
      </div>
    );
  }
}
export default CharaBar;