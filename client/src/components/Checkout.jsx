import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {}
    };
  }

  render() {
    return (
      <div className = "checkout">
        {console.log(JSON.stringify(this.props.currentStyleSkus))}
        Checkout
        <form>
          <label>
            Pick a size:
            {this.props.currentStyleTotalQuantity > 0 ?
            <select>
              <option selected>Select Size</option>
              {this.props.currentStyleSkus.map((skuObj, index) => {
                return (<option value = {skuObj.size} key = {index}>{skuObj.size}</option>);
              } )}
            </select> :
            <select disabled>
              <option selected>OUT OF STOCK</option>
            </select>
            }

          </label>
          <label>
            Pick a quantity:
            <select>
            </select>
          </label>
          <div className = "add-to-cart">Add to Cart</div>
        </form>
      </div>
    )
  }
}

export default Checkout;