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
    //debugger;
    //console.log(event.target.name);
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

  // render() {
  //   return (
  //     <div className = "style-selector">
  //       Style Selector
  //       {this.props.styles.map((style, index) => {

  //         if (this.props.currentStyleIndex == index) {
  //           return ((index === this.props.currentStyleIndex) ? <img className = "style-thumbnail-clicked" src = {style.photos[0].thumbnail_url} key = {index} name = {index} onClick = {this.handleClick}></img> : <img className = "style-thumbnail" src = {style.photos[0].thumbnail_url} key = {index} name = {index} onClick = {this.handleClick}></img>)
  //         }
  //         return ((index == this.props.currentStyleIndex) ? <img className = "style-thumbnail-clicked" src = {style.photos[0].thumbnail_url} key = {index} name = {index} onClick = {this.handleClick}></img> : <img className = "style-thumbnail" src = {style.photos[0].thumbnail_url} key = {index} name = {index} onClick = {this.handleClick}></img>)
  //       })}
  //     </div>
  //   )
  // }
}

export default StyleSelector;