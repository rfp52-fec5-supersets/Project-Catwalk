import React from 'react';
import axios from 'axios';
import API_KEY from './../../config.js';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedImage: [],
      relatedRating: 0,
      salePrice: null,
      originalPrice: null
    }
    this.getRelatedProductsImage = this.getRelatedProductsImage.bind(this);
    this.getRelatedProductsRating = this.getRelatedProductsRating.bind(this);
  }

  componentDidMount() {
    this.getRelatedProductsImage(this.props.relatedProduct.id);
    this.getRelatedProductsRating(this.props.relatedProduct.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.relatedProduct !== prevProps.relatedProduct) {
      this.getRelatedProductsImage(this.props.relatedProduct.id);
      this.getRelatedProductsRating(this.props.relatedProduct.id);
    }
  }

  getRelatedProductsImage(id) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: { 'Authorization': API_KEY }
    })
      // .then(response => {
      //   this.setState({
      //     relatedImage: response.data.results[0].photos[0].thumbnail_url
      //   })
      // })
      .then(response => {
        console.log('response', response);
        let styles = [];
        response.data.results.map(style => {
          if (style['default?'] === true) {
            styles.push(style.original_price);
            styles.push(style.sale_price);
            styles.push(style.photos[0].thumbnail_url)
          }
        })
        if (styles.length === 0) {
          styles.push(response.data.results[0].original_price);
          styles.push(response.data.results[0].sale_price);
          styles.push(response.data.results[0].photos[0].thumbnail_url)
        }
        // debugger;
        this.setState({
          originalPrice: styles[0],
          salePrice: styles[1],
          relatedImage: styles[2]
        });
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  getRelatedProductsRating(id) {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      headers: { 'Authorization': API_KEY },
      params: {
        product_id: this.props.relatedProduct.id
      }
    })
      .then(response => {
        var ratings = response.data.ratings
        // console.log('response data ratings', response.data);
        var ratingKeys = Object.keys(response.data.ratings);
        var sum = 0;
        var divisor = 0;
        for (var i = 0; i < ratingKeys.length; i++) {
          var rating = Number(ratingKeys[i]);

          sum = sum + (rating * ratings[rating]);
          divisor = divisor + Number(ratings[rating]);
        }

        this.setState({
          relatedRating: sum / divisor
        });
      })
      .catch((err) => {
        console.error(err.message);
      })
  }

  render() {
    return (
      <div>
        <RelatedProductsCard
          relatedProduct={this.props.relatedProduct}
          currentProduct={this.props.currentProduct}
          handleCardClick={this.props.handleCardClick}
          relatedRating={this.state.relatedRating}
          relatedImage={this.state.relatedImage}
          salesPrice={this.state.salesPrice}
          originalPrice={this.state.originalPrice}
          currentFeatures={this.props.currentFeatures}
          key={this.props.relatedProduct.id}
        />
      </div>
    )
  }
}

export default RelatedProducts;