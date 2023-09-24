
let weather= {
    apiKey: "f9ed75b2a995dcee764184e1df476acf",

   fetchWeather: function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey+ "&units=metric")
    //fetch always returns resolved and so onFullfilled() is used for .then parameter instead of onRejected()
    //this .then method only has one parameter for onFullfilled()
    //fetch returns a json file and sends it to .then()
    .then((response)=>
    {
      if(!response.ok){//if response is not ok alert() method is called with the string
        alert("Invalid city/Enter a city")
      }
      else{
        return response.json();//must explicitly return something if using if statements
      }
    })
    .then((data)=>this.displayWeather(data))//=> short form of a simple return function 
    }

   ,displayWeather: function(data){
   const { name }= data;
   const { temp, humidity, feels_like }= data.main;
   const { description, icon }= data.weather[0];
   const {speed}=data.wind;
   const {country}=data.sys;
   //console.log(name, temp, humidity, description, icon, speed )
   //console.log(data.weather.length)

   document.querySelector(".city").innerText= "Weather in " + name + ", " + country;
   document.querySelector(".description").innerText= description;
   document.querySelector(".humidity").innerText= "Humidity: "+ humidity + " %";
   document.querySelector(".icon").src= "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
   
   var tempRound= temp.toFixed(1);
   var feelsRound= feels_like.toFixed(1);

   document.querySelector(".temp").innerText= tempRound + " ° C.";
   document.querySelector(".feelsTemp").innerText= "Feels like "+ feelsRound+ " ° C";

   var speedkm= (speed*3600)/1000;
   var speedkmround= speedkm.toFixed(1);
   document.querySelector(".wind").innerText= "Wind: " + speedkmround +" km/hr";
   document.querySelector(".weather").classList.remove("loading");
   
   document.body.style.backgroundImage= "url('https://source.unsplash.com/random/1600x900/?city,"+ name + "')";
   }

  ,fetchInput: function(){
   var input= document.getElementById("searchbar");
   this.fetchWeather(input.value)
   }

};

  //var key=document.getElementById("searchbar")
  //console.log(key)

addEventListener("keyup", function(event){
   if(event.key == "Enter")
   weather.fetchInput()

});

weather.fetchWeather("Toronto");
