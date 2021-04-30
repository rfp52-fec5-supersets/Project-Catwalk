import React from 'react';
import Question from './Question.jsx'
import axios from 'axios';
import API_KEY from './../../config.js';
import QuestionSearchAnswer from './QuestionSearchAnswer.jsx'
import QuestionAdd from './QuestionAdd.jsx'
class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loadMoreQuestions: 'no',
      loadMoreAnswers: 'no',
      search: 'no',
      keywords: '',
      sliceIndex: 2
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
    //   this.setState({
    //     questions: res.data.results
    //   })
    // )
    // .catch((err) => {
    //   console.log(err)
    // })

    this.setState({
      questions: [
        {
            "question_id": 104618,
            "question_body": "What fabric is the bottom made of?",
            "question_date": "2018-02-18T00:00:00.000Z",
            "asker_name": "iluvcatz",
            "question_helpfulness": 13,
            "reported": false,
            "answers": {
                "992121": {
                    "id": 992121,
                    "body": "Its a rubber sole",
                    "date": "2018-03-18T00:00:00.000Z",
                    "answerer_name": "iluvbirds",
                    "helpfulness": 9,
                    "photos": [
                        "https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    ]
                },
                "1444194": {
                    "id": 1444194,
                    "body": "I haven't used it yet, but it seems alright.",
                    "date": "2021-03-12T00:00:00.000Z",
                    "answerer_name": "justInCase",
                    "helpfulness": 3,
                    "photos": []
                }
            }
        },
        {
            "question_id": 104624,
            "question_body": "What fabric is the top made of?",
            "question_date": "2018-11-08T00:00:00.000Z",
            "asker_name": "wonderwoman",
            "question_helpfulness": 8,
            "reported": false,
            "answers": {
                "992106": {
                    "id": 992106,
                    "body": "Something pretty soft but I can't be sure",
                    "date": "2018-01-08T00:00:00.000Z",
                    "answerer_name": "superman",
                    "helpfulness": 6,
                    "photos": []
                },
                "992177": {
                    "id": 992177,
                    "body": "Its the best! Seriously magic fabric",
                    "date": "2018-11-08T00:00:00.000Z",
                    "answerer_name": "superman",
                    "helpfulness": 4,
                    "photos": []
                },
                "992178": {
                    "id": 992178,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date": "2018-12-08T00:00:00.000Z",
                    "answerer_name": "superman",
                    "helpfulness": 5,
                    "photos": []
                }
            }
        },
        {
            "question_id": 104613,
            "question_body": "Can I wash it?",
            "question_date": "2018-07-06T00:00:00.000Z",
            "asker_name": "jbilas",
            "question_helpfulness": 5,
            "reported": false,
            "answers": {
                "992111": {
                    "id": 992111,
                    "body": "I wouldn't machine wash it",
                    "date": "2018-08-06T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 1,
                    "photos": []
                },
                "992112": {
                    "id": 992112,
                    "body": "Only if you want to ruin it!",
                    "date": "2018-08-06T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 2,
                    "photos": []
                },
                "992113": {
                    "id": 992113,
                    "body": "I've thrown it in the wash and it seems fine",
                    "date": "2018-08-06T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 3,
                    "photos": []
                },
                "992114": {
                    "id": 992114,
                    "body": "It says not to",
                    "date": "2018-08-06T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 4,
                    "photos": []
                },
                "992136": {
                    "id": 992136,
                    "body": "Yes",
                    "date": "2018-09-06T00:00:00.000Z",
                    "answerer_name": "dschulman",
                    "helpfulness": 6,
                    "photos": []
                }
            }
        }
    ]
    })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.productID !== this.props.productID) {
  //     const { productID } = this.props;
  //     console.log(productID)
  //     axios({
  //       method: 'get',
  //       url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}`,
  //       headers: {'Authorization': API_KEY}
  //     })
  //     .then((res) =>
  //       this.setState({
  //         questions: res.data.results
  //       })
  //     )
  //   }
  // }

  loadMoreQuestionsRender() {
    if (this.state.questions.length > 2 && this.state.sliceIndex < this.state.questions.length) {
      return (
        <button className="load-more-questions" onClick={() => this.setState({loadMoreQuestions: 'yes', sliceIndex: this.state.sliceIndex + 2})}type="button">More Answered Questions</button>
      )
    }
  }

  onChangeSearch(event) {
    this.setState({keywords: event.target.value})
  }


  render() {
    let { questions } = this.state;
    questions = questions.slice(0, this.state.sliceIndex)
    questions.sort((a, b) => a.question_helpfulness < b.question_helpfulness)
    let placeholder = []
    if (this.state.keywords.length >= 3) {
      for (let question of questions) {
        if (question.question_body.toLowerCase().includes(this.state.keywords.toLowerCase())) {
          placeholder.push(question)
        }
      }
      questions = placeholder
    }
    const question = questions.map((question) => (
      <Question key={question.question_id} question={question}/>
    ));
    return (
      <div className = 'questions-and-answers'>
        <h1 style={{textAlign: "center"}}>Questions and Answers</h1>
        <QuestionSearchAnswer search={this.onChangeSearch.bind(this)}/>
        {question}
        <div className="load-more-add">
        {this.loadMoreQuestionsRender()}
        <QuestionAdd productID={this.props.productID} productName={this.props.productName}/>
        </div>
      </div>
    );
  }
}

export default QuestionsList;