import React from 'react';
import QuestionAnswerAddModal from './QuestionAnswerAddModal.jsx';
import axios from 'axios';

class QuestionAnswerAdd extends React.Component {
  constructor (props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      showModal: false,
      previewImages: 'no',
      images: [],
      textArea: '',
      nickName: '',
      email: '',
    }
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

  previewImages() {
    this.setState({
      previewImages: 'yes',
      images: event.target.files
    })
  }

  onChangeTextArea(event) {
    console.log(event.target.value)
    const {value} = event.target
    this.setState({
      textArea: value
    })
  }

  onChangeNickName(event) {
    console.log(event.target.value)
    this.setState({
      nickName: event.target.value
    })
  }

  onChangeEmail(event) {
    console.log(event.target.value)
    this.setState({
      email: event.target.value
    })
  }
  onSubmitAnswer(event) {
    event.preventDefault()
    console.log(this.state)
  }
    render() {
      if (this.state.previewImages === 'yes' && Object.keys(this.state.images).length <= 5) {
        var renderPreviews = Object.keys(this.state.images).map((image, index) =>
          <img key={image} id="frame" src={URL.createObjectURL(this.state.images[image])} width="250px" height="250px"/>
        )
      } else if (this.state.previewImages === 'yes' && Object.keys(this.state.images).length > 5) {
        var renderPreviews = <div style={{color: "red"}}>You are only allowed to upload 5 images.</div>
      }
      return (
      <div>
        <button onClick={this.handleToggle}>Add Answer</button>
       {this.state.showModal &&
        <QuestionAnswerAddModal onCloseRequest={this.handleToggle}>
          <form onSubmit={(event) => this.onSubmitAnswer(event)}>
            <textarea onChange={(event) => this.onChangeTextArea(event)} style={{height: '15em', width: '99%'}} required="required" maxLength="1000" placeholder="Answer"></textarea><br/>
            <label htmlFor="lname">Nickname:</label><br/>
            <input onChange={(event) => this.onChangeNickName(event)} placeholder="Example: jack543!" maxLength="60" type="text" id="fname" name="fname" required/><br/>
            <div>For privacy reasons, do not use your full name or email address</div><br/>
            <label htmlFor="lname">Email:</label><br/>
            <input onChange={(event) => this.onChangeEmail(event)} type="email" placeholder="Example: jack@email.com" maxLength="60" id="lname" name="lname" required/><br/>
            <div>For authentication reasons, you will not be emailed</div><br/>
            <input onChange={() => this.previewImages()} type="file" id="img" name="img" accept="image/*" multiple="multiple"/><br/>
            {renderPreviews}<br/>
            <button>Submit</button>
          </form>
        </QuestionAnswerAddModal>}
      </div>
    );
  }
}

export default QuestionAnswerAdd;