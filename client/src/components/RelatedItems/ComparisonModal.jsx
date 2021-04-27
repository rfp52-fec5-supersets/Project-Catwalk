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
      <div className="modal-overlay">

        <button type="button" className="close-button" onClick={this.props.onClose}> X</button>

        <div className="comparison-table">
          <div className="comparison-product">{currentProduct.name}</div>
          <div className="comparison-title"> FEATURES </div>
          <div className="comparison-product">{relatedProduct.name}</div>

          <div className="left-column">
            <div>{featuresArray.map(feature => {
              if (currentValues[feature] === undefined) {
                return <div>{<br/>}</div>
              } else {
                return <div>{currentValues[feature]}</div>
              }
            })}</div>
          </div>

          <div className="middle-column">{featuresArray.map(feature => { return <div>{feature}</div> })}</div>

          <div className="right-column">
            <div>{featuresArray.map(feature => {
              if (relatedValues[feature] === undefined) {
                return <div>{<br/>}</div>
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