import React from 'react';
import axios from 'axios';
import API_KEY from '../../config.js';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizeSelected: false,
      pleaseSelectSize: false,
      currentSizeQuantity: 0,
      selectedQuantity: 1
    };

    this.handleSelectSize = this.handleSelectSize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectQuantity = this.handleSelectQuantity.bind(this);

  }

  handleSelectSize(event) {
    if (event.target.value === 'select-size') {
      this.setState({sizeSelected: false, currentSizeQuantity: 0});
    }

    if (this.props.currentStyleSkusObj[event.target.value]) {
      this.setState({sizeSelected: event.target.value, currentSizeQuantity: this.props.currentStyleSkusObj[event.target.value].quantity, pleaseSelectSize: false});
      var dropdown = document.getElementById('size-selector');
      dropdown.size = 0;
      console.log(this.state);
    }
  }

  handleSelectQuantity(event) {
    this.setState({selectedQuantity: Number(event.target.value)});
    console.log(this.state);
  }

  handleClick(event) {
    if (this.state.sizeSelected === false) {
      this.setState({pleaseSelectSize: true});

      var dropdown = document.getElementById('size-selector');
      if (dropdown) {
        dropdown.size = dropdown.options.length;
      }
      return;
    }

    var promises = [];
    // console.log(this.state.selectedQuantity);
    for (var i = 0; i < this.state.selectedQuantity; i++) {

      var promise = axios({
        method: 'post',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
        data: {sku_id: this.state.sizeSelected},
        headers: {Authorization: API_KEY}
      });

      promises.push(promise);
    }

    Promise.all(promises)
    .then(() => {
      axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart',
        data: {sku_id: this.state.sizeSelected},
        headers: {Authorization: API_KEY}
      })
      .then((results) => {
        console.log('Cart:', results.data);
      })
    })

  }

  render() {

    var skusArray = Object.keys(this.props.currentStyleSkusObj);

    var quantityArray = [];
    for (var i = 1; i < 16 && i < this.state.currentSizeQuantity + 1; i++) {
      quantityArray.push(i);
    }

    return (
      <div className = "checkout">
        <form className = "checkout-form">
          <label>
            Select size:
            {this.state.pleaseSelectSize && <div id = "please-select-size">Please select size!</div>}
            {this.props.currentStyleTotalQuantity > 0 ?
            <select id = "size-selector" onChange = {this.handleSelectSize}>
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
            Select quantity:
            {this.state.sizeSelected ?
            <select onChange = {this.handleSelectQuantity}>
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