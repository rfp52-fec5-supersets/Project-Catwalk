import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import API_KEY from './config.js';
import Reviews from './components/reviews/Reviews.jsx';
import Overview from './components/Overview/Overview.jsx'
import QuestionsList from './components/questions/QuestionsList.jsx'
import RelatedProducts from './components/RelatedItems/RelatedProducts.jsx';
import MyOutfit from './components/RelatedItems/MyOutfit.jsx';
import SearchBar from './components/SearchBar.jsx';

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
      currentProductId: '17067', // initialized value, shouldn't matter
      currentStylePhotos: [],
      currentStyleSkusObj: {},
      // currentStyleSkus: [],
      currentStyleTotalQuantity: 0,
      currentProductFull: {},
      currentProductFeatures: [],
      ratings: {},
      averageRating: 0,
      reviewMeta: {},
      relatedProducts: [],
      leftIndex: 0,
      rightIndex: 4,
      search: ''
    };

    this.setStyle = this.setStyle.bind(this);
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.handleProductScroll = this.handleProductScroll.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.searchBarRender = this.searchBarRender.bind(this);
    // this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  getStyles() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/' + this.state.currentProductId + '/styles',
      headers: { 'Authorization': API_KEY }
    })
      .then(({ data: stylesObj } = res) => {
        this.setState({ styles: stylesObj.results, currentStyle: stylesObj.results[this.state.currentStyleIndex], currentStyleSkusObj: stylesObj.results[this.state.currentStyleIndex].skus, currentStylePhotos: stylesObj.results[this.state.currentStyleIndex].photos });
        var skusObj = this.state.currentStyle.skus;
        var skusObjKeys = Object.keys(skusObj);
        var currentStyleTotalQuantity = 0;
        for (var i = 0; i < skusObjKeys.length; i++) {
          var key = skusObjKeys[i];
          currentStyleTotalQuantity += skusObj[key].quantity;
        }
        this.setState({ currentStyleTotalQuantity: currentStyleTotalQuantity });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getFeatures() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/' + this.state.currentProductId + '/',
      headers: { 'Authorization': API_KEY }
    })
      .then(({ data: productObj } = res) => {
        this.setState({ currentProductFull: productObj, currentProductFeatures: productObj.features });
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
      headers: { 'Authorization': API_KEY },
      params: {
        product_id: this.state.currentProductId
      }
    })
      .then(({ data: metaObj } = res) => {
        var ratings = metaObj.ratings
        var ratingKeys = Object.keys(ratings);

        var sum = 0;
        var divisor = 0;
        for (var i = 0; i < ratingKeys.length; i++) {
          var rating = Number(ratingKeys[i]);

          sum = sum + (rating * ratings[rating]);
          divisor = divisor + Number(ratings[rating]);

        }

        this.setState({ ratings: ratings, averageRating: (sum / divisor).toFixed(2), reviewMeta: metaObj });
        //console.log(this.state);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  setStyle(index) {
    this.setState({ currentStyleIndex: index, currentStyle: this.state.styles[index], currentStylePhotos: this.state.styles[index].photos, currentStyleSkusObj: this.state.styles[index].skus })
    // console.log(this.state);
    var skusObj = this.state.currentStyle.skus;
    var skusObjKeys = Object.keys(skusObj);
    var currentStyleTotalQuantity = 0;
    for (var i = 0; i < skusObjKeys.length; i++) {
      var key = skusObjKeys[i];
      currentStyleTotalQuantity += skusObj[key].quantity;
    }
    this.setState({ currentStyleTotalQuantity: currentStyleTotalQuantity });
    // console.log(this.state);
  }

  getRelatedProducts(id) {
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
      })
      .catch(err => {
        console.log(err.message);
      })
  }


  handleCardClick(product) {
    console.log('product card clicked', product);
    this.setState({
      currentProduct: product,
      currentProductId: product.id,
      currentStyleIndex: 0
    }, () => {
      this.getStyles();
      this.getFeatures();
      this.getRatings();
      this.getRelatedProducts(product.id);
    })
  }

  handleProductScroll(event) {
    event.preventDefault();
    console.log('scroll button clicked', event)
    if (event.target.className === "left-button" && this.state.leftIndex !== 0) {
      this.setState({
        leftIndex: this.state.leftIndex - 1,
        rightIndex: this.state.rightIndex - 1
      })
    }
    if (event.target.className === "right-button" && this.state.rightIndex < this.state.relatedProducts.length) {
      this.setState({
        leftIndex: this.state.leftIndex + 1,
        rightIndex: this.state.rightIndex + 1
      })
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: { 'Authorization': API_KEY }
    })
      .then(({ data: products } = res) => {
        this.setState({ products: products, currentProduct: products[4], currentProductId: products[4].id });
        this.getStyles();
        this.getFeatures();
        this.getRatings();
        this.getRelatedProducts(this.state.currentProductId);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSearchClick(id) {
    let new_product_id = id;
    //
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${new_product_id}`,
      headers: { 'Authorization': API_KEY }
    })
      .then(({ data: product } = res) => {
        this.setState({ currentProduct: product, currentProductId: product.id });
        this.getStyles();
        this.getFeatures();
        this.getRatings();
        this.getRelatedProducts(this.state.currentProductId);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  questionListRender() {
    if (this.state.products.length > 0) {
      return <QuestionsList productName={this.state.currentProduct.name} productID={this.state.currentProduct.id} />
    }
  }

  relatedProductsRender() {
    let productsToDisplay = this.state.relatedProducts.map(product => {
      return <RelatedProducts
        relatedProduct={product}
        handleCardClick={() => this.handleCardClick(product)}
        currentProduct={this.state.currentProduct}
        currentFeatures={this.state.currentProductFeatures} />
    })

    let leftIndex = this.state.leftIndex;
    let rightIndex = this.state.rightIndex;
    let leftButton = <a className="left-button" onClick={this.handleProductScroll}>&#10094;</a>
    let rightButton = <a className="right-button" onClick={this.handleProductScroll}>&#10095;</a>

    return (
      <div className="related-products">
        <div className="related-products-title">RELATED PRODUCTS</div>
        <div className="related-products-container">
          {productsToDisplay.slice(leftIndex, rightIndex)}
        </div>
        {rightIndex === this.state.relatedProducts.length ? <>{null}</> : rightButton}
        {leftIndex === 0 ? <>{null}</> : leftButton}
      </div>
    )
  }

  searchBarRender() {
    ReactDOM.render(<SearchBar handleSearchClick = {this.handleSearchClick} />, document.getElementById('product-search'));
  }

  render() {
    return (
      <>
        {this.searchBarRender()}
        <Overview currentProduct={this.state.currentProduct} currentProductId={this.state.currentProductId} currentStylePhotos={this.state.currentStylePhotos} currentProductFull={this.state.currentProductFull} currentStyle={this.state.currentStyle} averageRating={this.state.averageRating} styles={this.state.styles} currentStyleIndex={this.state.currentStyleIndex} setStyle={this.setStyle} currentStyleSkusObj={this.state.currentStyleSkusObj} currentStyleTotalQuantity={this.state.currentStyleTotalQuantity} currentProductFeatures={this.state.currentProductFeatures} reviewMeta={this.state.reviewMeta} />
        {this.relatedProductsRender()}
        <MyOutfit currentProduct={this.state.currentProduct} currentProductId={this.state.currentProductId} averageRating={this.state.averageRating} currentStylePhotos={this.state.currentStylePhotos} />
        {/* Invoke our conditional render of QuestionList component*/}
        {this.questionListRender()}
        <Reviews product={this.state.currentProduct} reviewMeta={this.state.reviewMeta} averageRating={this.state.averageRating} ratings={this.state.ratings} />
      </>
    )
  }
}

export default App;
