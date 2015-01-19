









var BiUnit = function (coords, parent) {
	Mesh.coords[coords.join('-')] = true;

	this.id = randInt(10000,100000000);

	this.x = coords[0];
	this.y = coords[1];
	this.parent= parent;

	this.spinned = 0

	this.prePopulate = true;
	this.create();

	setTimeout(this.populate.bind(this), 0);

	return this;
}


BiUnit.prototype.create = function () {
	this.element = $('<div class="bu">' +
		'<div class="sq">' +
			'<svg class="tri1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
				'viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">' +
				'<polygon fill="#ffffff" stroke="#ffffff" stroke-width="0.5" stroke-miterlimit="10" points="36,36 72,72 0,72 0,0 "/>' +
			'</svg>' +
			'<svg class="tri2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
				'viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">' +
				'<polygon fill="#ffffff" stroke="#ffffff" stroke-width="0.5" stroke-miterlimit="10" points="36,36 0,0 72,0 72,72 "/>' +
			'</svg>' +
		'</div>' +
	//'<i></i>' +
	'</div>');

	this.element.css({
		left: this.x,
		top: this.y
	}).addClass('type' + (randInt(1,2) > 1 ? 'A': 'B'));

	this.element.appendTo(this.parent);

	this.offset = Math.floor(Math.sqrt(Math.pow(this.element.width(), 2) + Math.pow(this.element.height(), 2)) / 2);

	this.element.find('polygon').on('webkitAnimationEnd', this.onAnimEnd.bind(this))

	/*
	setTimeout(this.spin.bind(this, 1), 300);
	setTimeout(this.spin.bind(this, 2), 500);
*/



}

BiUnit.prototype.spin = function (id) {
	if (this.opening) return;

	this.element.addClass('spin' + id)
}


BiUnit.prototype.open = function (id) {
	this.opening = true;
	this.element.addClass('open' + id);
}


BiUnit.prototype.reset = function () {
	this.element
		.removeClass('spin1')
		.removeClass('spin2')
		.removeClass('open1')
		.removeClass('open2')
}


BiUnit.prototype.onAnimEnd = function (e) {
	if (this.opening) {
		Mesh.opened += 1;
		return;
	}

	this.reset();
}


BiUnit.prototype.populate = function () {

	var offset = this.offset,
		coordsTL = [this.x - offset, this.y - offset],
		coordsTR = [this.x + offset, this.y - offset],
		coordsBR = [this.x + offset, this.y + offset],
		coordsBL = [this.x - offset, this.y + offset];


	this.createNextIfPossible(coordsTL);
	this.createNextIfPossible(coordsTR);
	this.createNextIfPossible(coordsBR);
	this.createNextIfPossible(coordsBL);

}


BiUnit.prototype.createNextIfPossible = function (coords) {
	var meshlimit = 270,
		offset = this.offset,
		correctX = coords[0] <= $(document).width() + offset && coords[0] > 0 - offset,
		correctY = coords[1] <= $(document).height() + offset && coords[1] > 0 - offset;

/*

	if (!(correctX && correctY)) {
		this.element.css('backgroundColor', 'red')
	}
*/
	if (!Mesh.coords[coords.join('-')] && (correctX && correctY) ) {
		Mesh.units.push(new BiUnit(coords, this.parent));
	}
}