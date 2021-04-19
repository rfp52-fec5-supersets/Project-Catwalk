import React from 'react';

class GalleryThumbnail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);

    // console.log(this.props);
  }

  // componentDidMount() {
  //   this.setState({photos: this.props.currentStylePhotos})
  //   //console.log(this.props.currentStylePhotos);
  // }

  // imageRender() {
  //   if (this.props.currentStylePhotos.length > 0) {
  //     return (<img src = {this.props.currentStylePhotos[this.state.currentImageIndex].url}></img>)
  //   }
  // }
  handleClick(event) {
    this.props.selectPhoto(Number(event.target.name))
    // console.log(event.target.name);
  }

  render() {
    return (
      <div>
      {this.props.clicked ?
      <img className = "gallery-thumbnail-clicked" src = {this.props.photo.thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img> : <img className = "gallery-thumbnail" src = {this.props.photo.thumbnail_url} onClick = {this.handleClick} name = {this.props.index}></img>}
      </div>
    )
  }
}

export default GalleryThumbnail;