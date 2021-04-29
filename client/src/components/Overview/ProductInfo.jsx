import React from 'react';
import StarsDisplay from '../StarsDisplay.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    var totalReviews = 0;
    for (var key in this.props.reviewMeta.ratings) {
      totalReviews += Number(this.props.reviewMeta.ratings[key]);
    }

    return (
      <div className = "product-info">
        <h1 id = "title"> {this.props.currentProduct.name}</h1>
        <div id = "price">
        {this.props.currentStyle.sale_price ? <div className = "original-price-strikethrough">{'$'+this.props.currentStyle.original_price}</div> : <div className = "original-price">{'$'+this.props.currentStyle.original_price}</div>} {this.props.currentStyle.sale_price && <div className = "sale-price">{'$'+this.props.currentStyle.sale_price}</div>}
        </div>
        <div id = "rating"><StarsDisplay stars = {this.props.rating} key = {this.props.rating}/> <div id = "rating-number">{this.props.rating}  {totalReviews > 0 && <span>(<a href = "#reviews">{totalReviews}</a>)</span>}</div></div>

        <div id = "category"><b>Category:</b> {this.props.currentProduct.category}</div>
        {/* <div id = "product-info-2">
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
        </div> */}
        {/* {JSON.stringify(this.props.currentProduct.features)} */}

        <div id = "socials">
        <b id = "share-title">Share:</b>
        <iframe title="facebook share" src="https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2F127.0.0.1%3A8080%2F&layout=button&size=small&width=67&height=20&appId" width="67" height="20" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false"><span className="label" id="l">Tweet</span></a>

        <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"></a>
        </div>
      </div>
    )
  }
}

export default ProductInfo;