import React from 'react';
let CharaMessages = {
  Size: ['A size too small',
    '½ a size too small',
    'Perfect',
    '½ a size too big',
    'A size too wide'],
  Width: ['Too narrow',
    'Slightly narrow',
    'Perfect',
    'Slightly wide',
    'Too wide'],
  Comfort: ['Uncomfortable',
    'Slightly uncomfortable',
    'Ok',
    'Comfortable',
    'Perfect'],
  Quality: ['Poor',
    'Below average',
    'What I expected',
    'Pretty great',
    'Perfect'],
  Length: ['Runs Short',
    'Runs slightly short',
    'Perfect',
    'Runs slightly long',
    'Runs long'],
  Fit: ['Runs tight',
    'Runs slightly tight',
    'Perfect',
    'Runs slightly long',
    'Runs long']
}

class AddStarRating extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleChara(this.props.chara, e.target.value);
  }

  render() {
    // For each charac rating, input as array of 5 radio buttons.
    // Meaning of lowest and highest selection appear below array of buttons.
    // Default no button selected
    // Above buttons, meaning of current selection explicitly presented, default = none selected.
    let chara = this.props.chara;
    let choices = [];
    let charaRating = this.props.charaRatings[chara];
    if (charaRating) {
      charaRating = parseInt(charaRating);
    }
    for (let i = 1; i <= 5; i++) {
      let button = <input key={i} type='radio' name={'chara-'+chara} value={i} id={'add-review-char-rating-'+i} checked={charaRating === i} required='required' onChange={this.handleClick}></input>;
      choices.push(button);
    }
    return (
      <div>
        <span>{this.props.chara}</span>
        {choices}
      </div>
    );
  }
}

export default AddStarRating