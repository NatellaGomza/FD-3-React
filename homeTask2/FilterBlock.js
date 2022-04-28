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
    return { filteredText: this.props.filter, checked: true, value: '', filter:false, inputValue:'' };
  },

  filteredList(event) {
    if (event.target.getAttribute('data-filtered')) {
      this.setState({ value: event.target.value,});
    }

    console.log(this.state.checked);

    if ( !!this.state.checked && !event.target.getAttribute('data-filtered') && !this.state.value) {
      console.log(1);
      var sortedArray = this.props.filter.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ checked: !this.state.checked, filteredText: sortedArray, });
    }

    if ( !!this.state.checked && event.target.getAttribute('data-filtered')) {
      console.log(2);
      var filteredArray = this.props.filter.filter(el => el.text.includes(event.target.value));
      this.setState({ filteredText: filteredArray,  value: event.target.value,});
    }

    if ( !!this.state.checked && !event.target.getAttribute('data-filtered') && this.state.value) {
      console.log(3);
      var filteredArray = this.props.filter.filter(el => el.text.includes(this.state.value));
      var sortedArray = filteredArray.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ filteredText: sortedArray, checked: !this.state.checked});
    }

    if ( !this.state.checked && event.target.getAttribute('data-filtered')) {
      console.log(4);
      var filteredArray = this.props.filter.filter(el => el.text.includes(event.target.value));
      var sortedArray = filteredArray.concat().sort((a, b) => a.text > b.text ? 1 : -1);
      this.setState({ filteredText: sortedArray,});
    }

    if ( !this.state.checked && this.state.value && !event.target.getAttribute('data-filtered')) {
      console.log(5);
      var filteredArray = this.props.filter.filter(el => el.text.includes(this.state.value));
      this.setState({ filteredText: filteredArray, checked: !this.state.checked});
    }

    if ( !this.state.checked && !event.target.getAttribute('data-filtered') && !this.state.value) {
      console.log(6);
      this.setState({ filteredText: this.props.filter, checked: !this.state.checked});
    }

  },

  // filteredListChanged (event) {
  //   var value = event.target.value;
  //   this.setState({ value: value })
  //   var filteredArray = this.state.filteredText.filter(el => el.text.includes(value));
  //   !value ? this.setState( {filteredText: this.props.filter}) : this.setState( {filteredText: filteredArray});
  // },

  // filterByAlphabet () {
  //   this.setState({checked:!this.state.checked});
  //   var filteredByAlphabetArray = this.state.filteredText.concat().sort((a, b) => a.text > b.text ? 1 : -1);
  //   this.state.checked ? this.setState( {filteredText: this.props.filter}) : this.setState( {filteredText: filteredByAlphabetArray});
  // },

  resetFilter() {
    this.setState({ filteredText: this.props.filter, value: '', checked: false })
  },

  render: function () {

    var filterOptions = React.DOM.div({ className: 'FilterOptions' }, React.DOM.input({ type: 'checkbox', 'data-checked': !this.state.checked, onChange: this.filteredList, }),
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