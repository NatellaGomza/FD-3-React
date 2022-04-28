var FilterBlock = React.createClass({

  displayName: 'FilterBlock',

  propTypes: {
    filter: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        code: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired,
      })
    )
  },

  getInitialState: function () {
    return { filteredText: this.props.filter, checked: true, value: '', filter: false, inputValue: '' };
  },

  filteredList(event) {
    if (event.target.getAttribute('data-filtered')) {
      this.setState({ value: event.target.value, });
    }

    if (!!this.state.checked && !event.target.getAttribute('data-filtered') && !this.state.value) {
      var sortedArray = this.props.filter.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ checked: !this.state.checked, filteredText: sortedArray, });
    }

    if (!!this.state.checked && event.target.getAttribute('data-filtered')) {
      var filteredArray = this.props.filter.filter(el => el.text.includes(event.target.value));
      this.setState({ filteredText: filteredArray, value: event.target.value, });
    }

    if (!!this.state.checked && !event.target.getAttribute('data-filtered') && this.state.value) {
      var filteredArray = this.props.filter.filter(el => el.text.includes(this.state.value));
      var sortedArray = filteredArray.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ filteredText: sortedArray, checked: !this.state.checked });
    }

    if (!this.state.checked && event.target.getAttribute('data-filtered')) {
      var filteredArray = this.props.filter.filter(el => el.text.includes(event.target.value));
      var sortedArray = filteredArray.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ filteredText: sortedArray, });
    }

    if (!this.state.checked && this.state.value && !event.target.getAttribute('data-filtered')) {
      var filteredArray = this.props.filter.filter(el => el.text.includes(this.state.value));
      this.setState({ filteredText: filteredArray, checked: !this.state.checked });
    }

    if (!this.state.checked && !event.target.getAttribute('data-filtered') && !this.state.value) {
      this.setState({ filteredText: this.props.filter, checked: !this.state.checked });
    }

  },

  resetFilter() {
    this.setState({ filteredText: this.props.filter, value: '' });

    if (!this.state.checked) {
      this.setState({ checked: !this.state.checked });
    }
  },

  render: function () {

    var filterOptions = React.DOM.div({ className: 'FilterOptions' },
      React.DOM.input({ type: 'checkbox', checked: !this.state.checked, onChange: this.filteredList, }),
      React.DOM.input({ type: 'text', 'data-filtered': 'filter', onChange: this.filteredList, value: this.state.value }),
      React.DOM.input({ type: 'button', value: 'сброс', onClick: this.resetFilter }),
    );

    var filterText = this.state.filteredText.map(el =>
      React.DOM.option({ key: el.code, className: 'option' }, el.text),
    );

    var filterSelect = React.DOM.select({ className: 'option', size: 5 }, filterText);

    return React.DOM.div({ className: 'Filter' }, filterOptions, filterSelect);
  },
});