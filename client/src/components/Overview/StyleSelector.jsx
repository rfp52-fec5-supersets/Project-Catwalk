import React from 'react';
import StyleSelectorIcon from './StyleSelectorIcon.jsx'

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.setStyle(event.target.name);
  }

    render() {
    return (
      <div className = "style-selector">
        <div id = "style-selector-title"><b>Style > </b> {this.props.currentStyle.name}</div>
        <div id = "style-selector-icons">
        {this.props.styles.map((style, index) => <StyleSelectorIcon style = {style} setStyle = {this.props.setStyle} index = {index} clicked = {this.props.currentStyleIndex == index} key = {index}/>)}
        </div>
      </div>
    )
  }
}

export default StyleSelector;