import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import API_KEY from './config.js';
import Reviews from './components/reviews/Reviews.jsx';
import Overview from './components/Overview.jsx'
import QuestionsList from './components/QuestionsList.jsx'
import Related from './components/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentProduct: {},
      /* added from Overview.jsx */
      styles: [],
      currentStyleIndex: 0,
      currentStyle: {},
      currentProductId: '17071', // initialized value, shouldn't matter
      currentStylePhotos: [],
      currentStyleSkusObj: {},
      // currentStyleSkus: [],
      currentStyleTotalQuantity: 0,
      currentProductFull: {},
      ratings: {},
      averageRating: 0,
      reviewMeta: {},
    };

    this.setStyle = this.setStyle.bind(this);
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/'+ this.state.currentProductId +'/styles',
      headers: {'Authorization': API_KEY}
    })
    .then(({data: stylesObj} = res) => {
      this.setState({styles: stylesObj.results, currentStyle: stylesObj.results[this.state.currentStyleIndex], currentStyleSkusObj: stylesObj.results[this.state.currentStyleIndex].skus, currentStylePhotos: stylesObj.results[this.state.currentStyleIndex].photos});
      var skusObj = this.state.currentStyle.skus;
      var skusObjKeys = Object.keys(skusObj);
      var currentStyleTotalQuantity = 0;
      for (var i = 0; i < skusObjKeys.length ; i++) {
        var key = skusObjKeys[i];
        currentStyleTotalQuantity += skusObj[key].quantity;
      }
      this.setState({currentStyleTotalQuantity: currentStyleTotalQuantity});
      console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  getFeatures() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/' + this.state.currentProductId + '/',
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
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta',
      headers: {'Authorization': API_KEY},
      params: {
        product_id: this.state.currentProductId
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

      this.setState({ratings: ratings, averageRating: sum/divisor, reviewMeta: metaObj});
      //console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  setStyle(index) {
    this.setState({currentStyleIndex: index, currentStyle: this.state.styles[index], currentStylePhotos: this.state.styles[index].photos, currentStyleSkusObj: this.state.styles[index].skus})
    // console.log(this.state);
    var skusObj = this.state.currentStyle.skus;
    var skusObjKeys = Object.keys(skusObj);
    var currentStyleTotalQuantity = 0;
    for (var i = 0; i < skusObjKeys.length ; i++) {
      var key = skusObjKeys[i];
      currentStyleTotalQuantity += skusObj[key].quantity;
    }
    this.setState({currentStyleTotalQuantity: currentStyleTotalQuantity});
    console.log(this.state);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: {'Authorization': API_KEY}
    })
    .then(({data: products} = res) => {
      this.setState({products: products, currentProduct: products[4], currentProductId: products[4].id});
      this.getStyles();
      this.getFeatures();
      this.getRatings();
      // console.log(this.state);
    })
    .catch((err) => {
      console.error(err);
    })
  }


  // Renders our question list once we have received our products and current product
  questionListRender() {
    // Check that our products state isn't empty - indicates we have recevied our current product
    if (this.state.products.length > 0) {
      // Render our QuestionsList component while passing in the product ID
      return <QuestionsList productID={this.state.currentProduct.id} />
    }
  }

  render() {
    return (
      <div>
      {/* <Overview currentProduct = {this.state.currentProduct} currentProductId = {this.state.currentProductId} currentStylePhotos = {this.state.currentStylePhotos} currentProductFull = {this.state.currentProductFull} currentStyle = {this.state.currentStyle} averageRating = {this.state.averageRating} styles = {this.state.styles} currentStyleIndex = {this.state.currentStyleIndex} setStyle = {this.setStyle} currentStyleSkus = {this.state.currentStyleSkus}/> */}
      {/* <Overview currentProduct = {this.state.currentProduct} currentProductId = {this.state.currentProductId} currentStylePhotos = {this.state.currentStylePhotos} currentProductFull = {this.state.currentProductFull} currentStyle = {this.state.currentStyle} averageRating = {this.state.averageRating} styles = {this.state.styles} currentStyleIndex = {this.state.currentStyleIndex} setStyle = {this.setStyle} currentStyleSkusObj = {this.state.currentStyleSkusObj} currentStyleTotalQuantity = {this.state.currentStyleTotalQuantity}/> */}
      <Related products={this.state.products} currentProduct={this.state.currentProduct} currentProductId={this.state.currentProductId}/>
      {/* <Reviews product = {this.state.currentProduct} reviewMeta={this.state.reviewMeta} averageRating={this.state.averageRating} ratings={this.state.ratings}/> */}
      {/* Invoke our conditional render of QuestionList component*/}
      {/* {this.questionListRender()} */}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));