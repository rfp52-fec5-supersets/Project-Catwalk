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
        Product Info:
        Rating: {this.props.rating} (LINK TO REVIEWS)
        Category: {this.props.currentProduct.category}
        Title: {this.props.currentProduct.name}
        Price: {this.props.currentStyle.sale_price ? <div className = "original-price-strikethrough">{this.props.currentStyle.original_price}</div> : <div className = "original-price">{this.props.currentStyle.original_price}</div>} {this.props.currentStyle.sale_price && <div className = "sale-price">{this.props.currentStyle.sale_price}</div>}
        Features:
        {JSON.stringify(this.props.currentProduct.features)}
        Product Overview: {this.props.currentProduct.description}
        {/* {JSON.stringify(this.props.currentProduct)}
        {JSON.stringify(this.props.currentStyle)} */}
        Share: FACEBOOK     TWITTER     PINTEREST
      </div>
    )
  }
}

export default ProductInfo;