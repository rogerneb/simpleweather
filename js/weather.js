//GENERAL VARS
var city_code = 349727; //get your city code in https://www.accuweather.com/
var api_key = "PUT HERE YOUR API KEY"; //get your api_key in https://developer.accuweather.com/
var language = "en"; //en (english), es (spanish), ca (catalan), fr (french), it (italian), pt (portugués) //get your language code in https://developer.accuweather.com/
var metric = "true"; //true for Metric system
var production = 0; //1 production on | anithing else: develop mode. In develop mode the code reads an example json file.


if (production == 1) {
	var data_url = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+city_code+"?apikey="+api_key+"&language="+language+"&metric="+metric;
}else{
	var data_url = "js/test.json"; //test data
}

$.getJSON(data_url, function(data) { //read data from source
  //console.log(data);
  document.getElementById('headline').innerHTML = data["Headline"]["Text"];
  var link = data["Headline"]["MobileLink"]; //get mobile link
  document.getElementById('moreinfo').innerHTML = "<a href="+link+" class=moreinfo>More info</a>"
  data = data["DailyForecasts"]; //simplify the data
  for (n=0; n<data.length; n++) {
    var weekday = dayoftheweek(data[n]["Date"], language); //get the day of the week
    //put data in HTML
    document.getElementById('icon'+n).innerHTML = "<img src=img/icons/"+data[n]["Day"]["Icon"]+".svg alt="+data[n]["Day"]["IconPhrase"]+">";
    document.getElementById('date'+n).innerHTML = weekday+" "+parseInt(data[n]["Date"].substr(8,2));
    document.getElementById('phrase'+n).innerHTML = data[n]["Day"]["IconPhrase"];
    document.getElementById('tempmin'+n).innerHTML = "<span class=tempmin-arrow>▼</span>"+data[n]["Temperature"]["Minimum"]["Value"].toFixed(1)+"°"+data[n]["Temperature"]["Minimum"]["Unit"];
    document.getElementById('tempmax'+n).innerHTML = "<span class=tempmax-arrow>▲</span>"+data[n]["Temperature"]["Maximum"]["Value"].toFixed(1)+"°"+data[n]["Temperature"]["Maximum"]["Unit"];
  }
});


function dayoftheweek(date, language){
  var date = new Date(date).getDay(); //get the number of the week day
	//get the day of the week with selected language
	if (language == "en") {
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //days in english
	}else if (language == "es"){
		var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]; //days in spanish
	}else if (language == "fr") {
		var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; //days in french
	}else if (language == "it") {
		var days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]; //days in italian
	}else if (language == "pt") {
		var days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]; //days in portugués
	}else if(language == "ca") {
		var days = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]; //days in catalan
	}else { //if not correct language put it in english
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //days in english
	}

  return days[date];
}
