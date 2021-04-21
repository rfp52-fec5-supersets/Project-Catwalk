import React from 'react';
import QuestionAnswer from './QuestionAnswer.jsx'
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMoreAnswers: 'no'
    }
  }

  loadMoreRender() {
    if (Object.keys(this.props.question.answers).length > 2) {
      return (
        <button onClick={() => this.setState({loadMoreAnswers: 'yes'})}type="button">Load More Answers</button>
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
        </div>
        <div className="questionAnswer">
        <h1 className="questionHeader">A:</h1>
        <div className="answerColumn">
        {answers}
        {this.loadMoreRender()}
        </div>
        </div>
      </div>
    )
  }
}

export default Question;