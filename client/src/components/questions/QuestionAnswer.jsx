import React from 'react';
import QuestionAnswerUser from './QuestionAnswerUser.jsx'
import QuestionAnswerHelpfulness from './QuestionAnswerHelpfulness.jsx'
import moment from 'moment';
moment().format();

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {answer} = this.props;
    return (
      <div className="answer-column">
      <p>
        {answer.body}
      </p>
      <div className="answer-helpfullness">
      <QuestionAnswerUser answer={answer} />
      <span>|</span>
      <p>{moment(answer.date).format('MMMM Do YYYY')}</p>
      <span>|</span>
      <QuestionAnswerHelpfulness helpfulness={answer}/>
      </div>
      <hr className="answer-hr"/>
      </div>
    )
  }
}

export default QuestionAnswer;