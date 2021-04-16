import React from 'react';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className = "style-selector">
        Style Selector
        {this.props.styles.map((style, index) => {
          return (<img className = "style-thumbnail" src = {style.photos[0].thumbnail_url} key = {index}></img>)
        })}
      </div>
    )
  }
}

export default StyleSelector;