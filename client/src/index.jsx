import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import API_KEY from './config.js'

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



  handleProductCardClick() {
    event.preventDefault();
  }

  render() {
    return (
      <div>HELLO
        <RelatedProducts/>
      </div>

    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));