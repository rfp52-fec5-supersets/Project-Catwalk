import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import API_KEY from './config.js'
import QuestionsList from './components/QuestionsList.jsx'

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
      this.setState({
        products: products,
        currentProduct: products[0]
      });
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
        {/* Invoke our conditional render of QuestionList component*/}
        {this.questionListRender()}
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));