import React from 'react';

class QuestionSearchAnswer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Search Answers</h1>
        <input type="text" placeholder="Search.." name="search"/>
      </div>
    )
  }
}

export default QuestionSearchAnswer;