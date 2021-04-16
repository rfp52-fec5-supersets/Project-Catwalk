import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {}
    };
  }

  render() {
    return (
      <div className = "style-selector">Style Selector</div>
    )
  }
}

export default StyleSelector;