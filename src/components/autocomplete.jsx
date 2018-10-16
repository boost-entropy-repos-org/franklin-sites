import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../dist/components/dropdown.css';
import '../../dist/components/autocomplete.css';
import AutocompleteItem from './autocomplete-item';
import { getLastIndexOfSubstringIgnoreCase } from '../utils';

class Autocomplete extends Component {
  static filterOptions(items, query) {
    return items.filter(item => getLastIndexOfSubstringIgnoreCase(item.label, query) >= 0);
  }

  constructor(props) {
    super(props);
    const { showDropdown } = props; 
    this.state = {
      textInputValue: '',
      hoverIndex: -1,
      showDropdown,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.resetDropdown({
      textInputValue: value,
      showDropdown: !!value.trim(),
    });
  }

  isValidChoice(string) {
    const { data } = this.props;
    return data.some(x => x.label.toLowerCase() === string.toLowerCase().trim());
  }

  buildOptions(data, substringToHighlight, hoverIndex) {
    return (
      <ul>
        {data.map((item, index) => (
          <AutocompleteItem
            item={item}
            active={hoverIndex === index}
            substringToHighlight={substringToHighlight}
            key={item.label}
            handleOnClick={this.handleNodeClick}
          />
        ))}
      </ul>
    );
  }

  handleNodeClick(item) {
    this.resetDropdown({
      textInputValue: item.label,
      showDropdown: false,
    });
    const { onSelect } = this.props;
    onSelect(item);
  }

  resetDropdown({ textInputValue, showDropdown }) {
    this.setState({
      hoverIndex: -1,
      textInputValue,
      showDropdown,
    });
    const { showDropwdownUpdated } = this.props;
    showDropwdownUpdated(showDropdown);
  }

  handleOnKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      let { hoverIndex } = this.state;
      if (hoverIndex <= 0) {
        hoverIndex = -1;
      } else {
        hoverIndex -= 1;
      }
      this.setState({ hoverIndex });
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      let { hoverIndex } = this.state;
      const { textInputValue } = this.state;
      const { data } = this.props;
      const options = Autocomplete.filterOptions(data, textInputValue);
      hoverIndex = Math.min(options.length - 1, hoverIndex + 1);
      this.setState({ hoverIndex });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      hoverIndex,
      textInputValue,
      showDropdown,
    } = this.state;
    const {
      onSelect,
      data,
    } = this.props;
    let selectedValue = textInputValue;
    if (showDropdown && hoverIndex >= 0) {
      const options = Autocomplete.filterOptions(data, textInputValue);
      selectedValue = options[hoverIndex];
      this.resetDropdown({
        textInputValue: selectedValue.label,
        showDropdown: false,
      });
    }
    onSelect(selectedValue);
  }

  render() {
    const {
      textInputValue,
      showDropdown,
      hoverIndex,
    } = this.state;
    const { data } = this.props;
    return (
      <div className="dropdown-container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={textInputValue} onChange={this.handleChange} onKeyDown={this.handleOnKeyDown} />
        </form>
        <div className={showDropdown ? 'autocomplete-menu dropdown-menu-open' : 'autocomplete-menu'}>
          {this.buildOptions(
            Autocomplete.filterOptions(data, textInputValue),
            textInputValue,
            hoverIndex,
          )}
        </div>
      </div>
    );
  }
}

Autocomplete.defaultProps = {
  showDropwdownUpdated: () => {},
};

Autocomplete.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onSelect: PropTypes.func.isRequired,
  showDropwdownUpdated: PropTypes.func,
};

export default Autocomplete;
