import React from 'react';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCloseRequest,
      children
    } = this.props;
    return (
      <div className='modal-overlay'>
        <button type="button" className='close-button' onClick={onCloseRequest}>
          X
        </button>
        <div className='modal-content'>
          {children}
        </div>
      </div>
    );
  }
}
export default QuestionModal;