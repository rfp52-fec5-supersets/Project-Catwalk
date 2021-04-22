import React from 'react';
import API_KEY from './../../config.js';
import axios from 'axios';

class QuestionHelpfulness extends React.Component {
  constructor(props) {
    super(props);
    // Stores helpfulness in a state
    const {helpfulness} = this.props
    this.state = {
      helpfulness: helpfulness,
      reported: 'no',
      voted: 'no'
    }
  }

  onClickHelpful() {
    const {id} = this.props;
    // Put request to increase the helpfulness of the answer's id
    if (this.state.voted === 'no') {
      axios({
       method: 'put',
       url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/helpful`,
       headers: {'Authorization': API_KEY}
     })
     .then((res) => {
       // Manage helpfulness in state so that when we increase our helpfulness, we aren't also doing a get request.
       this.setState({
         helpfulness: this.state.helpfulness + 1,
         reported: 'no',
         voted: 'yes'
       })
     })
     .catch((err) => {
       throw err
     })
    }
  }

  onClickReport() {
    if (this.state.reported === 'no') {
    const {id} = this.props.helpfulness;
     axios({
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/report`,
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

export default QuestionHelpfulness;