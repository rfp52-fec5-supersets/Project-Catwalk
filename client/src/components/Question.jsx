import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {question} = this.props;
    let answersArray = [];

    for (let key in question.answers) {
      answersArray.push(question.answers[key])
    }

    if (this.props.loadMoreAnswers === 'no') {
      answersArray = answersArray.slice(0, 2)
    }
    const answers = answersArray.map((answer) =>
      <h1 key={answer.id} >{answer.body}</h1>
    )
    return (
      <div>
        <div className="questionBody">
        <h1>{question.question_body}</h1>
        </div>
        <div className="questionAnswer">
        {answers}
        </div>
      </div>
    )
  }
}

export default Question;