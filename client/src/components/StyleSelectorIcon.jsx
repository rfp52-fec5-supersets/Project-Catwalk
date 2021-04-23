import React from 'react';

class StyleSelectorIcon extends React.Component {
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
      this.props.clicked ?
      <img className = "style-thumbnail-clicked" id = {'ss-thumbnail-'+this.props.index} src = {this.props.style.photos[0].thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img> : <img className = "style-thumbnail" id = {'ss-thumbnail-'+this.props.index} src = {this.props.style.photos[0].thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img>
    )
  }
}

export default StyleSelectorIcon;