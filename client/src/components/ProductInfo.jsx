import React from 'react';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className = "product-info">
        <div id = "rating">Rating: {this.props.rating} (LINK TO REVIEWS)</div>
        <div id = "category">Category: {this.props.currentProduct.category}</div>
        <div id = "title">Title: {this.props.currentProduct.name}</div>
        <div id = "price">
        Price: {this.props.currentStyle.sale_price ? <div className = "original-price-strikethrough">{this.props.currentStyle.original_price}</div> : <div className = "original-price">{this.props.currentStyle.original_price}</div>} {this.props.currentStyle.sale_price && <div className = "sale-price">{this.props.currentStyle.sale_price}</div>}
        </div>


          <div id = "product-overview">Product Overview: {this.props.currentProduct.description}</div>
          <div id = "product-features">
          {this.props.currentProductFeatures.map((feature) => {
          return (
            <div className = "feature">
              {feature.feature}: {feature.value}
            </div>
          )
        })}
          </div>
        {/* {JSON.stringify(this.props.currentProduct.features)} */}

        <div id = "socials">
        Share: FACEBOOK     TWITTER     PINTEREST
        </div>
      </div>
    )
  }
}

export default ProductInfo;