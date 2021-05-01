import React from 'react';

class StyleSelectorIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.setStyle(event.target.name);
  }

  render() {
    return (
      this.props.clicked ?
      <span id = "style-thumbnail-clicked-container"><img alt="style thumbnail" className = "style-thumbnail-clicked" id = {'ss-thumbnail-'+this.props.index} src = {this.props.style.photos[0].thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img><div className="check"></div></span>  : <img alt="style thumbnail" className = "style-thumbnail" id = {'ss-thumbnail-'+this.props.index} src = {this.props.style.photos[0].thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img>
    )
  }
}

export default StyleSelectorIcon;