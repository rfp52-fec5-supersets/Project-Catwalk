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
    // console.log('parents', e.target.parentNode);
    console.log('class', e.target.classList);
    //  widgets have classes overview, related-items, reviews, and questions-and-answers
    let widget;
    let node = e.target;
    // check to see if node's className has widget.
    if (node.classList[node.classList.length - 1])
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