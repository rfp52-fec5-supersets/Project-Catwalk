import React from 'react';

const widgets = ['overview', 'related-items', 'reviews', 'questions-and-answers'];

class ClickTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('clicked', e.target);
    let currentTime = new Date();
    console.log('parents', e.target.parents);
    //  widgets have classes overview, related-items, reviews, and questions-and-answers
  }

  render(){
    return(
      <div onClick={this.handleClick} className='click-tracker'>
        {this.props.render(null)}
      </div>
    )
  }
}
export default ClickTracker;