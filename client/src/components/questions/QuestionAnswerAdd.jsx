import React from 'react';
import QuestionModal from './QuestionModal.jsx';
import API_KEY from './../../config.js';
import axios from 'axios';

class QuestionAnswerAdd extends React.Component {
  constructor (props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      showModal: false,
      previewImages: 'no',
      images: [],
      photoURLs: [],
      textArea: '',
      nickName: '',
      email: '',
    }
  }

  handleToggle() {
    let newState = !this.state.showModal;
    this.setState({
      showModal: newState
    });
  }

  previewImages() {
    let images = this.state.images;
    images.push(event.target.files[0])
    let imgurFormData = new FormData();

    imgurFormData.append('image', event.target.files[0]);
    axios.post('https://api.imgur.com/3/image', imgurFormData, {
      headers: {
        'Authorization': 'Client-ID e5992391a3d9a22'
      }
    })
      .then((response)=> {
        let photoURLs = this.state.photoURLs;
        photoURLs.push(response.data.data.link);
        console.log(response.data.data.link);
        this.setState({
          photoURLs: photoURLs
        })
      })
      .catch((err)=>{
        console.log('err in readFile', err);
      });

    this.setState({
      previewImages: 'yes',
      images: images
    })
  }

  onChangeTextArea(event) {
    console.log(event.target.value)
    const {value} = event.target
    this.setState({
      textArea: value
    })
  }

  onChangeNickName(event) {
    console.log(event.target.value)
    this.setState({
      nickName: event.target.value
    })
  }

  onChangeEmail(event) {
    console.log(event.target.value)
    this.setState({
      email: event.target.value
    })
  }
  onSubmitAnswer(event) {
    event.preventDefault()
    event.target.reset()
    console.log(this.state)
    const {id} = this.props;
    // axios({
    //   method: 'post',
    //   url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers`,
    //   headers: {'Authorization': API_KEY}
    // })
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers`, {
      body: this.state.textArea,
      name: this.state.nickName,
      email: this.state.email,
      photos: this.state.photoURLs
    }, {headers: {'Authorization': API_KEY}})
    .then((res) => {
      console.log(res)
      console.log('submitted')
    })
    .catch((err) => {
      console.log("ERROR")
      throw err
    })
  }
    render() {
      // console.log(typeof this.state.images)
      if (this.state.previewImages === 'yes') {
        var renderPreviews = this.state.images.map((image) =>{
          const index = this.state.images.indexOf(image)
          return <img index={index} key={image} id="frame" src={URL.createObjectURL(image)} width="250px" height="250px"/>
        })
      }
      return (
      <div>
        <button onClick={this.handleToggle}>Add Answer</button>
       {this.state.showModal &&
        <QuestionModal onCloseRequest={this.handleToggle}>
          <form onSubmit={(event) => this.onSubmitAnswer(event)}>
            <textarea onChange={(event) => this.onChangeTextArea(event)} style={{height: '15em', width: '99%'}} required="required" maxLength="1000" placeholder="Answer"></textarea><br/>
            <label htmlFor="lname">Nickname:</label><br/>
            <input onChange={(event) => this.onChangeNickName(event)} placeholder="Example: jack543!" maxLength="60" type="text" id="fname" name="fname" required/><br/>
            <div>For privacy reasons, do not use your full name or email address</div><br/>
            <label htmlFor="lname">Email:</label><br/>
            <input onChange={(event) => this.onChangeEmail(event)} type="email" placeholder="Example: jack@email.com" maxLength="60" id="lname" name="lname" required/><br/>
            <div>For authentication reasons, you will not be emailed</div><br/>
            {this.state.images.length <= 4 && <div><input onChange={() => this.previewImages()} type="file" id="img" name="img" accept="image/*"/><br/></div>}
            {renderPreviews}<br/>
            <button>Submit</button>
          </form>
        </QuestionModal>}
      </div>
    );
  }
}

export default QuestionAnswerAdd;