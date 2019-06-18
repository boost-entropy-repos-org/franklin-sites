import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatLargeNumber } from '../utils';

import '../styles/components/facets.scss';

class Facets extends Component {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  isActive(facetName, facetValue) {
    const { selectedFacets } = this.props;
    const matchingFacet = selectedFacets.filter(
      facet => facet.name === facetName && facet.value === facetValue,
    );
    return matchingFacet && matchingFacet.length > 0;
  }

  handleClick(facetName, facetValue) {
    const { addFacet, removeFacet } = this.props;
    if (this.isActive(facetName, facetValue)) {
      removeFacet(facetName, facetValue);
    } else {
      addFacet(facetName, facetValue);
    }
  }

  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const facetsToShow = data.filter(facet => facet.values && facet.values.length > 0);
    return (
      <div className="facets">
        <ul className="no-bullet">
          {facetsToShow.map(facet => (
            <li key={facet.name}>
              <div className="facet-name">{facet.label}</div>
              <ul className="no-bullet">
                {facet.values.map(value => (
                  <li
                    key={`${facet.name}_${value.value}`}
                    className={this.isActive(facet.name, value.value) ? 'facet-active' : ''}
                  >
                    <button type="button" onClick={() => this.handleClick(facet.name, value.value)}>
                      {`${value.label ? value.label : value.value} (${formatLargeNumber(
                        value.count,
                      )})`}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Facets.propTypes = {
  /**
   * The data to be displayed
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * What happens if a facet is selected
   */
  addFacet: PropTypes.func.isRequired,
  /**
   * What happens if a facet is de-selected
   */
  removeFacet: PropTypes.func.isRequired,
  /**
   * An array of selected facets
   */
  selectedFacets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Facets;