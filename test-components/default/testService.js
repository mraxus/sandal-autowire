module.exports = function () {
	this.data = 'testService data';
};
module.exports.prototype.getData = function () {
	return this.data;
};
module.exports.autowire = {
	type: 'service'
};