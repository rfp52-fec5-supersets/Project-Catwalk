import React from 'react';
import axios from 'axios';
import AddStarRating from './AddStarRating.jsx';
import AddCharaRating from './AddCharaRating.jsx';
import API_KEY from './../../config.js'

// client_id: 121adb5801ad1ad
// client_secret: c70e64b379cdfb1709afc07ba3214ed577fb2aca

class AddReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product.id,
      starRating: 0,
      charaRatings: {},
      characteristics: {},
      summary: '',
      body: '',
      photos:[],
      photoURLs: [],
      name:'',
      email:''
    }
    this.handleStar = this.handleStar.bind(this);
    this.handleRecommended = this.handleRecommended.bind(this);
    this.handleChara = this.handleChara.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.imageInput = React.createRef();
  }

  handleStar(starCount) {
    // When AddStarRating Component receives a click, it returns the star Count of the star.
    // 1-5
    this.setState({
      starRating: starCount
    })
  }

  handleRecommended(e) {
    this.setState({
      recommend: e.target.value
    })
  }

  handleChara(chara, rating) {
    // this.state.charaRating = {chara1: rating1, chara2: rating2, etc.}
    let currentRatings = this.state.charaRatings;
    currentRatings[chara] = rating;
    let charaId = this.props.charaId[this.props.characteristics.indexOf(chara)];
    let characteristics = this.state.characteristics;
    characteristics[charaId] = parseInt(rating);
    this.setState({
      charaRatings: currentRatings,
      characteristics: characteristics
    });
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handlePhotos(e) {
    // this.imageInput.current === e.target in this case
    let photos = this.state.photos;
    photos.push(e.target.files[0]);
    let imgurFormData = new FormData();
    imgurFormData.append('image', e.target.files[0]);
    // {image: e.target.files[0]}
    axios.post('https://api.imgur.com/3/image', imgurFormData, {
      headers: {
        // Authorization: Client-ID {your-client-id}
        'Authorization': 'Client-ID 121adb5801ad1ad'
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
      photos: photos
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let errorMessage = '';
    if (this.state.starRating === 0) {
      errorMessage = errorMessage + 'Need to fill out star rating!\n';
    }
    if (this.state.body.length < 50) {
      errorMessage = errorMessage + 'Need to have 50 or more characters in body!\n';
    }
    if (this.state.photos.length !== this.state.photoURLs.length) {
      errorMessage = errorMessage + 'Please wait a bit for photos to finish uploading to form!';
    }
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    let {product_id, starRating, summary, body, recommend, name, email, characteristics, photoURLs} = this.state;
    let rating = starRating;
    let photos = photoURLs;
    if (recommend === 'true') {
      recommend = true;
    } else {
      recommend = false;
    }
    let reviewParams = {product_id, rating, summary, body, recommend, name, email, characteristics, photos};
    console.log(reviewParams);
    axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews', reviewParams, {
      headers: {'Authorization': API_KEY}
    })
      .then(()=>{
        alert('submitted!');
        // should try to reset page to show review.
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  render() {
    return (
      <div className='add-review-modal-content'>
        <h2>Write Your Review</h2>
        <h3>About the {this.props.product.name}</h3>
        <form onSubmit={this.handleSubmit} className='add-reviews-form grid-container'>
          <AddStarRating starCount={this.state.starRating} handleClick = {this.handleStar}></AddStarRating>
          <div className='add-review recommended-form'>
            <p>Do you recommend product?</p>
            <input type='radio' name='recommend' value={true} id='add-review-recommended-yes' required='required' checked={this.state.recommend === 'true'} onChange={this.handleRecommended}></input>
            <label htmlFor='add-review-recommended-yes'>Yes</label>
            <input type='radio' name='recommend' value={false} id='add-review-recommended-no' required='required' checked={this.state.recommend === 'false'} onChange={this.handleRecommended}></input>
            <label htmlFor='add-review-recommended-no'>No</label>
          </div>
          <div className='add-review-charas'>
            {this.props.characteristics.map((chara)=>{
              return <AddCharaRating key={chara} chara={chara} handleChara = {this.handleChara} charaRatings={this.state.charaRatings}/>;
            })}
          </div>
          <div className='add-review-summary'>
            <label>Review Summary</label>
            <br />
            <input name='summary' onChange={this.handleTextChange} type='text' placeholder='Example: Best purchase ever!' maxLength={60} value={this.state.summary}></input>
          </div>
          <div className='add-review-body'>
            <label>Review Body</label>
            <br />
            <textarea name='body' onChange={this.handleTextChange} placeholder='Why did you like the product or not?' maxLength={1000} minLength={50} value={this.state.body} required='required' cols={40} rows={5}></textarea>
            {(this.state.body.length < 50)
            ? <div>Minimum required characters left: {50 - this.state.body.length}</div>
            : <div>Minimum reached</div>}
          </div>
          <div className='add-review-photos'>
            <span>Upload photos: </span>
            {this.state.photos.length < 5 &&
            <input type='file' accept='image/*' onChange={this.handlePhotos} ref={this.imageInput}/>}
            <div>
              {this.state.photos.length > 0 &&
              this.state.photos.map((photo) => {
                let index = this.state.photos.indexOf(photo);
                return <img key={index} className='reviews-thumbnail' src={URL.createObjectURL(photo)} />
              })}
            </div>
          </div>
          <div className='add-review-username'>
            <label>Review Nickname</label>
            <input name='name' onChange={this.handleTextChange} type='text' placeholder='Example: jackson11!' maxLength={60} value={this.state.name} required='required'></input>
            <div>For privacy reason, do not use your full name or email address</div>
          </div>
          <div className='add-review-email'>
            <label>Review Email</label>
            <input name='email' onChange={this.handleTextChange} type='email' placeholder='Example: jackson11@email.com' maxLength={60} value={this.state.email} required='required'></input>
            <div>For authentication reasons, you will not be emailed</div>
          </div>
          <div className='add-review-submit'>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    );
  }
}
export default AddReviewForm;
