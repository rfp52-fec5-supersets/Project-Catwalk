import React from 'react';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0
    };

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

  render() {
    return (
      <div className = "gallery">
        GALLERY
        <div className = "main-image-window">
        {this.props.currentStylePhotos.length > 0 &&
        (<img className = "main-image" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url}></img>)}
        </div>
        RENDER THUMBNAILS
      </div>
    )
  }
}

export default Gallery;