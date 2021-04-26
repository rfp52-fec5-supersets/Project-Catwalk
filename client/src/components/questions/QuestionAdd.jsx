import React from 'react';
import QuestionModal from './QuestionModal.jsx';
import API_KEY from './../../config.js';
import axios from 'axios';

class QuestionAdd extends React.Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      showModal: false,
      username: '',
      question: '',
      email: '',
    }
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

  onChangeQuestion(event) {
    console.log(event.target.value)
    const {value} = event.target
    this.setState({
      question: value
    })
  }

  onChangeUsername(event) {
    console.log(event.target.value)
    this.setState({
      username: event.target.value
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
    event.target.reset()
    console.log(this.state)
    const {productID: id} = this.props;
    console.log(typeof this.props.productID)
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`, {
      body: this.state.question,
      name: this.state.username,
      email: this.state.email,
      product_id: this.props.productID
    }, {headers: {'Authorization': API_KEY}})
    .then((res) => {
      console.log(res)
      console.log(this.state, this.props.productID)
      console.log('submitted')
    })
    .catch((err) => {
      console.log("ERROR")
      throw err
    })
  }

  render() {
    return (
      <div>
      <button onClick={this.handleToggle}>Add Question</button>
     {this.state.showModal &&
      <QuestionModal onCloseRequest={this.handleToggle}>
        <div>
          <div>Ask Your Question</div><br/>
          <div>About the {this.props.productName}</div><br/>
            <form onSubmit={(event) => this.onSubmitAnswer(event)}>
            <textarea onChange={(event) => this.onChangeQuestion(event)} style={{height: '15em', width: '99%'}} required="required" maxLength="1000" placeholder="Answer"></textarea><br/>
            <label htmlFor="lname">Username:</label><br/>
            <input onChange={(event) => this.onChangeUsername(event)} placeholder="Example: jack543!" maxLength="60" type="text" id="fname" name="fname" required/><br/>
            <div>For privacy reasons, do not use your full name or email address</div><br/>
            <label htmlFor="lname">Email:</label><br/>
            <input onChange={(event) => this.onChangeEmail(event)} type="email" placeholder="Why did you like the product or not?" maxLength="60" id="lname" name="lname" required/><br/>
            <div>For authentication reasons, you will not be emailed</div><br/>
            <button>Submit</button>
          </form>
        </div>
      </QuestionModal>}
    </div>
    )
  }
}

export default QuestionAdd;