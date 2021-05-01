import React from 'react';
const CharaMessages = {
  Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
}

class AddCharaRating extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleChara(this.props.chara, e.target.value);
  }

  render() {
    let chara = this.props.chara;
    let choices = [];
    let charaRating = this.props.charaRatings[chara];
    let charaMessage = 'none selected';
    if (charaRating) {
      charaRating = parseInt(charaRating);
      charaMessage = CharaMessages[chara][charaRating - 1];
    }
    for (let i = 1; i <= 5; i++) {
      let button = <input key={i} type='radio' name={'chara-'+chara} value={i} className={'add-review-char-rating-'+i} checked={charaRating === i} required='required' onChange={this.handleClick}></input>;
      choices.push(button);
    }
    return (
      <div className='add-review-chara'>
        <div><em>{this.props.chara}</em></div>
        <div className = 'flex-box flex-center add-review-chara-message'>{charaMessage}</div>
        <div className='flex-box flex-around'>
          {choices}
        </div>
        <div className='flex-box flex-around'>
          <span style={{fontSize:'75%'}} >{CharaMessages[chara][0]}</span>
          <span/><span/><span/>
          <span style={{fontSize:'75%'}} >{CharaMessages[chara][4]}</span>
        </div>
        <br />
      </div>
    );
  }
}

export default AddCharaRating