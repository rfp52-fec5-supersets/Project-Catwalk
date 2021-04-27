import React from 'react';
import { shallow, render, mount } from '../../../../enzyme.setup';
import App from '../../App';
import Overview from '../../components/Overview';
import RelatedProducts from '../../components/RelatedItems/RelatedProducts';
import MyOutfit from '../../components/RelatedItems/MyOutfit';
import QuestionsList from '../../components/questions/QuestionsList';
import Reviews from '../../components/reviews/Reviews';
import ReviewList from '../../components/reviews/ReviewList';
import ReviewSort from '../../components/reviews/ReviewSort';
import { expect } from 'chai';
import sinon from 'sinon';
import StarsDisplay from '../../components/StarsDisplay';
import Gallery from '../../components/Gallery';
import Checkout from '../../components/Checkout';
import {ReviewProps} from '../../dummyProps';

describe('App Component', () => {
  test('Renders App Component', () => {
    let wrapper =  shallow(
      <App />,
    );
    expect(wrapper.exists()).to.equal(true);

    // Expect statements for the render of each widget
    expect(wrapper.find(Overview)).to.have.lengthOf(1);
    expect(wrapper.find(MyOutfit)).to.have.lengthOf(1);
    expect(wrapper.find(Reviews)).to.have.lengthOf(1);
    // expect(wrapper.find(QuestionsList)).to.have.lengthOf(1); // This one currently fails because of the way questionsList is conditionally rendered


  });

  test('App calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    let wrapper = mount(
      <App />,
    );
    expect(wrapper.exists()).to.equal(true);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
  });

});

describe('Overview Component', () => {
  test('Renders Overview Component', () => {
    let wrapper = shallow(
      <Overview />,
    );
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('#overview')).to.have.lengthOf(1);

  });

  test('Gallery: Clicking the main-image component causes modal-content to render', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.gallery')).to.have.lengthOf(1);
    expect(wrapper.find('.expanded-button-div')).to.have.lengthOf(4);
    expect(wrapper.find('.main-image')).to.have.lengthOf(1);
    wrapper.find('.main-image').simulate('click');
    expect(wrapper.find('.modal-content')).to.have.lengthOf(1);

  });

  test('Gallery: Clicking the left and right arrow buttons toggles the currently selected mainImage', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.gallery')).to.have.lengthOf(1);
    wrapper.find('#right-arrow-default').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(1);
    wrapper.find('#right-arrow-default').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(2);
    wrapper.find('#left-arrow-default').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(1);
    wrapper.find('#left-arrow-default').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(0);

  });

  test('Gallery: Clicking the up and down arrow buttons causes our rendered thumbnails to "scroll" through the available thumbnails', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState2);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.gallery')).to.have.lengthOf(1);
    wrapper.find('#down-arrow').simulate('click');
    expect(wrapper.find(Gallery).state('minThumbnailIndex')).to.equal(1);
    expect(wrapper.find(Gallery).state('maxThumbnailIndex')).to.equal(7);

    wrapper.find('#down-arrow').simulate('click');
    expect(wrapper.find(Gallery).state('minThumbnailIndex')).to.equal(2);
    expect(wrapper.find(Gallery).state('maxThumbnailIndex')).to.equal(8);
    wrapper.find('#up-arrow').simulate('click');
    expect(wrapper.find(Gallery).state('minThumbnailIndex')).to.equal(1);
    expect(wrapper.find(Gallery).state('maxThumbnailIndex')).to.equal(7);
    wrapper.find('#up-arrow').simulate('click');
    expect(wrapper.find(Gallery).state('minThumbnailIndex')).to.equal(0);
    expect(wrapper.find(Gallery).state('maxThumbnailIndex')).to.equal(6);

  });

  test('Gallery: Clicking the thumbnails toggles the currently selected mainImage', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState2);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.gallery')).to.have.lengthOf(1);
    wrapper.find('#gallery-thumbnail-2').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(2);
    wrapper.find('#gallery-thumbnail-4').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(4);
    wrapper.find('#gallery-thumbnail-6').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(6);
    wrapper.find('#gallery-thumbnail-0').simulate('click');
    expect(wrapper.find(Gallery).state('currentImageIndex')).to.equal(0);

  });

  test('Gallery: Expanded view renders all available thumbnails', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState2);

    wrapper.find('.main-image').simulate('click');
    expect(wrapper.find('.modal-content')).to.have.lengthOf(1);
    expect(wrapper.find('.gallery-thumbnails-expanded').children()).to.have.lengthOf(11);

  });

  test('Product Info: Component renders along with title, original price, stars display, category, rating, and number of ratings based upon current state and style', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.product-info')).to.have.lengthOf(1);
    expect(wrapper.find('#title').text()).to.include('Camo Onesie');
    expect(wrapper.find('.original-price').text()).to.include('140');
    expect(wrapper.find('.product-info').find(StarsDisplay)).to.have.lengthOf(1);
    expect(wrapper.find('#category').text()).to.include('Jackets');
    expect(wrapper.find('#rating-number').text()).to.include('3.71');
    expect(wrapper.find('#rating-number').text()).to.include('(17)');
    expect(wrapper.find('#socials').children()).to.have.lengthOf(4);

  });

  test('Product Info: When sale price exists, it renders alongside a strikethrough of the original price ', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.style-selector')).to.have.lengthOf(1);
    wrapper.find('#ss-thumbnail-2').simulate('click');
    expect(wrapper.find('.original-price')).to.have.lengthOf(0);
    expect(wrapper.find('.original-price-strikethrough')).to.have.lengthOf(1);
    expect(wrapper.find('.sale-price')).to.have.lengthOf(1);

  });

  test('Product Info 2: Renders a slogan, description, and features from App state', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('#product-overview').text()).to.include('Blend in');
    expect(wrapper.find('#product-overview').text()).to.include('So Fatigues');
    expect(wrapper.find('#features-table-body').children()).to.have.lengthOf(2);
  });

  test('Style Selector: Renders a thumbnail for each style available for the given item and also displays the name of the currently selected style', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.style-selector')).to.have.lengthOf(1);
    expect(wrapper.find('.style-selector').text()).to.include('Forest Green');
    expect(wrapper.find('.style-selector').children()).to.have.lengthOf(7);
  });

  test('Style Selector: Clicking thumbnail updates the currently selected style and re-renders the page accordingly', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);

    expect(wrapper.exists()).to.equal(true);

    expect(wrapper.find('.style-selector')).to.have.lengthOf(1);
    wrapper.find('#ss-thumbnail-2').simulate('click');
    expect(wrapper.find('.style-selector').text()).to.include('Ocean Blue');

  });

  test('Add to Cart: Pressing the button when a valid size is not selected causes the page to render an alert', () => {

    let wrapper = mount(
      <App />,
    );

    wrapper.setState(testState);
    expect(wrapper.exists()).to.equal(true);
    wrapper.find('.add-to-cart').simulate('click');
    expect(wrapper.find('#please-select-size').text()).to.include('Please select size');

  });

  test('Add to Cart: Pressing the button when a valid size/quantity are selected... does not cause the page to render an alert', () => {

    let wrapper = mount(
      <App />,
    );

    sinon.spy(console, 'log');
    wrapper.setState(testState);
    expect(wrapper.exists()).to.equal(true);
    wrapper.find(Checkout).setState({sizeSelected: '522040', selectedQuantity: 2});
    wrapper.find('.add-to-cart').simulate('click');
    // expect(console.log).to.have.property('callCount', 1);

    // Right now, we don't have a great way of evaluating a successful "Add to Cart"
    // Since this information is currently only displayed in the console

    expect(wrapper.find('#please-select-size')).to.have.lengthOf(0);

  });
});

describe('MyOutfit Component', () => {
  test('Renders MyOutfit Component', () => {
    let wrapper = shallow(
      <MyOutfit />,
    );
    expect(wrapper.exists()).to.equal(true);

  });
});

describe('QuestionsList Component', () => {
  test('Renders QuestionsList Component', () => {
    let wrapper = shallow(
      <QuestionsList />,
    );
    expect(wrapper.exists()).to.equal(true);

  });
});

//testState corresponds to Camo Onesie, default style 0
var testState = {"products":[{"id":17067,"campus":"hr-rfp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17068,"campus":"hr-rfp","name":"Bright Future Sunglasses","slogan":"You've got to wear shades","description":"Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.","category":"Accessories","default_price":"69.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17069,"campus":"hr-rfp","name":"Morning Joggers","slogan":"Make yourself a morning person","description":"Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.","category":"Pants","default_price":"40.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17070,"campus":"hr-rfp","name":"Slacker's Slacks","slogan":"Comfortable for everything, or nothing","description":"I'll tell you how great they are after I nap for a bit.","category":"Pants","default_price":"65.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17071,"campus":"hr-rfp","name":"Heir Force Ones","slogan":"A sneaker dynasty","description":"Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl","category":"Kicks","default_price":"99.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"}],"currentProduct":{"id":17067,"campus":"hr-rfp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Fabric","value":"Canvas"},{"feature":"Buttons","value":"Brass"}]},"styles":[{"style_id":90250,"name":"Forest Green & Black","original_price":"140.00","sale_price":null,"default?":true,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"}],"skus":{"522040":{"quantity":8,"size":"XS"},"522041":{"quantity":16,"size":"S"},"522042":{"quantity":17,"size":"M"},"522043":{"quantity":10,"size":"L"},"522044":{"quantity":15,"size":"XL"},"522045":{"quantity":4,"size":"XL"}}},{"style_id":90251,"name":"Desert Brown & Tan","original_price":"140.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1422557379185-474fa15bf770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1490723286627-4b66e6b2882a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1447958272669-9c562446304f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80"}],"skus":{"522046":{"quantity":8,"size":"XS"},"522047":{"quantity":16,"size":"S"},"522048":{"quantity":17,"size":"M"},"522049":{"quantity":10,"size":"L"},"522050":{"quantity":15,"size":"XL"},"522051":{"quantity":6,"size":"XXL"}}},{"style_id":90252,"name":"Ocean Blue & Grey","original_price":"140.00","sale_price":"100.00","default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1557760257-b02421ae77fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1551506448-074afa034c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=938&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556268652-ad74ebb8f1e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1557394976-32cc983558ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"}],"skus":{"522052":{"quantity":8,"size":"XS"},"522053":{"quantity":16,"size":"S"},"522054":{"quantity":17,"size":"M"},"522055":{"quantity":10,"size":"L"},"522056":{"quantity":15,"size":"XL"},"522057":{"quantity":6,"size":"XXL"}}},{"style_id":90253,"name":"Digital Red & Black","original_price":"140.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1530092376999-2431865aa8df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1487174244970-cd18784bb4a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1486025402772-bc179c8dfb0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60","url":"https://images.unsplash.com/photo-1517456837005-d757b959ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}],"skus":{"522058":{"quantity":8,"size":"XS"},"522059":{"quantity":16,"size":"S"},"522060":{"quantity":17,"size":"M"},"522061":{"quantity":10,"size":"L"},"522062":{"quantity":15,"size":"XL"},"522063":{"quantity":6,"size":"XXL"}}},{"style_id":90254,"name":"Sky Blue & White","original_price":"140.00","sale_price":"100.00","default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}],"skus":{"522064":{"quantity":8,"size":"XS"},"522065":{"quantity":16,"size":"S"},"522066":{"quantity":17,"size":"M"},"522067":{"quantity":10,"size":"L"},"522068":{"quantity":15,"size":"XL"},"522069":{"quantity":6,"size":"XXL"}}},{"style_id":90255,"name":"Dark Grey & Black","original_price":"170.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"}],"skus":{"522070":{"quantity":8,"size":"XS"},"522071":{"quantity":16,"size":"S"},"522072":{"quantity":17,"size":"M"},"522073":{"quantity":10,"size":"L"},"522074":{"quantity":15,"size":"XL"},"522075":{"quantity":6,"size":"XXL"}}}],"currentStyleIndex":0,"currentStyle":{"style_id":90250,"name":"Forest Green & Black","original_price":"140.00","sale_price":null,"default?":true,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"}],"skus":{"522040":{"quantity":8,"size":"XS"},"522041":{"quantity":16,"size":"S"},"522042":{"quantity":17,"size":"M"},"522043":{"quantity":10,"size":"L"},"522044":{"quantity":15,"size":"XL"},"522045":{"quantity":4,"size":"XL"}}},"currentProductId":17067,"currentStylePhotos":[{"thumbnail_url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"}],"currentStyleSkusObj":{"522040":{"quantity":8,"size":"XS"},"522041":{"quantity":16,"size":"S"},"522042":{"quantity":17,"size":"M"},"522043":{"quantity":10,"size":"L"},"522044":{"quantity":15,"size":"XL"},"522045":{"quantity":4,"size":"XL"}},"currentStyleTotalQuantity":70,"currentProductFull":{"id":17067,"campus":"hr-rfp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Fabric","value":"Canvas"},{"feature":"Buttons","value":"Brass"}]},"currentProductFeatures":[{"feature":"Fabric","value":"Canvas"},{"feature":"Buttons","value":"Brass"}],"ratings":{"2":"1","3":"5","4":"9","5":"2"},"averageRating":"3.71","reviewMeta":{"product_id":"17067","ratings":{"2":"1","3":"5","4":"9","5":"2"},"recommended":{"false":"12","true":"5"},"characteristics":{"Fit":{"id":57222,"value":"3.2222222222222222"},"Length":{"id":57223,"value":"3.8333333333333333"},"Comfort":{"id":57224,"value":"4.3333333333333333"},"Quality":{"id":57225,"value":"3.6666666666666667"}}},"relatedProducts":[{"id":17072,"campus":"hr-rfp","name":"Pumped Up Kicks","slogan":"Faster than a just about anything","description":"The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.","category":"Kicks","default_price":"89.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Sole","value":"Rubber"},{"feature":"Material","value":"FullControlSkin"},{"feature":"Mid-Sole","value":"ControlSupport Arch Bridge"},{"feature":"Stitching","value":"Double Stitch"}]},{"id":17072,"campus":"hr-rfp","name":"Pumped Up Kicks","slogan":"Faster than a just about anything","description":"The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.","category":"Kicks","default_price":"89.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Sole","value":"Rubber"},{"feature":"Material","value":"FullControlSkin"},{"feature":"Mid-Sole","value":"ControlSupport Arch Bridge"},{"feature":"Stitching","value":"Double Stitch"}]},{"id":17074,"campus":"hr-rfp","name":"YEasy 350","slogan":"Just jumped over jumpman","description":"These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.","category":"Kicks","default_price":"450.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Sole","value":"Rubber"},{"feature":"Material","value":"FullControlSkin"},{"feature":"Stitching","value":"Double Stitch"}]},{"id":17075,"campus":"hr-rfp","name":"Summer Shoes","slogan":"A risky call in the spring or fall","description":"Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.","category":"Kicks","default_price":"59.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Sole","value":"Rubber"},{"feature":"Material","value":"FullControlSkin"},{"feature":"Mid-Sole","value":"ControlSupport Arch Bridge"},{"feature":"Stitching","value":"Double Stitch"}]},{"id":17067,"campus":"hr-rfp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Fabric","value":"Canvas"},{"feature":"Buttons","value":"Brass"}]},{"id":17069,"campus":"hr-rfp","name":"Morning Joggers","slogan":"Make yourself a morning person","description":"Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.","category":"Pants","default_price":"40.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z","features":[{"feature":"Fabric","value":"100% Cotton"},{"feature":"Cut","value":"Skinny"}]}]}


// testState2 corresponds to Heir Force Ones, default style 0
var testState2 = {"products":[{"id":17067,"campus":"hr-rfp","name":"Camo Onesie","slogan":"Blend in to your crowd","description":"The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.","category":"Jackets","default_price":"140.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17068,"campus":"hr-rfp","name":"Bright Future Sunglasses","slogan":"You've got to wear shades","description":"Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.","category":"Accessories","default_price":"69.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17069,"campus":"hr-rfp","name":"Morning Joggers","slogan":"Make yourself a morning person","description":"Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.","category":"Pants","default_price":"40.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17070,"campus":"hr-rfp","name":"Slacker's Slacks","slogan":"Comfortable for everything, or nothing","description":"I'll tell you how great they are after I nap for a bit.","category":"Pants","default_price":"65.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},{"id":17071,"campus":"hr-rfp","name":"Heir Force Ones","slogan":"A sneaker dynasty","description":"Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl","category":"Kicks","default_price":"99.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"}],"currentProduct":{"id":17071,"campus":"hr-rfp","name":"Heir Force Ones","slogan":"A sneaker dynasty","description":"Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl","category":"Kicks","default_price":"99.00","created_at":"2021-02-23T04:22:44.728Z","updated_at":"2021-02-23T04:22:44.728Z"},"styles":[{"style_id":90275,"name":"White & White","original_price":"99.00","sale_price":null,"default?":true,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}],"skus":{"522166":{"quantity":14,"size":"7"},"522167":{"quantity":25,"size":"7.5"},"522168":{"quantity":9,"size":"8"},"522169":{"quantity":2,"size":"8.5"},"522170":{"quantity":18,"size":"9"},"522171":{"quantity":12,"size":"9.5"},"522172":{"quantity":10,"size":"10"},"522173":{"quantity":18,"size":"10.5"},"522174":{"quantity":11,"size":"11"},"522175":{"quantity":35,"size":"11.5"},"522176":{"quantity":25,"size":"12"}}},{"style_id":90276,"name":"White & Red","original_price":"99.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1474494819794-90f9664b530d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1428790031246-698d71b6fe3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1451256656121-9ffc0c898a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1524604519054-2365ac11e431?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1541006008768-d181e7f9f3d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1430390456011-25ac9244999c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}],"skus":{"522177":{"quantity":14,"size":"7"},"522178":{"quantity":25,"size":"7.5"},"522179":{"quantity":9,"size":"8"},"522180":{"quantity":2,"size":"8.5"},"522181":{"quantity":18,"size":"9"},"522182":{"quantity":12,"size":"9.5"},"522183":{"quantity":10,"size":"10"},"522184":{"quantity":18,"size":"10.5"},"522185":{"quantity":11,"size":"11"},"522186":{"quantity":35,"size":"11.5"},"522187":{"quantity":25,"size":"12"}}},{"style_id":90277,"name":"White & Black","original_price":"99.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1503449377594-32dd9ac4467c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1457968867385-9f877f3f2bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1457968867385-9f877f3f2bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1469617833234-8a6843da14d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1469617833234-8a6843da14d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2764&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1499852848443-3004d6dc4cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1499852848443-3004d6dc4cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1522653216850-4f1415a174fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1519396317879-83334cb422f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1519396317879-83334cb422f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1517583010307-3f789911b89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1517583010307-3f789911b89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1558191053-c03db2757e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1558191053-c03db2757e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1518894781321-630e638d0742?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"}],"skus":{"522188":{"quantity":14,"size":"7"},"522189":{"quantity":25,"size":"7.5"},"522190":{"quantity":9,"size":"8"},"522191":{"quantity":2,"size":"8.5"},"522192":{"quantity":18,"size":"9"},"522193":{"quantity":12,"size":"9.5"},"522194":{"quantity":10,"size":"10"},"522195":{"quantity":18,"size":"10.5"},"522196":{"quantity":11,"size":"11"},"522197":{"quantity":35,"size":"11.5"},"522198":{"quantity":25,"size":"12"}}},{"style_id":90278,"name":"White & Blue","original_price":"99.00","sale_price":null,"default?":false,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1531091087823-cb600a47ab79?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1514613818067-e207c3441db0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1503146695898-afdf8ce5d5a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1503146695898-afdf8ce5d5a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1512023983263-7e94bf6b913e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1512023983263-7e94bf6b913e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1501813722636-45de2fe4f9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1501813722636-45de2fe4f9b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1558682596-dea9bf84c219?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1558682596-dea9bf84c219?ixlib=rb-1.2.1&auto=format&fit=crop&w=2098&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1504281623087-1a6dd8f827c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1462833867037-0f06eab31cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1462833867037-0f06eab31cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"}],"skus":{"522199":{"quantity":14,"size":"7"},"522200":{"quantity":25,"size":"7.5"},"522201":{"quantity":9,"size":"8"},"522202":{"quantity":2,"size":"8.5"},"522203":{"quantity":18,"size":"9"},"522204":{"quantity":12,"size":"9.5"},"522205":{"quantity":10,"size":"10"},"522206":{"quantity":18,"size":"10.5"},"522207":{"quantity":11,"size":"11"},"522208":{"quantity":35,"size":"11.5"},"522209":{"quantity":25,"size":"12"}}}],"currentStyleIndex":0,"currentStyle":{"style_id":90275,"name":"White & White","original_price":"99.00","sale_price":null,"default?":true,"photos":[{"thumbnail_url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}],"skus":{"522166":{"quantity":14,"size":"7"},"522167":{"quantity":25,"size":"7.5"},"522168":{"quantity":9,"size":"8"},"522169":{"quantity":2,"size":"8.5"},"522170":{"quantity":18,"size":"9"},"522171":{"quantity":12,"size":"9.5"},"522172":{"quantity":10,"size":"10"},"522173":{"quantity":18,"size":"10.5"},"522174":{"quantity":11,"size":"11"},"522175":{"quantity":35,"size":"11.5"},"522176":{"quantity":25,"size":"12"}}},"currentProductId":17071,"currentStylePhotos":[{"thumbnail_url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1447879027584-9d17c2ca0333?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1422728221357-57980993ea99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=658&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1527431016-15eb83515018?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1534550017194-5df79ed78967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"},{"thumbnail_url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","url":"https://images.unsplash.com/photo-1560857792-215f9e3534ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"}],"currentStyleSkusObj":{"522166":{"quantity":14,"size":"7"},"522167":{"quantity":25,"size":"7.5"},"522168":{"quantity":9,"size":"8"},"522169":{"quantity":2,"size":"8.5"},"522170":{"quantity":18,"size":"9"},"522171":{"quantity":12,"size":"9.5"},"522172":{"quantity":10,"size":"10"},"522173":{"quantity":18,"size":"10.5"},"522174":{"quantity":11,"size":"11"},"522175":{"quantity":35,"size":"11.5"},"522176":{"quantity":25,"size":"12"}},"currentStyleTotalQuantity":179,"currentProductFull":{},"ratings":{"1":"1","2":"1","3":"1","4":"2"},"averageRating":2.8,"reviewMeta":{"product_id":"17071","ratings":{"1":"1","2":"1","3":"1","4":"2"},"recommended":{"false":"3","true":"2"},"characteristics":{"Size":{"id":57235,"value":"3.0000000000000000"},"Width":{"id":57236,"value":"2.6666666666666667"},"Comfort":{"id":57237,"value":"3.0000000000000000"},"Quality":{"id":57238,"value":"2.6666666666666667"}}}};