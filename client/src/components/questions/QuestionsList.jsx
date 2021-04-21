import React from 'react';
import Question from './Question.jsx'
import axios from 'axios';
import API_KEY from './../../config.js';
import QuestionSearchAnswer from './QuestionSearchAnswer.jsx'

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
          question_id: 104619,
          question_body: 'Where does this product ship from?',
          question_date: '2017-11-04T00:00:00.000Z',
          asker_name: 'toofast',
          question_helpfulness: 18,
          reported: false,
          answers: {
            992154: {
              id: 992154,
              body: 'Mine was delivered from Oklahoma',
              date: '2017-11-04T00:00:00.000Z',
              answerer_name: 'toofast',
              helpfulness: 14,
              photos: [],
            },
            992165: {
              id: 992165,
              body: 'It ships from the facility in Tulsa',
              date: '2017-11-04T00:00:00.000Z',
              answerer_name: 'toofast',
              helpfulness: 20,
              photos: [],
            },
          },
        },
        {
          question_id: 104617,
          question_body: 'Is this product sustainable?',
          question_date: '2018-09-04T00:00:00.000Z',
          asker_name: 'cleopatra',
          question_helpfulness: 14,
          reported: false,
          answers: {
            992117: {
              id: 992117,
              body: 'Its made from sustainable parts and manufactured in a green facility',
              date: '2018-10-04T00:00:00.000Z',
              answerer_name: 'marcanthony',
              helpfulness: 18,
              photos: [],
            },
          },
        },
        {
          question_id: 104620,
          question_body: 'Where is this product made?',
          question_date: '2018-08-12T00:00:00.000Z',
          asker_name: 'thegrimreaker',
          question_helpfulness: 9,
          reported: false,
          answers: {
            992166: {
              id: 992166,
              body: 'Taiwan',
              date: '2018-09-12T00:00:00.000Z',
              answerer_name: 'thegrimreaker',
              helpfulness: 2,
              photos: [],
            },
          },
        },
        {
          question_id: 104612,
          question_body: 'Does this product run big or small?',
          question_date: '2018-11-12T00:00:00.000Z',
          asker_name: 'coolkid',
          question_helpfulness: 8,
          reported: false,
          answers: {
            992110: {
              id: 992110,
              body: "Runs small, I'd say",
              date: '2018-01-12T00:00:00.000Z',
              answerer_name: 'warmkid',
              helpfulness: 9,
              photos: [],
            },
            1444139: {
              id: 1444139,
              body: 'Well I say it runs big!',
              date: '2021-03-12T00:00:00.000Z',
              answerer_name: 'smalls',
              helpfulness: 0,
              photos: [],
            },
            1444248: {
              id: 1444248,
              body: "I haven't used it yet, but it seems alright.",
              date: '2021-03-13T00:00:00.000Z',
              answerer_name: 'justInCase',
              helpfulness: 1,
              photos: [],
            },
          },
        },
        {
          question_id: 104618,
          question_body: 'What fabric is the bottom made of?',
          question_date: '2018-02-18T00:00:00.000Z',
          asker_name: 'iluvcatz',
          question_helpfulness: 6,
          reported: false,
          answers: {
            992095: {
              id: 992095,
              body: 'Some kind of recycled rubber, works great!',
              date: '2018-03-18T00:00:00.000Z',
              answerer_name: 'iluvdogz',
              helpfulness: 3,
              photos: [],
            },
            992118: {
              id: 992118,
              body: 'Rubber',
              date: '2018-03-18T00:00:00.000Z',
              answerer_name: 'iluvdogz',
              helpfulness: 8,
              photos: [
                'https://images.unsplash.com/photo-1477823986828-5aff156284aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
              ],
            },
            992121: {
              id: 992121,
              body: 'Its a rubber sole',
              date: '2018-03-18T00:00:00.000Z',
              answerer_name: 'iluvbirds',
              helpfulness: 2,
              photos: [
                'https://images.unsplash.com/photo-1528318269466-69d920af5dad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
              ],
            },
            992148: {
              id: 992148,
              body: 'The rubber on the bottom wears thin quickly',
              date: '2018-02-18T00:00:00.000Z',
              answerer_name: 'iluvdogz',
              helpfulness: 46,
              photos: [],
            },
            1444193: {
              id: 1444193,
              body: '10/10 would recomend.',
              date: '2021-03-12T00:00:00.000Z',
              answerer_name: 'namnam',
              helpfulness: 2,
              photos: [],
            },
            1444194: {
              id: 1444194,
              body: "I haven't used it yet, but it seems alright.",
              date: '2021-03-12T00:00:00.000Z',
              answerer_name: 'justInCase',
              helpfulness: 1,
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
      questions.sort((a, b) => a.question_helpfulness < b.question_helpfulness)
    }
    const question = questions.map((question) => (
      <Question key={question.question_id} question={question} loadMoreAnswers={this.state.loadMoreAnswers}/>
    ));
    return (
      <div>
        <h1>QuestionsList</h1>
        <QuestionSearchAnswer />
        {question}
      </div>
    );
  }
}

export default QuestionsList;