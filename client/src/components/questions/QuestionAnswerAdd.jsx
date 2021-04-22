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
            <textarea style={{minHeight: '10em', minWidth: '35em'}} required="required" maxLength="1000" placeholder="Answer"></textarea><br/>
            <label htmlFor="lname">Nickname:</label><br/>
            <input placeholder="Example: jack543!" maxLength="60" type="text" id="fname" name="fname"/><br/>
            <div>For privacy reasons, do not use your full name or email address</div><br/>
            <label htmlFor="lname">Email:</label><br/>
            <input placeholder="Example: jack@email.com" maxLength="60" type="text" id="lname" name="lname"/><br/>
            <div>For authentication reasons, you will not be emailed</div><br/>
            <input onChange={(event)=> console.log(URL.createObjectURL(event.target.files[0]))} type="file" id="img" name="img" accept="image/*" multiple/><br/>
            <button>Submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default QuestionAnswerAdd;