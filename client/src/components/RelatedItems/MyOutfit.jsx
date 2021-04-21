import React from 'react';
import MyOutfitCard from './MyOutfitCard.jsx';

class MyOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    return (
      <div>
        <h1>YOUR OUTFIT</h1>
        <MyOutfitCard />
      </div>
    )
  }
}

export default MyOutfit;