import React from 'react';
import { shallow, render, mount } from '../../../../enzyme.setup';
import App from '../../App';
import Reviews from '../../components/reviews/Reviews';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewTile from '../../components/reviews/ReviewTile';
import ReviewSort from '../../components/reviews/ReviewSort';
// import ReviewBreakdown from '../../components/reviews/ReviewBreakdown';
import RatingsBreakdown from '../../components/reviews/ReviewRatings';
import ProductBreakdown from '../../components/reviews/ReviewProduct';
import ReviewTileBody from '../../components/reviews/ReviewTileBody';
import AddReviewForm from '../../components/reviews/AddReviewForm';
import ImageThumbnail from '../../components/reviews/ImageThumbnail';
import { expect } from 'chai';
import sinon from 'sinon';
import StarsDisplay from '../../components/StarsDisplay';
import {ReviewProps, ReviewState, ReviewTileProps, ReviewRatingsProps, ReviewProductProps, ReviewAddFormProps} from '../../dummyProps';


describe('Reviews Component renders', () => {
  test('Renders Reviews Component', () => {
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    wrapper.setState(ReviewState);
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('#reviews')).to.have.lengthOf(1);
    wrapper.unmount();
  });
});
describe('Reviews List tests', () => {
  // 'Review-List: should not exist when no reviews, should exist when reviews' fails integration, probably due to conditional rendering
  test('Review-List: should render same number of reviewTiles as its props.reviews', () => {
    //  integration test is failing
    // when mounting App, reviews-list and reviews-more doesn't load
    // maybe because review-tile has multiple same id?
    // may have to render or mount, not just do shallow copy.
    // Finally figured it out, need to set real state...
    let props = {reviews: [{review_id: 1},{review_id: 2},{review_id: 3}]};
    let wrapper = shallow(<ReviewList {...props}/>);
    expect(wrapper.find(ReviewTile)).to.have.lengthOf(3);
  });
  test('Review-List: should render reviewList only if reviews are available', () => {
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    expect(wrapper.find(ReviewList)).to.have.lengthOf(0);
    wrapper.setState(ReviewState);
    expect(wrapper.find(ReviewList)).to.have.lengthOf(1);
    wrapper.unmount();
  })
});

describe('More Reviews Button tests', () => {
  test('Review-Button increase currentCount by two', ()=>{
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    wrapper.setState(ReviewState);
    expect(wrapper.state('currentCount')).to.equal(2);
    wrapper.find('#reviews-more').simulate('click');
    expect(wrapper.state('currentCount')).to.equal(4);
    wrapper.unmount();
  });
});

describe('Reviews Tile tests', () => {
  test('Review-Tile: Should render up to currentCount or up to reviews.length', ()=>{
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    wrapper.setState(ReviewState);
    expect(wrapper.find(ReviewTile)).to.have.lengthOf(2);
    wrapper.find('#reviews-more').simulate('click');
    let minArray = [wrapper.state('allReviews').length, wrapper.state('currentCount')];
    let minNum = Math.min(...minArray);
    expect(wrapper.find(ReviewTile)).to.have.lengthOf(minNum);
    wrapper.unmount();
  });
  test('Review-Tile: Should contain expected items', ()=>{
    let wrapper = mount(<ReviewTile {...ReviewTileProps} />);
    expect(wrapper.find(StarsDisplay)).to.have.lengthOf(1);
    expect(wrapper.find('.review-username')).to.have.lengthOf(1);
    expect(wrapper.find('.review-date')).to.have.lengthOf(1);
    expect(wrapper.find('.review-summary')).to.have.lengthOf(1);
    expect(wrapper.find('.review-body-text')).to.have.lengthOf(1);
    expect(wrapper.find('.review-images')).to.have.lengthOf(1);
    expect(wrapper.find('.review-helpfulness')).to.have.lengthOf(1);
    if (ReviewTileProps.review.recommend) {
      expect(wrapper.find('.reviews-checkmark')).to.have.lengthOf(1);
    }
    if (ReviewTileProps.review.response) {
      expect(wrapper.find('.review-response')).to.have.lengthOf(1);
    }
    wrapper.unmount();
  });
  test('Review-Tile: Clicking on helpfulness and report', ()=>{
    // simulate click on helpfulness
    // simulate click on report
    let spyHelpful = sinon.spy(ReviewTile.prototype, 'handleHelpful');
    let spyReport = sinon.spy(ReviewTile.prototype, 'handleReport');
    let wrapper = mount(<ReviewTile {...ReviewTileProps} />);
    expect(wrapper.find('.review-helpfulness > p > span')).to.have.lengthOf(2);
    wrapper.find('.review-helpfulness > p > span').first().simulate('click');
    wrapper.find('.review-helpfulness > p > span').last().simulate('click');
    expect(spyHelpful.called);
    expect(spyReport.called);
    wrapper.unmount();
  })
});

describe('ImageThumbnail Modal Window', () => {
  test('ImageThumbnail should toggle modal window by clicking on thumbnail', ()=>{
    let imageProps = {source: "https://i.imgur.com/R2UqMBy.jpg"};
    let wrapper = mount(<ImageThumbnail {...imageProps}/>);
    expect(wrapper.find('.modal-overlay')).to.have.lengthOf(0);
    wrapper.find('.reviews-thumbnail').first().simulate('click');
    expect(wrapper.find('.modal-overlay')).to.have.lengthOf(1);
    wrapper.unmount();
  });
});

describe('Reviews Sort tests', () => {
  test('Review sort changes reviews state', ()=>{
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    wrapper.setState(ReviewState);
    expect(wrapper.state('sortType')).to.equal('relevant');
    wrapper.find('.reviews-sort-input').simulate('change', {target: {value: 'newest'}});
    expect(wrapper.state('sortType')).to.equal('newest');
    wrapper.unmount();
  });
});

describe('Ratings Breakdown tests', () => {
  test('Ratings-Breakdown: Should contain expected items', ()=>{
    let wrapper = mount(<RatingsBreakdown {...ReviewRatingsProps}/>);
    expect(wrapper.find(StarsDisplay)).to.have.lengthOf(1);
    expect(wrapper.find('.total-reviews-count')).to.have.lengthOf(1);
    expect(wrapper.find('.ratings-breakdown')).to.have.lengthOf(1);
    expect(wrapper.find('.ratings-recommendation')).to.have.lengthOf(1);
    expect(wrapper.find('.ratings-and-filter')).to.have.lengthOf(5);
    wrapper.unmount();
  });
  test('Ratings: Clicking on filter should update filter in Reviews', ()=>{
    let wrapper = mount(<Reviews {...ReviewProps}/>);
    wrapper.setState(ReviewState);
    expect(wrapper.find('.ratings-breakdown>div>span')).to.have.lengthOf(5);
    expect(wrapper.state().filter['1']).to.equal(false);
    wrapper.find('.ratings-breakdown>div>span').first().simulate('click');
    expect(wrapper.state().filter['1']).to.equal(true);
    expect(wrapper.find('.ratings-filter-view>button')).to.have.lengthOf(1);
    wrapper.find('.ratings-filter-view>button').simulate('click');
    expect(wrapper.state().filter['1']).to.equal(false);
  })
});

describe('Product Breakdown tests', () => {
  test('Product-Breakdown: Should contain expected items', ()=>{
    let wrapper = mount(<ProductBreakdown {...ReviewProductProps}/>);
    let charaNum = Object.keys(ReviewProductProps.characteristics).length;
    expect(wrapper.find('.product-characteristic')).to.have.lengthOf(charaNum);
    expect(wrapper.find('.characteristic-pointer')).to.have.lengthOf(charaNum);
    expect(wrapper.find('.characteristic-bar')).to.have.lengthOf(charaNum);
    expect(wrapper.find('.characteristic-message')).to.have.lengthOf(charaNum);
    wrapper.unmount();
  });
});

describe('Add Review tests', () => {
  test('Add-Review: Form should contain expected items', ()=>{
    // don't forget to check for photos
    let wrapper = mount(<AddReviewForm {...ReviewAddFormProps}/>);
    expect(wrapper.find('.add-star-rating')).to.have.lengthOf(1);
    expect(wrapper.find('.recommended-form')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-charas')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-summary')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-body')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-photos')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-username')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-email')).to.have.lengthOf(1);
    expect(wrapper.find('.add-review-submit')).to.have.lengthOf(1);
    wrapper.unmount();
  });
  test('Add-Review: Form should handle changes and submissions', ()=>{
    let starSpy = sinon.spy(AddReviewForm.prototype, 'handleStar');
    let recSpy = sinon.spy(AddReviewForm.prototype, 'handleRecommended');
    let charaSpy = sinon.spy(AddReviewForm.prototype, 'handleChara');
    let textSpy = sinon.spy(AddReviewForm.prototype, 'handleTextChange');
    let photoSpy = sinon.spy(AddReviewForm.prototype, 'handlePhotos');
    let submitSpy = sinon.spy(AddReviewForm.prototype, 'handleSubmit');
    let wrapper = mount(<AddReviewForm {...ReviewAddFormProps}/>);
    wrapper.unmount();
  });
});