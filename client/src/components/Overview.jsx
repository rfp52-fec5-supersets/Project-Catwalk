import React from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import Checkout from './Checkout.jsx';
import axios from 'axios';
import API_KEY from '../config.js'


class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: [],
      currentStyle: {},
      currentStylePhotos: [],
      currentProductFull: {},
      ratings: {}
    };
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/17067/styles', /*TODO: Make this actually pull the product ID*/
      headers: {'Authorization': API_KEY}
    })
    .then(({data: stylesObj} = res) => {
      this.setState({styles: stylesObj.results, currentStyle: stylesObj.results[0], currentStylePhotos: stylesObj.results[0].photos});
      console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getFeatures() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/17067/', /*TODO: Make this actually pull the product ID*/
      headers: {'Authorization': API_KEY}
    })
    .then(({data: productObj} = res) => {
      this.setState({currentProductFull: productObj});
      console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getRatings() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', /*TODO: Make this actually pull the product ID*/
      headers: {'Authorization': API_KEY},
      params: {
        product_id: 17067
      }
    })
    .then(({data: metaObj} = res) => {
      this.setState({ratings: metaObj.ratings});
      console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.getStyles();
    this.getFeatures();
    this.getRatings();
    // console.log(this.state);
  }

  render() {
    return (
      <div className = "overview">OVERVIEW
      {/* {console.log(this.props.currentProduct)} */}
      <Gallery currentStylePhotos = {this.state.currentStylePhotos}/>
      <ProductInfo currentProduct = {this.props.currentProduct} currentStyle = {this.state.currentStyle} ratings = {this.state.ratings}/>
      <StyleSelector styles = {this.state.styles}/>
      <Checkout currentStyle = {this.state.currentStyle}/>
      </div>

    )
  }
}

export default Overview;