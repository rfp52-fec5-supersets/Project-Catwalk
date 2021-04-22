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
  }

  render() {
    // For each charac rating, input as array of 5 radio buttons.
    // Meaning of lowest and highest selection appear below array of buttons.
    // Default no button selected
    // Above buttons, meaning of current selection explicitly presented, default = none selected.
    return (
      <div>
        Add Chara Rating
      </div>
    );
  }
}

export default AddStarRating