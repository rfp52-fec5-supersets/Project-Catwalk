import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import RelatedOutfits from './RelatedOutfits.jsx';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div>
        <RelatedProducts/>
        <RelatedOutfits/>
      </div>
    )
  }
}

export default Related;