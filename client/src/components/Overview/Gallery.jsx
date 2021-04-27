import React from 'react';
import GalleryThumbnail from './GalleryThumbnail';
import ModalImage from '../reviews/ModalImage';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      minThumbnailIndex: 0,
      maxThumbnailIndex: 6,
      renderModal: false,
      expandedImageZoomed: false
    };

    // console.log(this.props);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
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

        var newMinIndex = this.state.minThumbnailIndex;
        var newMaxIndex = this.state.maxThumbnailIndex;

        while (this.state.currentImageIndex - 1 < newMinIndex) {
          newMinIndex--;
          newMaxIndex--;
        }

        while (this.state.currentImageIndex - 1  > newMaxIndex) {
          newMinIndex++;
          newMaxIndex++;
        }

        this.setState({currentImageIndex: this.state.currentImageIndex - 1, minThumbnailIndex: newMinIndex, maxThumbnailIndex: newMaxIndex});

        // console.log(this.state.minThumbnailIndex, this.state.maxThumbnailIndex)

      }
    }

    if (event.target.name === 'right') {
      if (this.state.currentImageIndex < this.props.currentStylePhotos.length - 1) {

        var newMinIndex = this.state.minThumbnailIndex;
        var newMaxIndex = this.state.maxThumbnailIndex;

        while (this.state.currentImageIndex + 1 < newMinIndex) {
          newMinIndex--;
          newMaxIndex--;
        }

        while (this.state.currentImageIndex + 1 > newMaxIndex) {
          newMinIndex++;
          newMaxIndex++;
        }

        this.setState({currentImageIndex: this.state.currentImageIndex + 1, minThumbnailIndex: newMinIndex, maxThumbnailIndex: newMaxIndex});
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

  toggleModal() {
    let newState = {renderModal: !this.state.renderModal};
    this.setState(newState);
  }

  toggleZoom() {
    let newState = {expandedImageZoomed: !this.state.expandedImageZoomed};
    this.setState(newState);
  }

  handleMouseMove(event) {
    let element = document.getElementById('main-image-expanded-window');

    element.scrollTop = element.scrollTop + event.movementY*2.5;
    element.scrollLeft = element.scrollLeft + event.movementX*2.5;
  }


  render() {
    var thumbnailsToRender = this.props.currentStylePhotos.slice(this.state.minThumbnailIndex, this.state.maxThumbnailIndex + 1);
    //console.log(thumbnailsToRender);

    return (
      <div className = "gallery">
        <div className = "main-image-window">
          <div className = "expanded-button-div">
          {this.state.currentImageIndex !== 0 && <button id = "left-arrow-default" className = "arrow-button" name = "left" onClick = {this.handleButtonClick}>{'⇐'}</button>}
          </div>
          <div className = "main-image-container">
          {this.props.currentStylePhotos.length > 0 &&
          (<img className = "main-image" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url} onClick = {this.toggleModal}/>)}
          </div>
          <div className = "expanded-button-div">
          {this.state.currentImageIndex < this.props.currentStylePhotos.length - 1 && <button id = "right-arrow-default" className = "arrow-button" name = "right" onClick = {this.handleButtonClick}>{'⇒'}</button>}
          </div>
        </div>
        <div className = "gallery-thumbnails">
        <div className = "expanded-button-div">
        {this.state.minThumbnailIndex !== 0 && <button id = "up-arrow" className = "up-down-button" name = "up" onClick = {this.handleButtonClick}>{'⤊'}</button>}
        </div>
        {thumbnailsToRender.map((photo, index) => <GalleryThumbnail photo = {photo} key = {index + this.state.minThumbnailIndex} index = {index + this.state.minThumbnailIndex} selectPhoto = {this.selectPhoto} clicked = {this.state.currentImageIndex == index + this.state.minThumbnailIndex}/>)}
        <div className = "expanded-button-div">
        {this.state.maxThumbnailIndex < this.props.currentStylePhotos.length - 1 && <button id = "down-arrow" name = "down" className = "up-down-button" onClick = {this.handleButtonClick}>{'⤋'}</button>}
        </div>
        </div>
        {this.state.renderModal &&
        <ModalImage onCloseRequest = {this.toggleModal}>

          <div id = "main-image-expanded-window">
            <div className = "expanded-button-div">
          {this.state.currentImageIndex !== 0 && !this.state.expandedImageZoomed && <button id = "left-arrow-expanded" className = "arrow-button" name = "left" onClick = {this.handleButtonClick}>{'⇐'}</button>}
            </div>
          <div id = "main-image-expanded-container">
            {this.state.expandedImageZoomed ?
            <img className = "main-image-expanded-zoomed" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url} onClick = {this.toggleZoom} onMouseMove = {this.handleMouseMove}/>
            :
            <img className = "main-image-expanded" src = {this.props.currentStylePhotos[this.state.currentImageIndex].url} onClick = {this.toggleZoom}/>
            }
          </div>
          <div className = "expanded-button-div">
          {this.state.currentImageIndex < this.props.currentStylePhotos.length - 1 && !this.state.expandedImageZoomed && <button id = "right-arrow-expanded" className = "arrow-button" name = "right" onClick = {this.handleButtonClick}>{'⇒'}</button>}
          </div>
          </div>

          {!this.state.expandedImageZoomed &&
          <div className = "gallery-thumbnails-expanded">
            {this.props.currentStylePhotos.map((photo, index) => <GalleryThumbnail photo = {photo} key = {index} index = {index} selectPhoto = {this.selectPhoto} clicked = {this.state.currentImageIndex == index}/>)}
          </div>
          }
        </ModalImage>}
      </div>
    )
  }
}

export default Gallery;