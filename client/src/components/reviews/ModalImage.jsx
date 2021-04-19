import React from 'react';

class ModalImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCloseRequest,
      children,
      classes,
    } = this.props;
    return (
      <div className='modal-overlay'>
        <div className='modal-content'>
          {children}
        </div>

        <button
          type="button"
          className='close-button'
          onClick={onCloseRequest}
        />
      </div>
    );
  }
}
export default ModalImage;