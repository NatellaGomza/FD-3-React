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

  getInitialState: function() {
    return { filteredText: this.props.filter, checked: false, filter: false, value:''};
  },

  filteredListChanged (event) {
    var value = event.target.value;
    this.setState({ value: value })
    var filteredArray = this.state.filteredText.filter(el => el.text.includes(value));
    !value ? this.setState( {filteredText: this.props.filter}) : this.setState( {filteredText: filteredArray});
  },

  filterByAlphabet () {
    this.setState({checked:!this.state.checked});
    var filteredByAlphabetArray = this.state.filteredText.concat().sort((a, b) => a.text > b.text ? 1 : -1);
    this.state.checked ? this.setState( {filteredText: this.props.filter}) : this.setState( {filteredText: filteredByAlphabetArray});
  },

  resetFilter () {
    this.setState( {filteredText: this.props.filter, value:'', checked:false} )
  },

  render: function () {

    var filterOptions = React.DOM.div({className:'FilterOptions'},  React.DOM.input({ type: 'checkbox', checked:this.state.checked, onChange: this.filterByAlphabet,}),
    React.DOM.input({ type: 'text', onChange: this.filteredListChanged, value: this.state.value }),
    React.DOM.input({ type: 'button', value:'сброс', onClick: this.resetFilter }),
    );

    var filterText = this.state.filteredText.map(el =>
      React.DOM.option({ key: el.code, className: 'option'}, el.text),
    );

    var filterSelect = React.DOM.select({className: 'option', size:5}, filterText);

    return React.DOM.div({ className: 'Filter' }, filterOptions, filterSelect);
  },
});