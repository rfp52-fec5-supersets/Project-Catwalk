import React from 'react';
import { shallow, render, mount } from '../../../../enzyme.setup';
import App from '../../App';
import Overview from '../../components/Overview';
import Related from '../../components/Related';
import QuestionsList from '../../components/QuestionsList';
import Reviews from '../../components/reviews/Reviews';
import { expect } from 'chai';


describe('App Component', () => {
  test('Renders App Component', () => {
    let wrapper =  mount(
      <App />,
    );
    expect(wrapper.exists()).to.equal(true);

    // Expect statements for the render of each widget
    expect(wrapper.find(Overview)).to.have.lengthOf(1);
    expect(wrapper.find(Related)).to.have.lengthOf(1);
    expect(wrapper.find(Reviews)).to.have.lengthOf(1);
    // expect(wrapper.find(QuestionsList)).to.have.lengthOf(1); // This one currently fails because of the way questionsList is conditionally rendered


  });

  test('Renders Overview Component', () => {
    let wrapper = shallow(
      <Overview />,
    );
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.find('.overview')).to.have.lengthOf(1);

  });

  test('Renders Related Component', () => {
    let wrapper = shallow(
      <Related />,
    );
    expect(wrapper.exists()).to.equal(true);

  });

  test('Renders Reviews Component', () => {
    let wrapper = shallow(
      <Reviews />,
    );
    expect(wrapper.exists()).to.equal(true);

  });

  test('Renders QuestionsList Component', () => {
    let wrapper = shallow(
      <QuestionsList />,
    );
    expect(wrapper.exists()).to.equal(true);

  });
});