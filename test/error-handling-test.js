
var test = require("tap").test,
	path = require('path'),
	sandal;

test('Object as factory', function (t) {
	sandal = require('../index.js')();
	var err;
	try {
		sandal.autowire(path.join(__dirname, '../test-components/with-errors/object-as-factory'));
	}
	catch (e) {
		err = e;
	}
	t.ok(err);
	t.end();
});