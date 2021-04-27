import React from 'react';
import axios from 'axios';
import API_KEY from './../../config.js';
import MyOutfitCard from './MyOutfitCard.jsx';

class MyOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfits: JSON.parse(localStorage.getItem('outfit')) || [],
      leftIndex: 0,
      rightIndex: 3
    }
    this.addToOutfit = this.addToOutfit.bind(this);
    this.deleteOutfit = this.deleteOutfit.bind(this);
    this.handleOutfitScroll = this.handleOutfitScroll.bind(this);
  }

  addToOutfit(product, rating, photo) {
    // console.log('addToOutfit', this.state.outfits);
    var outfitExists = false;
    for (var i = 0; i < this.state.outfits.length; i++) {
      if (this.state.outfits[i].product.id === product.id) {
        outfitExists = true;
        break;
      }
    }
    if (outfitExists === false) {
      let outfitObj = { product: product, rating: rating, photo: photo };
      let outfits = this.state.outfits;
      outfits.push(outfitObj);
      this.setState({
        outfits: outfits
      })
      localStorage.setItem('outfit', JSON.stringify(this.state.outfits));
    }
    // console.log('local storage', localStorage);
  }

  deleteOutfit(outfit) {
    console.log('deleteOutfit');
    var outfitIndex = this.state.outfits.indexOf(outfit);
    console.log('outfitIndex', outfitIndex)
    this.state.outfits.splice(outfitIndex, 1);
    this.setState({
      outfits: this.state.outfits
    })
    localStorage.setItem('key', JSON.stringify(this.state.outfits));
  }

  handleOutfitScroll(event) {
    event.preventDefault();
    console.log('scroll button clicked', event)
    if (event.target.className === "left-outfit-button" && this.state.leftIndex !== 0) {
      this.setState({
        leftIndex: this.state.leftIndex - 1,
        rightIndex: this.state.rightIndex - 1
      })
    }
    if (event.target.className === "right-outfit-button" && this.state.rightIndex < this.state.outfits.length) {
      this.setState({
        leftIndex: this.state.leftIndex + 1,
        rightIndex: this.state.rightIndex + 1
      })
    }
  }

  render() {
    let outfitsToDisplay = this.state.outfits.map(outfit => {
      return <MyOutfitCard
        outfit={outfit} key={outfit.rating} deleteOutfit={() => this.deleteOutfit(outfit)} />
    })

    let leftIndex = this.state.leftIndex;
    let rightIndex = this.state.rightIndex;
    let leftButton = <a className="left-outfit-button" onClick={this.handleOutfitScroll}>&#10094;</a>
    let rightButton = <a className="right-outfit-button" onClick={this.handleOutfitScroll}>&#10095;</a>

    if (this.state.outfits.length === 0) {
      return (
        <div className="outfit">
          <div className="related-title">YOUR OUTFIT</div>
          <div className="outfits-container">
            <div className="outfits-card-button" >
              <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="outfit">
          <div className="related-title">YOUR OUTFIT</div>
          <div className="outfits-container">
            <div className="outfits-card" >
              <a className="add-button" onClick={() => this.addToOutfit(this.props.currentProduct, this.props.averageRating, this.props.currentStylePhotos[0].thumbnail_url)}> Add Outfit+ </a>
            </div >
            {outfitsToDisplay.slice(leftIndex, rightIndex)}
          </div>
          {rightIndex >= this.state.outfits.length ? <div>{null}</div> : rightButton}
          {leftIndex === 0 ? <div>{null}</div> : leftButton}
        </div>
      )
    }
  }
}

export default MyOutfit;