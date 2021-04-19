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
    console.log('clicked');
  }

  render() {
    let imgSource = this.props.source;
    return (
      <>
        <img onClick={this.handleToggle} src={imgSource} className='reviews-thumbnail'/>
        <ModalImage onCloseRequest={() => this.handleToggleModal()}>
          <img src={imgSource} />
        </ModalImage>
      </>
    );
  }
}
export default ImageThumbnail;