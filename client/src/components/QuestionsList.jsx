import React from 'react';
import Question from './Question.jsx'
import axios from 'axios';
import API_KEY from '../config.js'

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loadMoreQuestions: 'no',
      loadMoreAnswers: 'no'
    };
  }

  componentDidMount() {
    // Destructuring
    // const { productID } = this.props;
    // axios({
    //   method: 'get',
    //   url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}`,
    //   headers: {'Authorization': API_KEY}
    // })
    // .then((res) =>
    //   // res.data.results.sort((a, b) => {
    //   //   return a - b
    //   // }
    //   // )
    //   this.setState({
    //     questions: res.data.results
    //   })
    // )

    this.setState({
      questions: [
        {
          question_id: 37,
          question_body: "Why is this product cheaper here than other sites?",
          question_date: "2018-10-18T00:00:00.000Z",
          asker_name: "williamsmith",
          question_helpfulness: 4,
          reported: false,
          answers: {
            68: {
              id: 68,
              body:
                "We are selling it here without any markup from the middleman!",
              date: "2018-08-18T00:00:00.000Z",
              answerer_name: "Seller",
              helpfulness: 4,
              photos: [],
            },
          },
        },
        {
          question_id: 38,
          question_body: "How long does it last?",
          question_date: "2019-06-28T00:00:00.000Z",
          asker_name: "funnygirl",
          question_helpfulness: 2,
          reported: false,
          answers: {
            70: {
              id: 70,
              body:
                "Some of the seams started splitting the first time I wore it!",
              date: "2019-11-28T00:00:00.000Z",
              answerer_name: "sillyguy",
              helpfulness: 6,
              photos: [],
            },
            78: {
              id: 78,
              body: "9 lives",
              date: "2019-11-12T00:00:00.000Z",
              answerer_name: "iluvdogz",
              helpfulness: 31,
              photos: [],
            },
          },
        },
      ]
    });
  }

  render() {
    let { questions } = this.state;
    if (this.state.loadMoreQuestions === 'no') {
      questions = questions.slice(0, 4)
      questions.sort((a, b) => (a.question_helpfulness < b.question_helpfulness) ? 1 : -1)
    }

    const question = questions.map((question) => (
      <Question key={question.question_id} question={question} loadMoreAnswers={this.state.loadMoreAnswers}/>
    ));
    // console.log(this.state);
    return (
      <div>
        <h1>QuestionsList</h1>
        {question}
      </div>
    );
  }
}

export default QuestionsList;