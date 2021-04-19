import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizeSelected: false,
      currentSizeQuantity: 0
    };

    this.handleSelectSize = this.handleSelectSize.bind(this);

  }

  handleSelectSize(event) {
    if (this.props.currentStyleSkusObj[event.target.value]) {
      this.setState({sizeSelected: true, currentSizeQuantity: this.props.currentStyleSkusObj[event.target.value].quantity})
    } else {
      this.setState({sizeSelected: false, currentSizeQuantity: 0});
    }
  }

  render() {

    var skusArray = Object.keys(this.props.currentStyleSkusObj);

    var quantityArray = [];
    for (var i = 1; i < 16 && i < this.state.currentSizeQuantity + 1; i++) {
      quantityArray.push(i);
    }
    console.log(quantityArray);

    return (
      <div className = "checkout">
        Checkout
        <form>
          <label>
            Pick a size:
            {this.props.currentStyleTotalQuantity > 0 ?
            <select onChange = {this.handleSelectSize}>
              <option defaultValue>Select Size</option>
              {skusArray.map((sku, index) => {
                return (<option value = {sku} key = {index}>{this.props.currentStyleSkusObj[sku].size}</option>);
              } )}
            </select> :
            <select disabled>
              <option defaultValue>OUT OF STOCK</option>
            </select>
            }
          </label>
          <label>
            Pick a quantity:
            {this.state.sizeSelected ?
            <select>
              {quantityArray.map((quantity, index) => {
                return (<option value = {quantity} key = {index}>{quantity}</option>)
              })}
            </select>
            :
            <select disabled>
            <option defaultValue>-</option>
          </select> }
          </label>
          <div className = "add-to-cart">Add to Cart</div>
        </form>
      </div>
    )
  }
}

export default Checkout;