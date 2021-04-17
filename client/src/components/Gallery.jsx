import React from 'react';
import GalleryThumbnail from './GalleryThumbnail';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 1
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

  }


  render() {
    return (
      <div className = "gallery">
        GALLERY
        <div className = "main-image-window">
          <button name = "left" onClick = {this.handleButtonClick}>{'<'}</button>
          <button name = "right" onClick = {this.handleButtonClick}>{'>'}</button>
          {this.props.currentStylePhotos.length > 0 &&
          (<img className = "main-image" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url}/>)}
        </div>
        <div className = "gallery-thumbnails">
        {this.props.currentStylePhotos.map((photo, index) => <GalleryThumbnail photo = {photo} key = {index} index = {index} selectPhoto = {this.selectPhoto} clicked = {this.state.currentImageIndex == index}/>)}
        </div>
      </div>
    )
  }
}

export default Gallery;