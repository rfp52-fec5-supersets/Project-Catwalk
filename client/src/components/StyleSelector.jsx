import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //event.preventDefault();
    this.props.setStyle(event.target.name);
    //console.log(event.target.name);
  }

  render() {
    return (
      <div className = "style-selector">
        Style Selector
        {this.props.styles.map((style, index) => {
          return (<img className = "style-thumbnail" src = {style.photos[0].thumbnail_url} key = {index} name = {index} onClick = {this.handleClick}></img>)
        })}
      </div>
    )
  }
}

export default StyleSelector;