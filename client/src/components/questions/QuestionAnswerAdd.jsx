import React from 'react';
import Modal from 'react-modal';

class QuestionAnswerAdd extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  componentDidMount() {
    Modal.setAppElement('body');
 }
  render () {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    }
    return (
      <div>
        <button onClick={this.handleOpenModal}>Add Answer</button>
        <Modal style={customStyles} ariaHideApp={true} isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <h1 style={{textAlign: 'center'}}>Add an Answer</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <textarea required="required" maxLength="1000" placeholder="Answer"></textarea><br/>
            <label htmlFor="lname">Nickname:</label><br/>
            <input maxLength="60" type="text" id="fname" name="fname"/><br/>
            <label htmlFor="lname">Last name:</label><br/>
            <input type="text" id="lname" name="lname"/><br/>
            <button>Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default QuestionAnswerAdd;