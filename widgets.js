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




  var WeatherClock = React.createClass({
    getInitialState: function() {
      return { time: this.props.time }
    },

    componentDidMount: function() {
      navigator.geolocation.getCurrentPosition(function(pos) {
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.requestFromAPI();
      }.bind(this))
      this.dateTimer = setInterval(function(){
      this.setState({time: new Date()})
      }.bind(this), 1000);
    },

    requestFromAPI: function loadXMLDoc() {
      var xmlhttp;

      if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
      } else {
          // code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
             if(xmlhttp.status == 200){
               var response = xmlhttp.responseText;
               this.parseWeather(response);
             }
             else if(xmlhttp.status == 400) {
                alert('There was an error 400')
             }
             else {
                 alert('something else other than 200 was returned')
             }
          }
      }.bind(this);

      var url = "http://api.openweathermap.org/data/2.5/weather?lat=";
      url += (this.lat + "&lon=" + this.lon);
      url += "&APPID=" + "5a872b96603a66459f4c0d41fa0d69a9";
      console.log(url);

      xmlhttp.open("GET", url, true);
      xmlhttp.send();
  },

  parseWeather: function(response){
    var weather = JSON.parse(response);
    var weatherString = weather.name + ": " + weather.weather[0].description
    this.setState({currentWeather: weatherString})
  },

    componentWilUnmount: function() {
      clearTimeout(this.dateTimer);
    },
    renderTime: function() {
      return this.state.time.toString();
    },

    render: function() {

      return (
        <div>

          <div>{ this.renderTime() }</div>
          <div>{this.state.currentWeather}</div>
        </div>
      )
    }

  });
