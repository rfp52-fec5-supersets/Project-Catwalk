import React from 'react';

class QuestionAnswerUser extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {answer} = this.props
    // console.log(answer)
    return (
      <p>
        by {answer.answerer_name}
      </p>
    )
  }
}

export default QuestionAnswerUser;