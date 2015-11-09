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

  var TabsWidget = React.createClass({

    getInitialState: function() {
      return { tabIdx: 1 }
    },

    setSelectedTab: function (tab) {
      this.setState({ tabIdx: tab });
    },

    getTitles: function(){
      return this.props.articles.map(function(article) {
        return article.title;
      }, this)
    },

    getArticles: function(){
      return this.props.articles.map(function(article) {
        return article.content;
      }, this);
    },

    getArticle: function(){
      return this.getArticles()[this.state.tabIdx];
    },

    render: function() {
      return (
        <div>
          < Tabs titles={this.getTitles()} tabIdx ={this.state.tabIdx} setActiveTab={this.setSelectedTab}/>
          <article>
            <Article article={this.getArticle()} />
          </article>
        </div>
      )
    }
  });

var Tabs = React.createClass({

  selectTab: function(e) {
    this.props.setActiveTab(e.target.id);
  },

  getTabBodies: function(){
    return this.props.titles.map(function(title, id) {
      if (this.props.tabIdx == id){
        return(
        <li onClick={this.selectTab}
        id={id}><strong>{title}</strong></li>
      )} else {
      return (
        <li onClick={this.selectTab} id={id} >{title}</li>
      )}
    }, this);
  },


  render: function(){
    return <ul>{ this.getTabBodies() }</ul>
  }

});


var TabBody = React.createClass({



  render: function(){

    return (
      <li onClick={this.selectTab} >{this.props.title}</li>
    )
  }

});


var Article = React.createClass({

  render: function(){
    return <article>{this.props.article}</article>
  }

});

var Thumbnails = React.createClass({

  getImagePaths: function() {
    var imagePaths = [];
    for (var idx = 0; idx < 8; idx++) {
      imagePaths.push("/./images/00" + (idx + 1) + ".png")
    }
    return imagePaths;
  },

  getInitialState: function(){
    return {selectedImageIdx: "/./images/001.png"}
  },

  setFocusImage: function(path) {
    this.setState({selectedImageIdx: path});
  },

  render: function(){
    return(
    <div>
      <div className="main-img"><img src={this.state.currentSelectedImg} /></div>
      <GutterImages imagePaths={this.getImagePaths()}/>
    </div>
  )}
});

var GutterImages = React.createClass({

  getImageList: function() {
    return this.props.imagePaths.map(function(path) {
        return (
          <img src={path} />)
    }, this)


  },

  render: function() {
    return (
      <ul>
      {this.getImageList()}
      </ul>
    )
  }
});
