import React from 'react';
import Modal from 'react-modal';
import QuestionAnswerAddModal from './QuestionAnswerAddModal.jsx';

class QuestionAnswerAdd extends React.Component {
  constructor (props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      showModal: false
    }
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//   }

//   handleOpenModal () {
//     this.setState({ showModal: true });
//   }

//   handleCloseModal () {
//     this.setState({ showModal: false });
//   }
//   componentDidMount() {
//     Modal.setAppElement('body');
//  }
//   render () {
//     const customStyles = {
//       content : {
//         top                   : '50%',
//         left                  : '50%',
//         right                 : 'auto',
//         bottom                : 'auto',
//         marginRight           : '-50%',
//         transform             : 'translate(-50%, -50%)'
//       }
//     }
    render() {
      return (
      <div>
        <button onClick={this.handleToggle}>Add Answer</button>
       {this.state.showModal &&
        <QuestionAnswerAddModal onCloseRequest={this.handleToggle}>
          <div>
            Add a Question
          </div>
        </QuestionAnswerAddModal>}
      </div>
    );
  }
}

export default QuestionAnswerAdd;