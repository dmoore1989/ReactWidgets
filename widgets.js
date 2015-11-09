
  var AutoComplete = React.createClass({
    getInitialState: function(){
      return {input: "", returnWords: this.parseNames()};
    },

    updateInput: function(event) {
      this.searchString = event.target.value;
      console.log(this.state.returnWords);
      this.setState({returnWords: this.parseNames(), input: event.target.value});
    },

    autoCompleteInput: function(event) {
      var text = event.target.textContent;
      this.setState({input: event.target.textContent});
    },

    parseNames: function() {
      var searchedValues =[];
      this.props.names.forEach(function(word){
        if (word.match(this.searchString)){
          searchedValues.push(<li onClick={this.autoCompleteInput}>{word}</li>);
        }
      }.bind(this));
      return searchedValues;
    },

    render: function(){
      return (
        <div>
          <input onInput={this.updateInput} value={this.state.input}></input>
          <ul>
            {this.state.returnWords}
          </ul>
        </div>
      );
    }
  });
