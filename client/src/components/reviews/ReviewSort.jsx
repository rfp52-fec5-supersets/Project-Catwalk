import React from 'react';

class ReviewSort extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleChange(e) {
  //   this.setState({
  //     value: e.target.value
  //   });
  //   this.props.handleSort(e.target.value);
  // }

  render() {
    return (
      <div id='reviews-sort' className='reviews-component'>
        {/* <form onSubmit={this.handleSubmit}> */}
        <form>
          <label>
            Sort On:
            <select value={this.props.currentSort} onChange={this.props.handleChange} className='reviews-sort-input'>
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