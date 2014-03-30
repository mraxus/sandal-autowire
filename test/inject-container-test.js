
var test = require("tape"),
	path = require('path'),
	Sandal = require('sandal'),
	sandal = new Sandal();

test('Autowire folder and add components', function (t) {
	var returnedSandal = require('../index.js')(sandal);
	sandal.autowire(path.join(__dirname, '../test-components/default'));
	t.equal(returnedSandal, sandal, 'should not create new container');
	t.end();
});

test('Manual component', function (t) {
	sandal.resolve(function(err, testfile) {
		t.notOk(err);
		t.equal(testfile.foo, 'bar', 'should autowire');
		t.end();
	});
});