import React from 'react';
import GalleryThumbnail from './GalleryThumbnail';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      minThumbnailIndex: 0,
      maxThumbnailIndex: 4
    };

    // console.log(this.props);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
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

  selectPhoto(index) {
    this.setState({currentImageIndex: index});
  }

  handleButtonClick(event) {
    event.preventDefault();
    if (event.target.name === 'left') {
      if (this.state.currentImageIndex !== 0) {
        this.setState({currentImageIndex: this.state.currentImageIndex - 1});
      }
    }

    if (event.target.name === 'right') {
      if (this.state.currentImageIndex < this.props.currentStylePhotos.length - 1) {
        this.setState({currentImageIndex: this.state.currentImageIndex + 1});
      }
    }

    if (event.target.name === 'up') {
      if (this.state.minThumbnailIndex !== 0) {
        this.setState({minThumbnailIndex: this.state.minThumbnailIndex - 1, maxThumbnailIndex: this.state.maxThumbnailIndex - 1});
      }
    }

    if (event.target.name === 'down') {
      if (this.state.maxThumbnailIndex < this.props.currentStylePhotos.length - 1) {
        this.setState({minThumbnailIndex: this.state.minThumbnailIndex + 1, maxThumbnailIndex: this.state.maxThumbnailIndex + 1});
      }
    }
  }


  render() {
    var thumbnailsToRender = this.props.currentStylePhotos.slice(this.state.minThumbnailIndex, this.state.maxThumbnailIndex + 1);
    //console.log(thumbnailsToRender);

    return (
      <div className = "gallery">
        GALLERY
        <div className = "main-image-window">
          {this.state.currentImageIndex !== 0 && <button name = "left" onClick = {this.handleButtonClick}>{'<'}</button>}
          {this.state.currentImageIndex < this.props.currentStylePhotos.length - 1 && <button name = "right" onClick = {this.handleButtonClick}>{'>'}</button>}
          {this.props.currentStylePhotos.length > 0 &&
          (<img className = "main-image" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url}/>)}
        </div>
        <div className = "gallery-thumbnails">
        {this.state.minThumbnailIndex !== 0 && <button name = "up" onClick = {this.handleButtonClick}>{'^'}</button>}
        {thumbnailsToRender.map((photo, index) => <GalleryThumbnail photo = {photo} key = {index + this.state.minThumbnailIndex} index = {index + this.state.minThumbnailIndex} selectPhoto = {this.selectPhoto} clicked = {this.state.currentImageIndex == index + this.state.minThumbnailIndex}/>)}
        {this.state.maxThumbnailIndex < this.props.currentStylePhotos.length - 1 && <button name = "down" onClick = {this.handleButtonClick}>{'v'}</button>}
        </div>
      </div>
    )
  }
}

export default Gallery;