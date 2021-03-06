import React from 'react';
import StarsDisplay from '../StarsDisplay.jsx';
import ComparisonModal from './ComparisonModal.jsx';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderModal: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    console.log('toggle Modal');
    this.setState({
      renderModal: !this.state.renderModal
    })
  }

  render() {
    let wholeStar = <svg width="25" height="25" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.28347 1.54595C5.57692 0.951356 6.42479 0.951358 6.71825 1.54595L7.82997 3.79856L10.3159 4.15979C10.9721 4.25513 11.2341 5.06151 10.7592 5.52434L8.96043 7.27775L9.38507 9.75361C9.49716 10.4071 8.81122 10.9055 8.22431 10.597L6.00086 9.42801L3.7774 10.597C3.19049 10.9055 2.50455 10.4071 2.61664 9.75361L3.04128 7.27775L1.24246 5.52434C0.767651 5.06151 1.02966 4.25513 1.68584 4.15979L4.17174 3.79856L5.28347 1.54595Z" fill="#20b2aa" />
    </svg>;

    let salePrice =
      <div className="price-wrapper">
        <div className="sale-price">{this.props.salePrice}</div>
        <div className="default-price">{'$' + this.props.originalPrice}</div>
      </div>

    let price = <div>{'$' + this.props.originalPrice}</div>

    // let price = <div className="default-price">{'$' + this.props.relatedProduct.default_price}</div>

    let starButton = <a className="star-button" onClick={this.toggleModal}>{wholeStar}</a>
    // onerror="this.onerror=null; this.src='Default.jpg'"
    let productCard =
      <div className="related-products-card" onClick={this.props.handleCardClick}>
        <img className="product-photo" src={this.props.relatedImage} onerror="this.src='https://i.imgur.com/bLIxvoi.png'"></img>
        <div className="card-info">
          <div>{this.props.relatedProduct.category}</div>
          <div className="card-info-name">{this.props.relatedProduct.name}</div>
          {/* {price} */}
          {this.props.salePrice === null ? price : salePrice}
          <div>
            <StarsDisplay
              stars={this.props.relatedRating}
              key={this.props.relatedRating} />
          </div>
        </div>
      </div >

    let comparisonModal =
      <div className="comparison-modal">
        <ComparisonModal
          renderModal={this.state.renderModal}
          onClose={this.toggleModal}
          currentProduct={this.props.currentProduct}
          relatedProduct={this.props.relatedProduct}
          currentFeatures={this.props.currentFeatures} />
      </div>

    return (
      <>
        {starButton}
        {productCard}
        {comparisonModal}
      </>
    )
  }
}

export default RelatedProductsCard;