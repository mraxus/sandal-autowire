(function () {

	'use strict';

	var Sandal = require('sandal'),
		fs = require('fs'),
		path = require('path'),

		// Thanks to blakeembrey 
		// https://github.com/blakeembrey/sentence-case/
		// https://github.com/blakeembrey/camel-case/
		convertName = function (string) {
			return string
				.replace(/([a-z])([A-Z0-9])/g, '$1 $2')
				.replace(/[^a-zA-Z0-9]+/g, '.')
				.replace(/(?!\d\.\d)(^|.)\./g, '$1 ')
				.replace(/^ | $/g, '')
				.toLowerCase()
				.replace(/\./g, '_')
				.replace(/ (\w)/g, function (_, $1) { return $1.toUpperCase(); });
		};


	module.exports = function (container) {

		var sandal = container || new Sandal(),
			registerFolder = function (folderPath) {
				var fileList = fs.readdirSync(folderPath).forEach(function (fileName) {
					var filePath = path.join(folderPath, fileName),
						stats = fs.statSync(filePath),
						component,
						meta;
					if (stats.isDirectory()) return registerFolder(filePath);
					if (stats.isFile() && (['.js','.json']).indexOf(path.extname(filePath)) !== -1) {
						component = require(filePath);
						meta = component.autowire || {};
						if (meta.ignore) return;
						meta.type = meta.type || ((typeof(component) === 'function') ? 'factory' : 'object');
						meta.name = meta.name || convertName(path.basename(filePath, path.extname(filePath)));
						if (meta.type === 'object') {
							sandal.object(meta.name, component, meta.groups);
						} else {
							if (meta.dependencies) {
								sandal[meta.type](meta.name,
									meta.dependencies,
									component,
									!!meta.transient,
									meta.groups);
							} else {
								sandal[meta.type](meta.name,
									component,
									!!meta.transient,
									meta.groups);
							}
						}
					}
				});
		}

		sandal.autowire = function (path) {
			registerFolder(path);
			return sandal;
		};

		return sandal;

	};

})();
