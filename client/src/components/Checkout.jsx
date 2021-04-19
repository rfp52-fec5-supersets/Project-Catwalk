import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizeSelected: false,
      pleaseSelectSize: false,
      currentSizeQuantity: 0
    };

    this.handleSelectSize = this.handleSelectSize.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleSelectSize(event) {
    if (event.target.value === 'select-size') {
      this.setState({sizeSelected: false, currentSizeQuantity: 0});
    }

    if (this.props.currentStyleSkusObj[event.target.value]) {
      this.setState({sizeSelected: event.target.value, currentSizeQuantity: this.props.currentStyleSkusObj[event.target.value].quantity, pleaseSelectSize: false});
    }
  }

  handleClick(event) {
    if (this.state.sizeSelected === false) {
      this.setState({pleaseSelectSize: true});
    }
  }

  render() {

    var skusArray = Object.keys(this.props.currentStyleSkusObj);

    var quantityArray = [];
    for (var i = 1; i < 16 && i < this.state.currentSizeQuantity + 1; i++) {
      quantityArray.push(i);
    }

    return (
      <div className = "checkout">
        Checkout
        <form>
          <label>
            Pick a size:
            {this.state.pleaseSelectSize && <div id = "please-select-size">Please select size!</div>}
            {this.props.currentStyleTotalQuantity > 0 ?
            <select onChange = {this.handleSelectSize}>
              <option value = "select-size" defaultValue>Select Size</option>
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
          {this.props.currentStyleTotalQuantity > 0 && <div className = "add-to-cart" onClick = {this.handleClick}>Add to Cart</div>}
        </form>
      </div>
    )
  }
}

export default Checkout;