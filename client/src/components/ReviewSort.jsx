import React from 'react';

class ReviewSort extends React.Component {
  constructor(props) {
    super(props);
    this.state= {value:'selected'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.handleSort(e.target.value);
  }

  render() {
    return (
      <div id='reviews-sort' className='reviews-component'>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form>
          <label>
            Sort On:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="newest">newest</option>
              <option value="relevant">relevant</option>
              <option value="helpful">helpful</option>
            </select>
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>
      </div>
    );
  }
}
export default ReviewSort;