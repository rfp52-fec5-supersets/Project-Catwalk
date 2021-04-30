import React from 'react';
import StarsDisplay from '../StarsDisplay.jsx';

class MyOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="outfits-card">
        <img className="product-photo" src={this.props.outfit.photo}></img>
        <a className="x-button" onClick={this.props.deleteOutfit}> {"X"}</a>
        <div className="card-info">
          <div>{this.props.outfit.product.category}</div>
          <div className="card-info-name">{this.props.outfit.product.name}</div>
          <div>{'$' + this.props.outfit.product.default_price}</div>
          <div><StarsDisplay stars={this.props.outfit.rating} key={this.props.outfit.rating} /></div>
        </div>
      </div >
    )
  }
}

export default MyOutfitCard;