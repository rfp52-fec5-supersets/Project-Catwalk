import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // searchBarRender() {
  //   ReactDOM.render(,);
  // }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit(e) {
    console.log(this.state.search);
    this.props.handleSearchClick(this.state.search);
  }

  render() {
    return (
      <div className='product-search'>
      <input name='search product id' id = "product-search-text" onChange={this.handleSearchChange} type='text' placeholder='Search by Product ID' value={this.state.search}></input>
      <button name='search product button' id = "product-search-button" onClick={this.handleSubmit}><i class = "fas fa-search"></i></button>
    </div>
    )
  }
}

export default SearchBar;
