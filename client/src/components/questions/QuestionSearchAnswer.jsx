import React from 'react';

class QuestionSearchAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {search} = this.props
    return (
      <input className="question-search" onChange={(event) => search(event)} type="text" placeholder="Have a question? Search for answers…" name="search"/>
    )
  }
}

export default QuestionSearchAnswer;