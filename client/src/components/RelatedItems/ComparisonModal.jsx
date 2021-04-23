import React from 'react';

class ComparisonModal extends React.Component {

  render() {
    if (!this.props.renderModal) {
      return null;
    }

    let currentFeatures = this.props.currentFeatures;
    let relatedFeatures = this.props.relatedProduct.features;


    //CURRENT PRODUCT'S FEATURE-VALUE OBJS
    let currentValues = [];
    for (var i = 0; i < currentFeatures.length; i++) {
      currentValues.push(currentFeatures[i]);
    }

    //RELATED (COMPARISON) PRODUCT'S FEATURE-VALUE OBJS
    let relatedValues = [];
    for (var i = 0; i < relatedFeatures.length; i++) {
      relatedValues.push(relatedFeatures[i]);
    }

    let features = new Set;
    let allFeatures = currentFeatures.concat(relatedFeatures);
    for (var i = 0; i < allFeatures.length; i++) {
      features.add(allFeatures[i].feature)
    }

    // console.log('currentProductValues', currentValues);
    // console.log('relatedProductValues', relatedValues)
    // console.log('features', features)

    return (
      <div className='modal-overlay'>
        <button type='button' className='close-button' onClick={this.props.onClose}>
          X
        </button>
        <div className='comparison-table'>
          COMPARING
          <div>{this.props.currentProduct.name}</div>
          <div>{this.props.relatedProduct.name}</div>

        </div>
      </div>
    )
  }
}

export default ComparisonModal;