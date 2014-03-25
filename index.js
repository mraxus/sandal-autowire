(function () {

	'use strict';

	var Sandal = require('sandal'),
		fs = require('fs'),
		path = require('path');

	module.exports = function () {

		var sandal = new Sandal(),
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
						meta.name = meta.name || path.basename(filePath, path.extname(filePath));
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
		};

		return sandal;

	};

})();