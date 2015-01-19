

function randInt (min, max) {
	return Math.floor(Math.random() * max) + min
}

window.Mesh = {};

Mesh.opened = 0;
Mesh.coords = {};
Mesh.units = [];

var centerX = Math.floor($('#Logo').position().left - 51),
	centerY = Math.floor($('#Logo').position().top );

var randomSpinInterval = 0;
var started = false;
var opened = false;

$(document).on('keydown', function (e) {


	if (e.keyCode == 32 && !started) {
		start();
		return;
	}
	if (e.keyCode == 32 && !opened) {
		open();
	}
})

function start () {

	started = true;
	$('#Pre').hide();

	Mesh.units.push(new BiUnit([centerX, centerY], $('#Mesh')));

	var count = 0;
	var meshCounter;

	meshCounter = setInterval(function () {
		if ( Mesh.units.length > count) {
			count = Mesh.units.length;
		} else {
			filled();
			clearInterval(meshCounter);
		}
	}, 100);
}





function filled () {
	$('#Logo').removeClass('hide');
	randomSpinInterval = setInterval(randomSpin, 2)
}



function wave () {
	Mesh.units.map(function (item, i) {
		setTimeout(function () {
			item.spin(1);
			setTimeout(function () {item.spin(2)}, 100);
		}, 20 + i*10);
	});
}


function randomSpin () {
	var min = 1,
		max = Mesh.units.length;
	Mesh.units[randInt(min, max) - 1].spin(randInt(1,2));
}

function open () {

	var toOpen = Mesh.units.slice(0, 90),
		k = 0;

	while(toOpen.length) {
		k += 1
		var i = randInt(0, toOpen.length);
		var elem = toOpen.splice(i, 1);
		
		setTimeout(function () {this.open(1)}.bind(elem[0]), k*20);
		setTimeout(function () {this.open(2)}.bind(elem[0]), k*23);

	}

	var meshCounter;
	meshCounter = setInterval(function () {
		if (Mesh.opened >= 90) {
			setTimeout(onOpened, 1000);
			clearInterval(meshCounter);
		}
	}, 20);
}


function onOpened () {
	$('#Logo').css('zIndex', 100);
	var i = 0;
	for (; i < 90 ; i++) {
		setTimeout(function () {
			Mesh.units[this].opening = false;
			Mesh.units[this].reset();
		}.bind(i), i*20);
	}
}


