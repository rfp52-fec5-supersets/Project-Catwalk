import React from 'react';

let CharaMessages = {
  Size: ['A size too small',
    'Perfect',
    'A size too wide'],
  Width: ['Too narrow',
    'Perfect',
    'Too wide'],
  Comfort: ['Uncomfortable',
    'Ok',
    'Perfect'],
  Quality: ['Poor',
    'What I expected',
    'Perfect'],
  Length: ['Runs Short',
    'Perfect',
    'Runs long'],
  Fit: ['Runs tight',
    'Perfect',
    'Runs long']
}

class CharaBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let characteristic = this.props.characteristic;
    let quality = this.props.quality;
    let leftMessage = CharaMessages[quality][0];
    let middleMessage = CharaMessages[quality][1];
    let rightMessage = CharaMessages[quality][2];
    return (
      <div className='reviews product-characteristic'>
        <p style={{textAlign:'center'}}>
          <em>{quality}</em>
        </p>
        <span className="reviews characteristic-pointer" style={{position: 'absolute', marginLeft:'-5.11px', left: `${(characteristic.value - 1) * 100 / 4}%`, marginTop:'-0.75em'}}>&#x25BE;</span>
        <div className="reviews characteristic-bar flex-box">
          <div className="reviews characteristic-bar-part">&nbsp;</div>
          <div className="reviews characteristic-bar-part">&nbsp;</div>
          <div className="reviews characteristic-bar-part">&nbsp;</div>
        </div>
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