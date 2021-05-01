import React from 'react';

class ReviewSort extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='reviews-sort' className='reviews-component'>
        <form>
          <label>
            Sort On:
            <select value={this.props.currentSort} onChange={this.props.handleChange} className='reviews-sort-input'>
              <option value="newest">newest</option>
              <option value="relevant">relevant</option>
              <option value="helpful">helpful</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}
export default ReviewSort;