import React from 'react';
import Question from './Question.jsx'
import axios from 'axios';
import API_KEY from './../../config.js';
import QuestionSearchAnswer from './QuestionSearchAnswer.jsx'
import QuestionAdd from './QuestionAdd.jsx'
class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loadMoreQuestions: 'no',
      loadMoreAnswers: 'no',
      sliceIndex: 2
    };
  }

  componentDidMount() {
    // Destructuring
    const { productID } = this.props;
    axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}`,
      headers: {'Authorization': API_KEY}
    })
    .then((res) =>
      this.setState({
        questions: res.data.results
      })
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { productID } = this.props;
      axios({
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}`,
        headers: {'Authorization': API_KEY}
      })
      .then((res) =>
        this.setState({
          questions: res.data.results
        })
      )
    }
  }

  loadMoreQuestionsRender() {
    if (this.state.questions.length > 2 && this.state.sliceIndex < this.state.questions.length) {
      return (
        <button onClick={() => this.setState({loadMoreQuestions: 'yes', sliceIndex: this.state.sliceIndex + 2})}type="button">More Answered Questions</button>
      )
    }
  }

  render() {
    let { questions } = this.state;
    questions = questions.slice(0, this.state.sliceIndex)
    questions.sort((a, b) => a.question_helpfulness < b.question_helpfulness)

    const question = questions.map((question) => (
      <Question key={question.question_id} question={question}/>
    ));
    return (
      <div className = 'questions-and-answers'>
        <h1>QuestionsList</h1>
        <QuestionSearchAnswer />
        {question}
        {this.loadMoreQuestionsRender()}
        <QuestionAdd productID={this.props.productID} productName={this.props.productName}/>
      </div>
    );
  }
}

export default QuestionsList;