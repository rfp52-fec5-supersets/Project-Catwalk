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



  render() {
    return (
      <div className = "gallery">
        GALLERY
        <div className = "main-image-window">
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