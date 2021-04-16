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
      currentProduct: {}
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: {'Authorization': API_KEY}
    })
    .then(({data: products} = res) => {
      this.setState({products: products, currentProduct: products[0]});
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
      <h1>HELLO<h1/>
      <Overview currentProduct = {this.state.currentProduct}/>
      <Reviews product = {this.state.currentProduct}/>}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));