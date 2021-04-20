import React from 'react';

class QuestionAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {answer} = this.props;
    return (
      <p>
        {answer}
      </p>
    )
  }
}

export default QuestionAnswer;