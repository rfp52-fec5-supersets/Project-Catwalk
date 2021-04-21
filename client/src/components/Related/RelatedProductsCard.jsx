import React from 'react';
import API_KEY from './../../config.js';
import axios from 'axios';

class RelatedProductsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: []
    }
    this.getRelatedProductsImage = this.getRelatedProductsImage.bind(this);
  }

  componentDidMount() {
    this.getRelatedProductsImage(this.props.relatedProduct.id);
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
        })
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  render() {
    return <div className="related-products-card">
      <img src={this.state.previewImage}></img>
      <div>{this.props.relatedProduct.category}</div>
      <div> {this.props.relatedProduct.name}</div>
      <div>{this.props.relatedProduct.default_price}</div>
    </div>
  }
}

export default RelatedProductsCard;