import React from 'react';
import API_KEY from './../config.js'
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    // 17067
  }

  componentDidUpdate(prevProps) {
    // Component only mounts once. When it renders again due to other items changing props, it goes into render.
    if (this.props.product !== prevProps.product) {
      axios({
        method: 'get',
        url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
        headers: {'Authorization': API_KEY},
        params: {
          product_id: `${this.props.product.id}`
        }
      })
      .then((results)=> {
        this.setState({
          reviews: results.data.results
        });
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }

  render() {
    return (
      <div id='reviews'>
        REVIEWS WRAPPER
        <div> Breakdown </div>
        <div> Reviews List </div>
        <div> Review Tile </div>
      </div>
    );
  }
}
export default Reviews;