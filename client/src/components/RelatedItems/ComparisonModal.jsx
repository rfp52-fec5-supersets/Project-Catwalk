import React from 'react';

class ComparisonModal extends React.Component {

  render() {
    if (!this.props.renderModal) {
      return null;
    }

    let currentFeatures = this.props.currentFeatures;
    let relatedFeatures = this.props.relatedProduct.features;
    let currentProduct = this.props.currentProduct;
    let relatedProduct = this.props.relatedProduct;


    //CURRENT PRODUCT'S FEATURE-VALUE OBJS
    let currentValues = {};
    for (var i = 0; i < currentFeatures.length; i++) {
      currentValues[currentFeatures[i].feature] = currentFeatures[i].value;
    }

    //RELATED (COMPARISON) PRODUCT'S FEATURE-VALUE OBJS
    let relatedValues = {};
    for (var i = 0; i < relatedFeatures.length; i++) {
      relatedValues[relatedFeatures[i].feature] = relatedFeatures[i].value;
    }

    let features = new Set;
    let allFeatures = currentFeatures.concat(relatedFeatures);
    for (var i = 0; i < allFeatures.length; i++) {
      features.add(allFeatures[i].feature)
    }
    let featuresArray = Array.from(features);

    console.log('currentValues', currentValues);
    console.log('currentValues', relatedValues)
    console.log('featuresArray', featuresArray)

    return (
      <div className='modal-overlay'>

        <button type='button' className='close-button' onClick={this.props.onClose}> X</button>

        <div className='comparison-table'>
          COMPARING
          <div className="left-column">
            <h1>{currentProduct.name}</h1>
            <div>{featuresArray.map(feature => {
              console.log('current value feature', currentValues);
              if (currentValues[feature] === undefined) {
                return <div>{<br />}</div>
              } else {
                return <div>{currentValues[feature]}</div>
              }
            })}</div>
          </div>

          <div className="middle-column">{featuresArray.map(feature => { return <div>{feature}</div> })}</div>

          <div className="right-column">
            <h1>{relatedProduct.name}</h1>
            <div>{featuresArray.map(feature => {
              if (relatedValues[feature] === undefined) {
                return <div>{<br />}</div>
              } else {
                return <div>{relatedValues[feature]}</div>
              }
            })}</div>
          </div>
        </div>

      </div>

    )
  }
}

export default ComparisonModal;