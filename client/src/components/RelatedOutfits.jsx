import React from 'react';
import RelatedOutfitsCard from './RelatedOutfitsCard.jsx';

class RelatedOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <div>
        <h1>YOUR OUTFIT</h1>
        <RelatedOutfitsCard />
      </div>
    )
  }
}

export default RelatedOutfits;