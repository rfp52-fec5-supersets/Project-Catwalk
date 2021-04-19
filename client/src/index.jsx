import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import API_KEY from './config.js';
import Reviews from './components/Reviews.jsx';
import Overview from './components/Overview.jsx'

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
      currentStyleSkus: [],
      currentProductFull: {},
      ratings: {},
      averageRating: 0,
      reviewMeta: {}
    };

    this.setStyle = this.setStyle.bind(this);
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/'+ this.state.currentProductId +'/styles', /*TODO: Make this actually pull the product ID*/
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
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/' + this.state.currentProductId + '/', /*TODO: Make this actually pull the product ID*/
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
    this.setState({currentStyleIndex: index, currentStyle: this.state.styles[index], currentStylePhotos: this.state.styles[index].photos})
    // console.log(this.state);
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



  handleProductCardClick() {
    event.preventDefault();
  }

  render() {
    return (
<<<<<<< HEAD
      <div>HELLO
        <RelatedProducts/>
      </div>

=======
      <div>
      <h1/>HELLO<h1/>
      <Overview currentProduct = {this.state.currentProduct} currentProductId = {this.state.currentProductId} currentStylePhotos = {this.state.currentStylePhotos} currentProductFull = {this.state.currentProductFull} currentStyle = {this.state.currentStyle} averageRating = {this.state.averageRating} styles = {this.state.styles} currentStyleIndex = {this.state.currentStyleIndex} setStyle = {this.setStyle} currentStyleSkus = {this.state.currentStyleSkus}/>
      <Reviews product = {this.state.currentProduct} reviewMeta={this.state.reviewMeta} averageRating={this.state.averageRating}/>
      </div>
>>>>>>> ad68039be1211cfe1cee004f124f6f3f97501858
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));