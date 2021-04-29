import React from 'react';
import ModalImage from './ModalImage.jsx';

class ImageThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

  render() {
    let imgSource = this.props.source;
    return (
      <>
        <img onClick={this.handleToggle} src={imgSource} className='reviews-thumbnail' alt={'image for review'}/>
        {this.state.showModal &&
        <ModalImage onCloseRequest={this.handleToggle}>
          <img src={imgSource} style={{maxWidth: '100%'}} alt={'full resolution image for review'}/>
        </ModalImage>}
      </>
    );
  }
}
export default ImageThumbnail;