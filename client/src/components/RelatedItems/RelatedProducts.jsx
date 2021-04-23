import React from 'react';
import axios from 'axios';
import API_KEY from './../../config.js';
import RelatedProductsCard from './RelatedProductsCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: [],
      averageRating: 0,
      currentFeatures: []
    }
    this.getRelatedProductsImage = this.getRelatedProductsImage.bind(this);
    this.getRelatedProductsRating = this.getRelatedProductsRating.bind(this);
    this.getCurrentProductFeatures = this.getCurrentProductFeatures.bind(this);
  }

  componentDidMount() {
    this.getRelatedProductsImage(this.props.relatedProduct.id);
    this.getRelatedProductsRating(this.props.relatedProduct.id);
    this.getCurrentProductFeatures(this.props.currentProduct.id);
  }

  getRelatedProductsImage(id) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/styles`,
      headers: { 'Authorization': API_KEY }
    })
      .then(response => {
        // console.log('response', response);
        this.setState({
          previewImage: response.data.results[0].photos[0].thumbnail_url
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
          averageRating: sum / divisor,
        });
      })
      .catch((err) => {
        console.error(err.message);
      })
  }

  getCurrentProductFeatures(id) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
      headers: { 'Authorization': API_KEY }
    })
      .then(response => {
        this.setState({
          currentFeatures: response.data.features
        });
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  render() {
    return (
      <div>
        <RelatedProductsCard
          relatedProduct={this.props.relatedProduct}
          currentProduct={this.props.currentProduct}
          handleCardClick={this.props.handleCardClick}
          averageRating={this.state.averageRating}
          previewImage={this.state.previewImage}
          currentFeatures={this.state.currentFeatures}
        />
      </div>
    )
  }
}

export default RelatedProducts;