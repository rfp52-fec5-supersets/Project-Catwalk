import React from 'react';

class ComparisonModal extends React.Component {

  render() {
    if (!this.props.renderModal) {
      return null;
    }

    return (
      <div className='modal-overlay'>
        <button type="button" className='close-button' onClick={this.props.onClose}>
          X
        </button>
        <div className='modal-content'>
          {"COMPARISON TABLE"}
        </div>
      </div>
    )
  }
}

export default ComparisonModal;