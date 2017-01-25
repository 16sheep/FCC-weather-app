window.onload = function () {
  get("http://ip-api.com/json", onLocation)
  startTime()
  nightVis(h)
}

function onLocation(locObj) {
  var lat = locObj.lat
  var lon = locObj.lon
  var city = locObj.city
  var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=55219e014878a0eda0e90952b079527d"
  get(weatherURL, onWeather)

  populate("location", city)
}

function onWeather(weatherObj) {
  var tempK = weatherObj.main.temp
  var descr = weatherObj.weather["0"].main
  console.log(weatherObj)

  function conditionIcon(descr) {
    if (descr == "Snow") {
      return snowyURL
    } else if (descr == "Rain") {
      return rainyURL
    } else if (weatherObj.clouds.all < 15 & h > 18 || h < 8) {
      return moonURL
    } else if (weatherObj.clouds.all < 15) {
      return sunnyURL
    } else if (weatherObj.clouds.all > 80) {
      return cloudyURL
    } else if (h > 18 || h < 8) {
      return cloudyMoonURL
    } else {
      return partCloudyURL
    }
  }
  getById("far").onclick = function () {
    populate("temperature", tempKToF(tempK));
    changeClass(getById("far"), "activeUnit")
    resetClass("cel")
  }
  getById("cel").onclick = function () {
    populate("temperature", tempKToC(tempK));
    changeClass(getById("cel"), "activeUnit")
    resetClass("far")
  }

  populate("temperature", tempKToC(tempK))
  populate("description", descr)
  populateImgSrc("icon", conditionIcon(descr))
}

function get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var jsonObject = JSON.parse(this.responseText);
      callback(jsonObject)
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}


var cloudyURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484824591/cloud_p5rxtk.png"

var sunnyURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484824591/sun_x4o3w3.png"

var rainyURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484824591/rain_gwq2o0.png"

var partCloudyURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484824592/sun-and-cloud_xthrxf.png"

var snowyURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484824591/snow_vplenv.png"

var moonURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484835784/sleep-mode_oiyvhk.png"

var cloudyMoonURL = "http://res.cloudinary.com/dzq55deo0/image/upload/v1484835778/night_j0eoda.png"


function tempKToC(tempK) {
  var tempC = Math.round((tempK - 273.15) * 10) / 10
  var tempCString = tempC.toString() + "°"
  return tempCString
}

function tempKToF(tempK) {
  var tempFRound = Math.round((9 / 5 * (tempK - 273) + 32) * 10) / 10
  var tempFString = tempFRound.toString() + "°"
  return tempFString
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  populate("time", h + ":" + m + ":" + s)
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  };
  return i;
}
var today = new Date();
var h = today.getHours()

function nightVis(h) {
  if (h > 18 || h < 8) {
    changeClass(getById("bg"), "nightBody")
    changeClass(getById("heading"), "nightText")
    changeClass(getById("location"), "nightText")
    changeClass(getById("description"), "nightText")
    changeClass(getById("time"), "nightText")
    changeClass(getById("tempBox"), "nightText")
    changeClass(getById("box"), "nightBox")
  }
}

function populate(elementId, result) {
  document.getElementById(elementId).innerHTML = result
}

function populateImgSrc(elementID, url) {
  document.getElementById(elementID).src = url
}

function getById(element) {
  return document.getElementById(element)
}

function changeClass(elId, className) {
  elId.className = className
}

function resetClass(elId) {
  document.getElementById(elId).className = "";
}