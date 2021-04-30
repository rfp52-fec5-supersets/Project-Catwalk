import React from 'react';
import QuestionAnswer from './QuestionAnswer.jsx';
import QuestionHelpfulness from './QuestionHelpfulness.jsx';
import QuestionAnswerAdd from './QuestionAnswerAdd.jsx';
import QuestionSearchAnswer from './QuestionSearchAnswer.jsx'

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMoreAnswers: 'no',
    }
  }

  loadMoreAnswersRender() {
    if (Object.keys(this.props.question.answers).length > 2 && this.state.loadMoreAnswers === 'no') {
      return (
        <a className="load-more-answers" href="" onClick={(event) => {event.preventDefault(); this.setState({loadMoreAnswers: 'yes'})}}>Load More Answers</a>
      )
    } else if (Object.keys(this.props.question.answers).length > 2 && this.state.loadMoreAnswers === 'yes'){
      return (
        <a className="load-more-answers" href="" onClick={(event) => {event.preventDefault(); this.setState({loadMoreAnswers: 'no'})}}>Collapse answers</a>
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
<div>
  <div className="question">
  <h1>Q: {question.question_body}</h1>
  <QuestionHelpfulness id={question.question_id} helpfulness={question.question_helpfulness}/>
  <span>|</span>
  <QuestionAnswerAdd id={question.question_id}/>
  </div>
  <div className="answer">
  <h1>A:</h1>
  {answers}
  {this.loadMoreAnswersRender()}
  </div>
</div>
      )
    }
}

export default Question;