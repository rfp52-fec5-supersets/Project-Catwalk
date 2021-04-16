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
      <div className = "checkout">Checkout</div>
    )
  }
}

export default Checkout;