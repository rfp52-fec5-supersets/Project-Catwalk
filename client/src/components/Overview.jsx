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
      ratings: {},
      averageRating: 0
    };
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/17067/styles', /*TODO: Make this actually pull the product ID*/
      headers: {'Authorization': API_KEY}
    })
    .then(({data: stylesObj} = res) => {
      this.setState({styles: stylesObj.results, currentStyle: stylesObj.results[2], currentStylePhotos: stylesObj.results[2].photos});
      // console.log(this.state);
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
      // console.log(this.state);
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
      var ratings = metaObj.ratings
      var ratingKeys = Object.keys(ratings);

      var sum = 0;
      var divisor = 0;
      for (var i = 0; i < ratingKeys.length; i++) {
        var rating = Number(ratingKeys[i]);

        sum = sum + (rating * ratings[rating]);
        divisor = divisor + Number(ratings[rating]);

      }

      this.setState({ratings: ratings, averageRating: sum/divisor});
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
  }

  render() {
    return (
      <div className = "overview">OVERVIEW
      {/* {console.log(this.props.currentProduct)} */}
      <Gallery currentStylePhotos = {this.state.currentStylePhotos}/>
      <ProductInfo currentProduct = {/*this.props.currentProduct*/this.state.currentProductFull} currentStyle = {this.state.currentStyle} rating = {this.state.averageRating}/>
      <StyleSelector styles = {this.state.styles} currentStyle = {this.state.currentStyle}/>
      <Checkout currentStyle = {this.state.currentStyle}/>
      </div>

    )
  }
}

export default Overview;