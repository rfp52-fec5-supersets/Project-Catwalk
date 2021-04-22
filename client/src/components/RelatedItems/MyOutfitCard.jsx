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
      <div className="column">
        <div className="my-outfits-card">
          <img className="hover-shadow cursor" src={this.props.outfit.photo}></img>
          <a className="x-button"> {"X"}</a>
          <div className="cardInfo">
            <div>{this.props.outfit.product.category}</div>
            <div> {this.props.outfit.product.name}</div>
            <div>{this.props.outfit.product.default_price}</div>
            <div><StarsDisplay stars={this.props.outfit.rating} key={this.props.outfit.rating} /></div>
          </div>
        </div >
      </div>
    )
  }
}

export default MyOutfitCard
  ;