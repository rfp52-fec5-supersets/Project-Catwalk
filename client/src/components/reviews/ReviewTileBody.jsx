import React from 'react';
import moment from 'moment';
import ImageThumbnail from './ImageThumbnail.jsx';

class ReviewTileBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      bodyLimit: 250
    }
    this.handleMoreText = this.handleMoreText.bind(this);
  }

  handleMoreText() {
    this.setState({
      expanded: true
    })
  }
  render() {
    let body = this.props.body;
    let photos = this.props.photos;
    let limit = this.state.bodyLimit;
    let imageThumbnails = photos.map((image)=> {
      let imageUrl = image.url;
      if (imageUrl.includes('http')) {
        imageUrl = imageUrl.replace('http', 'https');
        console.log(imageUrl);
      }
      return (
      <ImageThumbnail key={image.id} source={imageUrl} />
      );
    });
    return (
        <div className='review-body'>
          <div className='review-body-text'>
            {(this.state.expanded || body.length < limit)
            ? body
            : body.slice(0, limit) + '...'}
          </div>
          {(this.state.expanded || body.length < limit)
            ? null
            : <span onClick={this.handleMoreText}>Show More...</span>}
          <div className='review-images'>
            {(photos.length !== 0)
            ? <>
                Images:
                {imageThumbnails}
              </>
            : null}
          </div>
        </div>
    );
  }
}
export default ReviewTileBody;