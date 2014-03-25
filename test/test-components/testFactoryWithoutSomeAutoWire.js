var counter = 0;

module.exports = function (testfile, testObject) {

	counter++;

	return {
		count: counter,
		getDep1: function () {
			return testfile;
		},
		getDep2: function () {
			return testObject;
		}
	}
};
module.exports.autowire = {
	name: 'namedFactory2'
};