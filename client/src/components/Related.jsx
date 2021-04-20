import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedProducts.jsx';
import RelatedOutfits from './RelatedOutfits.jsx';
import API_KEY from '../config.js';

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProductsId: [],
      relatedProducts: []
    }
    this.getRelatedProductsId = this.getRelatedProductsId.bind(this);
    // this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }


  componentDidMount() {
    this.getRelatedProductsId(this.props.currentProductId);
  }

  getRelatedProductsId(id) {
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}/related`,
      headers: { 'Authorization': API_KEY }
    })
      .then(response => {
        let relatedIds = response.data;
        let relatedPromises = relatedIds.map(id => {
          return axios({
            method: 'get',
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${id}`,
            headers: { 'Authorization': API_KEY }
          })
        });
        return Promise.all(relatedPromises)
      })
      .then(relatedResponse => {
        let relatedProducts = relatedResponse.map(response => {
          return response.data;
        })
        this.setState({
          relatedProducts: relatedProducts
        })
        console.log(relatedProducts);
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  // relatedProductsId = [17072, 17072, 17074, 17075, 17067, 17069]

  // relatedProducts[0]
  //   campus: "hr-rfp"
  //   category: "Kicks"
  //   created_at: "2021-02-23T04:22:44.728Z"
  //   default_price: "89.00"
  //   description: "The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole."
  //   features: (4) [{…}, {…}, {…}, {…}]
  //   id: 17072
  //   name: "Pumped Up Kicks"
  //   slogan: "Faster than a just about anything"
  //   updated_at: "2021-02-23T04:22:44.728Z"



  render() {
    return (
      <div>
        <RelatedProducts relatedProducts={this.state.relatedProducts} relatedProductsId={this.state.relatedProductsId} />
        <RelatedOutfits />
      </div>
    )
  }
}

export default Related;