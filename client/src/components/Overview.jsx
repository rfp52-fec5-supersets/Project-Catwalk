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
      currentStyleIndex: 2,
      currentStyle: {},
      currentStylePhotos: [],
      currentStylePhotoIndex: 0,
      currentStyleSkus: [],
      currentProductFull: {},
      ratings: {},
      averageRating: 0
    };

    this.setStyle = this.setStyle.bind(this);
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/17067/styles', /*TODO: Make this actually pull the product ID*/
      headers: {'Authorization': API_KEY}
    })
    .then(({data: stylesObj} = res) => {
      this.setState({styles: stylesObj.results, currentStyle: stylesObj.results[this.state.currentStyleIndex], currentStylePhotos: stylesObj.results[this.state.currentStyleIndex].photos});
      var skusObj = this.state.currentStyle.skus;
      var skusObjKeys = Object.keys(skusObj);
      var skusArray = [];
      for (var i = 0; i < skusObjKeys.length ; i++) {
        var key = skusObjKeys[i];
        skusArray.push({sku: key, size: skusObj[key].size, quantity: skusObj[key].quantity})
      }
      this.setState({currentStyleSkus: skusArray});
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
      // console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  setStyle(index) {
    this.setState({currentStyleIndex: index, currentStyle: this.state.styles[index], currentStylePhotos: this.state.styles[index].photos})
    console.log(this.state);
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
      <StyleSelector styles = {this.state.styles} currentStyle = {this.state.currentStyle} setStyle = {this.setStyle} currentStyleIndex = {this.state.currentStyleIndex}/>
      <Checkout currentStyleSkus = {this.state.currentStyleSkus}/>
      </div>

    )
  }
}

export default Overview;