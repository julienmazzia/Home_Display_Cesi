
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
			var table = $('.card-container');
			var color = "Grey lighten-1";
			var count = 0;
			table.html("");
			data['data'].forEach(function (item) {
				if(count==0){
					color = "grey lighten-3";
					count = 1;
				}else{
					color = "grey lighten-2";
					count = 0;
				}

				var div_a = document.createElement('div');
				div_a.className = "col s3";

				var div_b = document.createElement('div');
				div_b.className = "card " + color;

				var div_c = document.createElement('div');
				div_c.className = "card-content";

				var div_c_1 = document.createElement('div');
				div_c_1.className = "row valign-wrapper center-align bordered";
				var div_c_1_content = document.createElement('div');
				div_c_1_content.className = "col s12";
				div_c_1_content.textContent = "Session : " + item['NomSession'];
				div_c_1.appendChild(div_c_1_content);

				var div_c_2 = document.createElement('div');
				div_c_2.className = "row valign-wrapper center-align bordered";
				var div_c_2_content = document.createElement('div');
				div_c_2_content.className = "col s6";
				div_c_2_content.textContent = "Salle : " + item['NomSalle'];
				var div_c_2_content2 = document.createElement('div');
				div_c_2_content2.className = "col s6";
				div_c_2_content2.textContent = "Matière : " + item['NomMatiere'];
				div_c_2.appendChild(div_c_2_content);
				div_c_2.appendChild(div_c_2_content2);

				var div_c_3 = document.createElement('div');
				div_c_3.className = "row valign-wrapper center-align bordered";
				var div_c_3_content = document.createElement('div');
				div_c_3_content.className = "col s12";
				div_c_3_content.textContent = "Intervenant : " + item['NomIntervenant'];
				div_c_3.appendChild(div_c_3_content);

				var div_c_4 = document.createElement('div');
				div_c_4.className = "row valign-wrapper center-align bordered";
				var div_c_4_content = document.createElement('div');
				div_c_4_content.className = "col s12";
				div_c_4_content.textContent = "Période : " + item['HeureDebut'] + '-' + item['HeureFin'];
				div_c_4.appendChild(div_c_4_content);
				
				div_c.appendChild(div_c_1);
				div_c.appendChild(div_c_2);
				div_c.appendChild(div_c_3);
				div_c.appendChild(div_c_4);
				div_b.appendChild(div_c);
				div_a.appendChild(div_b);
				table.append(div_a);
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