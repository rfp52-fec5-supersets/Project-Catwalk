import React from 'react';
import QuestionAnswer from './QuestionAnswer.jsx';
import QuestionHelpfulness from './QuestionHelpfulness.jsx';
import QuestionAnswerAdd from './QuestionAnswerAdd.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMoreAnswers: 'no'
    }
  }

  loadMoreAnswersRender() {
    if (Object.keys(this.props.question.answers).length > 2 && this.state.loadMoreAnswers === 'no') {
      return (
        <button onClick={() => this.setState({loadMoreAnswers: 'yes'})}type="button">Load More Answers</button>
      )
    } else if (Object.keys(this.props.question.answers).length > 2 && this.state.loadMoreAnswers === 'yes'){
      return (
        <button onClick={() => this.setState({loadMoreAnswers: 'no'})}type="button">Collapse answers</button>
      )
    }
  }

  render() {
    const {question} = this.props;
    let answersArray = [];

    for (let key in question.answers) {
      answersArray.push(question.answers[key])
    }
    if (this.state.loadMoreAnswers === 'no') {
      answersArray = answersArray.slice(0, 2)
    }
    answersArray.sort((a, b) => b.helpfulness - a.helpfulness)
    const answers = answersArray.map((answer) =>
      <QuestionAnswer key={answer.id} answer={answer}/>
    )
    return (
      <div className="questionList">
        <div className="questionBody">
        <h1 className="questionHeader">Q: {question.question_body}</h1>
        <QuestionHelpfulness id={question.question_id} helpfulness={question.question_helpfulness}/>
        <QuestionAnswerAdd id={question.question_id}/>
        </div>
        <div className="questionAnswer">
        <h1 className="questionHeader">A:</h1>
        <div className="answerColumn">
        {answers}
        {this.loadMoreAnswersRender()}
        </div>
        </div>
      </div>
    )
  }
}

export default Question;