import React from 'react';
import API_KEY from './../config.js'
import axios from 'axios';

const widgets = ['overview', 'related-items', 'reviews', 'questions-and-answers'];

class ClickTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let currentTime = new Date();
    let widget;
    let node = e.target;
    while (node.parentNode && widget === undefined) {
      if (widgets.indexOf(node.classList[0]) !== -1) {
        widget = widgets[widgets.indexOf(node.classList[0])];
      } else {
        node = node.parentNode;
      }
    }
    currentTime = JSON.stringify(currentTime);
    let clickTrackParams = {element: e.target.outerHTML, widget: widget, time: currentTime};
    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/interactions', clickTrackParams, {
      headers: {'Authorization': API_KEY}
    })
      .catch((err)=>{
        console.log(err)
      });
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