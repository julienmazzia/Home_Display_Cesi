
var planningHeight = 0;
var move = -1;
var currentValue = 0;

var viewport = null;

/**
 * Startup code
 */
$(function () {
	//window["viewport"] = $('#viewport');
	//viewport.css('height', ($(window).height() - 130) + 'px');
	reloadData();
	setActualDate();
});

/*$(window).resize(function () {
	viewport.css('height', ($(window).height() - 130) + 'px');
});

function sleep(sleepDuration){
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration); 
}*/

/**
 * Reload data from JSON api
 */
function reloadData() {
	$('#loading').show();
	var profile = $('body').attr('profile');
	$.ajax({
		url: 'data.php?profile=' + profile,
		success: function (data) {
			console.log(data);
			$('#error').hide();
			var table = $('#table-body');
			var strip = "";
			var count = 0;
			table.html(' ');
			data['data'].forEach(function (item) {
				if(count==0){
					strip = "strip";
					count = 1;
				}else{
					strip="";
					count = 0;
				}
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				td1.textContent = item['NomSession'];
				var td2 = document.createElement('td');
				td2.textContent = item['NomSalle'];
				var td3 = document.createElement('td');
				td3.textContent = item['NomMatiere'];
				var td4 = document.createElement('td');
				td4.textContent = item['NomIntervenant'];
				var td5 = document.createElement('td');
				td5.textContent = item['HeureDebut'] + '-' + item['HeureFin'];
				tr.className = strip;
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				table.append(tr);
			});
			planningHeight = $('#table-body').height() - $('#viewport').height();
			$('#loading').hide();
		},
		error: function () {
			$('#error').text('Impossible de se connecter au serveur').show();
		}
	});
}

/**
 * Scrolling
 */
setInterval(function () {
	
	if (viewport == null) return;
	if (planningHeight <= viewport.height()) return;
	//console.log(currentValue + "/" + planningHeight);
	
	if (currentValue > planningHeight || currentValue <= 0) {
		sleep(5000);
		move *= -1;
	}
	
	currentValue += move;

	viewport.scrollTop(currentValue);
	
}, 20);

/**
 * Update clock (legacy code)
 */
setInterval(function () {
	krucial = new Date;
	heure = krucial.getHours();
	min = krucial.getMinutes();
	sec = krucial.getSeconds();
	if (sec < 10)
		sec0 = "0";
	else
		sec0 = "";
	if (min < 10)
		min0 = "0";
	else
		min0 = "";
	if (heure < 10)
		heure0 = "0";
	else
		heure0 = "";
	DinaHeure = "" + heure0 + heure + ":" + min0 + min + ":" + sec0 + sec;
	which = DinaHeure
	if (document.getElementById){
		document.getElementById("Time").innerHTML=which;
	}
}, 1000);

/**
 * Reload data each 5 minutes.
 */
setInterval(function () {
	reloadData();
}, 5 * 60 * 1000);

function setActualDate(){
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();

	/*if(day<10){
		day = '0'+day;
	}

	if(month<10){
		month = '0'+month;
	}*/
	//var mydate = new Date(form.startDate.value);
	var month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
"Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"][today.getMonth()];
	var str = '<h4>' +day + ' ' +month + ' ' + today.getFullYear() + '</h4>';
	$('#date').html(str);
};

setInterval(function(){setActualDate();}, 60000);

$(document).ready(function() {
  $.simpleWeather({
    location: loc,
    woeid: 'km',
    unit: 'c',
    success: function(weather) {
      html = '<div clas="row"><h4 class="col s6"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h4>';
      html += '<img id="weatherImage" class="col s6" src="'+weather.forecast[0].image+'"></div>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});

setInterval(function(){simpleWeather();}, 60000);