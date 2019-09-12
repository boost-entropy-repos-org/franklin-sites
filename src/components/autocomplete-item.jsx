import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutocompleteItem extends Component {
  componentDidMount() {
    this.ensureVisible();
  }

  componentDidUpdate() {
    this.ensureVisible();
  }

  ensureVisible() {
    const { active } = this.props;
    if (active) {
      this.node.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }

  render() {
    const {
      item, active, substringToHighlight, handleOnClick,
    } = this.props;
    return (
      <li
        ref={(node) => {
          this.node = node;
        }}
      >
        <button
          type="button"
          onClick={e => handleOnClick(item, e)}
          className={active ? 'hover' : ''}
        >
          {substringToHighlight
            ? AutocompleteItem.highlightSubstring(item.pathLabel, substringToHighlight)
            : item.itemLabel}
        </button>
      </li>
    );
  }
}

AutocompleteItem.propTypes = {
  item: PropTypes.shape({
    pathLabel: PropTypes.string.isRequired,
    itemLabel: PropTypes.string.isRequired,
    items: PropTypes.array,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  substringToHighlight: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default AutocompleteItem;
