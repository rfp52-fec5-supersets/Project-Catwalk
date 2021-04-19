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
        {/* {JSON.stringify(this.props.currentStyleSkus)} */}
        Checkout
        <form>
          <label>
            Pick a size:
            <select>
              {this.props.currentStyleSkus.map((skuObj, index) => {
                return (<option value = {skuObj.size} key = {index}>{skuObj.size}</option>);
              } )}
            </select>
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