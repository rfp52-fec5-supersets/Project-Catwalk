import React from 'react';
import API_KEY from './../../config.js';
import axios from 'axios';

class QuestionAnswerHelpfulness extends React.Component {
  constructor(props) {
    super(props);
    // Stores helpfulness in a state
    const {helpfulness} = this.props.helpfulness
    this.state = {
      helpfulness: helpfulness,
      reported: 'no'
    }
  }

  onClickHelpful() {
    const {id} = this.props.helpfulness;
    // Put request to increase the helpfulness of the answer's id
     axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`,
      headers: {'Authorization': API_KEY}
    })
    .then((res) => {
      // Manage helpfulness in state so that when we increase our helpfulness, we aren't also doing a get request.
      this.setState({
        helpfulness: this.state.helpfulness + 1
      })
    })
    .catch((err) => {
      throw err
    })
  }

  onClickReport() {
    if (this.state.reported === 'no') {
    const {id} = this.props.helpfulness;
     axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`,
      headers: {'Authorization': API_KEY}
    })
    .then((res) => {
     this.setState({
        reported: 'yes'
      })
    })
    .catch((err) => {
      throw err
    })
    }
  }

  onClickReportRender() {
    if (this.state.reported === 'no') {
      return ('Report')
    } else {
      return ('Reported')
    }
  }

  render() {
    return (
      <div>
        <p>Helpful? <a onClick={() => this.onClickHelpful()}href="#">Yes</a> ({this.state.helpfulness}) | <a onClick={() => this.onClickReport()} href="#">{this.onClickReportRender()}</a></p>
      </div>
    )
  }
}

export default QuestionAnswerHelpfulness;